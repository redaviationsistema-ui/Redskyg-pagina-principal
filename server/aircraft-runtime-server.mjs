import { createServer } from "node:http";
import { createReadStream, existsSync, readFileSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";
import {
  buildAircraftSeo,
  cleanText,
  escapeHtml,
  normalizeRegistration,
  SITE_URL,
} from "../src/features/aircraft-sales/aircraftSeo.js";
import { seoPages, getSeoPagePathForLocale } from "../src/data/seoPages.js";

const rootDir = fileURLToPath(new URL("../", import.meta.url));
const distDir = join(rootDir, "dist");
const indexPath = join(distDir, "index.html");
const port = Number(process.env.PORT || 4173);
const siteUrl = (process.env.SITE_URL || process.env.VITE_SITE_URL || SITE_URL).replace(/\/+$/, "");
const aircraftTable = "aircraft_sales";
const imagesTable = "aircraft_sales_images";
const storageBucket = "aircraft-sales";
const aircraftCacheMs = Number(process.env.AIRCRAFT_CACHE_MS || 5 * 60 * 1000);
const sitemapCacheMs = Number(process.env.SITEMAP_CACHE_MS || 10 * 60 * 1000);

const loadDotEnv = () => {
  const envPath = join(rootDir, ".env");
  if (!existsSync(envPath)) return;

  readFileSync(envPath, "utf8")
    .split(/\r?\n/)
    .forEach((line) => {
      const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)=(.*)\s*$/);
      if (!match || process.env[match[1]]) return;
      process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, "");
    });
};

loadDotEnv();

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase URL or anon key for aircraft runtime server.");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);
const baseHtml = readFileSync(indexPath, "utf8");
const aircraftCache = new Map();
let sitemapCache = null;

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".xml": "application/xml; charset=utf-8",
};

const send = (res, status, body, headers = {}) => {
  res.writeHead(status, headers);
  res.end(body);
};

const sendHtml = (res, status, body) =>
  send(res, status, body, {
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "public, max-age=300",
  });

const escapePostgrestValue = (value) => String(value).replace(/\\/g, "\\\\").replace(/,/g, "\\,");

const registrationCandidates = (slug) => {
  const cleanSlug = normalizeRegistration(slug);
  return [...new Set([
    cleanSlug,
    cleanSlug.toUpperCase(),
    cleanSlug.replace(/-/g, " ").toUpperCase(),
    cleanSlug.replace(/-/g, ""),
    cleanSlug.replace(/-/g, "").toUpperCase(),
  ].filter(Boolean))];
};

const resolveImageUrl = (image) => {
  if (image?.public_url) return image.public_url;
  if (!image?.storage_path) return "";

  const { data } = supabase.storage.from(storageBucket).getPublicUrl(image.storage_path);
  return data?.publicUrl || "";
};

const normalizeAircraftImages = (aircraft) => {
  const activeImages = (aircraft.images ?? [])
    .filter((image) => image.is_active)
    .map((image) => ({
      ...image,
      resolved_url: resolveImageUrl(image),
    }))
    .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));
  const cover = activeImages.find((image) => image.is_cover) || activeImages[0];

  return {
    ...aircraft,
    main_image: cover?.resolved_url || "",
  };
};

const fetchAircraftBySlug = async (slug) => {
  const normalizedSlug = normalizeRegistration(slug);
  const cached = aircraftCache.get(normalizedSlug);

  if (cached && cached.expiresAt > Date.now()) return cached.value;

  const candidates = registrationCandidates(normalizedSlug);
  const orFilter = candidates.map((candidate) => `registration.ilike.${escapePostgrestValue(candidate)}`).join(",");
  const { data, error } = await supabase
    .from(aircraftTable)
    .select(`
      id,
      registration,
      manufacturer,
      model,
      description,
      is_active,
      images:${imagesTable} (
        id,
        public_url,
        storage_path,
        is_cover,
        is_active,
        display_order
      )
    `)
    .eq("is_active", true)
    .or(orFilter)
    .limit(10);

  if (error) throw error;

  const aircraft = (data ?? [])
    .map(normalizeAircraftImages)
    .find((item) => normalizeRegistration(item.registration) === normalizedSlug);
  const value = aircraft || null;

  aircraftCache.set(normalizedSlug, {
    expiresAt: Date.now() + aircraftCacheMs,
    value,
  });

  return value;
};

const fetchPublishedAircraft = async () => {
  if (sitemapCache && sitemapCache.expiresAt > Date.now()) return sitemapCache.value;

  const { data, error } = await supabase
    .from(aircraftTable)
    .select("registration")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) throw error;

  const value = (data ?? []).filter((aircraft) => normalizeRegistration(aircraft.registration));
  sitemapCache = {
    expiresAt: Date.now() + sitemapCacheMs,
    value,
  };

  return value;
};

const replaceOrInsert = (html, pattern, replacement, before = "</head>") => {
  if (pattern.test(html)) return html.replace(pattern, replacement);
  return html.replace(before, `${replacement}\n${before}`);
};

const renderAircraftHtml = (aircraft, locale) => {
  const seo = buildAircraftSeo(aircraft, locale, siteUrl);
  const imageUrl = aircraft.main_image || `${siteUrl}/images/Home/home10.png`;
  const content = [
    `<main class="aircraft-runtime-seo" data-runtime-aircraft="${escapeHtml(aircraft.registration)}">`,
    `  <h1>${escapeHtml(seo.h1)}</h1>`,
    `  <p>${escapeHtml(seo.description)}</p>`,
    `  <p>${escapeHtml(aircraft.manufacturer)} ${escapeHtml(aircraft.model)}</p>`,
    `</main>`,
  ].join("\n");

  let html = baseHtml;
  html = html.replace(/<html[^>]*>/, `<html lang="${seo.htmlLang}">`);
  html = replaceOrInsert(html, /<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(seo.title)}</title>`);
  html = replaceOrInsert(html, /<meta\s+name="description"[\s\S]*?>/i, `<meta name="description" content="${escapeHtml(seo.description)}" />`);
  html = replaceOrInsert(html, /<link\s+rel="canonical"[\s\S]*?>/i, `<link rel="canonical" href="${seo.canonical}" />`);
  html = replaceOrInsert(html, /<link\s+rel="alternate"\s+hreflang="(?:mx-MX|es-MX)"[\s\S]*?>/i, `<link rel="alternate" hreflang="es-MX" href="${seo.spanishUrl}" />`);
  html = replaceOrInsert(html, /<link\s+rel="alternate"\s+hreflang="en-US"[\s\S]*?>/i, `<link rel="alternate" hreflang="en-US" href="${seo.englishUrl}" />`);
  html = replaceOrInsert(html, /<link\s+rel="alternate"\s+hreflang="x-default"[\s\S]*?>/i, `<link rel="alternate" hreflang="x-default" href="${seo.spanishUrl}" />`);
  html = replaceOrInsert(html, /<meta\s+property="og:title"[\s\S]*?>/i, `<meta property="og:title" content="${escapeHtml(seo.title)}" />`);
  html = replaceOrInsert(html, /<meta\s+property="og:description"[\s\S]*?>/i, `<meta property="og:description" content="${escapeHtml(seo.description)}" />`);
  html = replaceOrInsert(html, /<meta\s+property="og:url"[\s\S]*?>/i, `<meta property="og:url" content="${seo.canonical}" />`);
  html = replaceOrInsert(html, /<meta\s+property="og:image"[\s\S]*?>/i, `<meta property="og:image" content="${imageUrl}" />`);
  html = replaceOrInsert(html, /<meta\s+property="og:locale"[\s\S]*?>/i, `<meta property="og:locale" content="${seo.ogLocale}" />`);
  html = replaceOrInsert(html, /<meta\s+name="twitter:title"[\s\S]*?>/i, `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`);
  html = replaceOrInsert(html, /<meta\s+name="twitter:description"[\s\S]*?>/i, `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`);
  html = replaceOrInsert(html, /<meta\s+name="twitter:image"[\s\S]*?>/i, `<meta name="twitter:image" content="${imageUrl}" />`);
  html = html.replace(/<div id="app"><\/div>/, `<div id="app">${content}</div>`);

  return html;
};

const renderSitemapXml = async () => {
  const lastmod = new Date().toISOString().slice(0, 10);
  const aircraft = await fetchPublishedAircraft();
  const aircraftRoutes = aircraft.map((item) => {
    const slug = normalizeRegistration(item.registration);
    return {
      es: `/mx/aircraft-sales/${slug}`,
      en: `/en/aircraft-sales/${slug}`,
    };
  });
  const staticRoutes = [
    { es: "/mx", en: "/en" },
    { es: "/mx/about", en: "/en/about" },
    { es: "/mx/pricing", en: "/en/pricing" },
    { es: "/mx/blog", en: "/en/blog" },
    { es: "/mx/contact", en: "/en/contact" },
    { es: "/mx/aircraft-sales", en: "/en/aircraft-sales" },
    { es: "/mx/air-taxi", en: "/en/air-taxi" },
    { es: "/mx/operations-management", en: "/en/operations-management" },
    { es: "/mx/prepurchase-inspection", en: "/en/prepurchase-inspection" },
    { es: "/mx/import-export", en: "/en/import-export" },
    { es: "/mx/engine-shop", en: "/en/engine-shop" },
    { es: "/mx/avionics", en: "/en/avionics" },
    { es: "/mx/privacy", en: "/en/privacy" },
    { es: "/mx/fractional-ownership", en: "/en/fractional-ownership" },
    { es: "/mx/co-ownership", en: "/en/co-ownership" },
  ];
  const seoRoutes = seoPages.map((page) => ({
    es: `/mx${page.path}`,
    en: `/en${getSeoPagePathForLocale(page, "en")}`,
  }));
  const buildUrl = ({ es, en }, primaryLocale) => {
    const primaryPath = primaryLocale === "es" ? es : en;
    return [
      "  <url>",
      `    <loc>${siteUrl}${primaryPath}</loc>`,
      `    <xhtml:link rel="alternate" hreflang="es-MX" href="${siteUrl}${es}" />`,
      `    <xhtml:link rel="alternate" hreflang="en-US" href="${siteUrl}${en}" />`,
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}${es}" />`,
      `    <lastmod>${lastmod}</lastmod>`,
      "  </url>",
    ].join("\n");
  };

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...[...staticRoutes, ...seoRoutes, ...aircraftRoutes].flatMap((route) => [buildUrl(route, "es"), buildUrl(route, "en")]),
    "</urlset>",
    "",
  ].join("\n");
};

const serveStatic = (req, res, pathname) => {
  const decodedPath = decodeURIComponent(pathname);
  const safePath = normalize(decodedPath).replace(/^(\.\.[/\\])+/, "");
  const filePath = join(distDir, safePath === "/" ? "index.html" : safePath);
  const targetPath = existsSync(filePath) ? filePath : indexPath;
  const ext = extname(targetPath);

  res.writeHead(200, {
    "Content-Type": mimeTypes[ext] || "application/octet-stream",
    "Cache-Control": ext === ".html" ? "no-cache" : "public, max-age=31536000, immutable",
  });
  createReadStream(targetPath).pipe(res);
};

const aircraftRoutePattern = /^\/(?<market>mx|en)\/aircraft-sales\/(?<registration>[^/?#]+)\/?$/;

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
    const aircraftMatch = url.pathname.match(aircraftRoutePattern);

    if (aircraftMatch?.groups) {
      const locale = aircraftMatch.groups.market === "en" ? "en" : "es";
      const aircraft = await fetchAircraftBySlug(aircraftMatch.groups.registration);

      if (!aircraft) {
        sendHtml(res, 404, renderAircraftNotFound(locale));
        return;
      }

      sendHtml(res, 200, renderAircraftHtml(aircraft, locale));
      return;
    }

    if (url.pathname === "/sitemap.xml") {
      const xml = await renderSitemapXml();
      send(res, 200, xml, {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=600",
      });
      return;
    }

    serveStatic(req, res, url.pathname);
  } catch (error) {
    console.error("Aircraft runtime server error:", error.message);
    send(res, 500, "Internal Server Error", { "Content-Type": "text/plain; charset=utf-8" });
  }
});

const renderAircraftNotFound = (locale) => {
  const title = locale === "en" ? "Aircraft Not Found | Sky Group Aviation" : "Aeronave no encontrada | Sky Group Aviation";
  const description =
    locale === "en"
      ? "This aircraft is not currently available."
      : "Esta aeronave no esta disponible actualmente.";

  return baseHtml
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
    .replace(/<meta\s+name="description"[\s\S]*?>/i, `<meta name="description" content="${description}" />`)
    .replace(/<meta\s+name="robots"[\s\S]*?>/i, '<meta name="robots" content="noindex, follow" />')
    .replace(/<div id="app"><\/div>/, `<div id="app"><main><h1>${title}</h1><p>${description}</p></main></div>`);
};

server.listen(port, () => {
  console.log(`Aircraft runtime server listening on http://127.0.0.1:${port}`);
});
