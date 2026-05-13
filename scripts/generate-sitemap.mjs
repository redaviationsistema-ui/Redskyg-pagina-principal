import { writeFileSync } from "node:fs";
import { seoPages, getSeoPagePathForLocale } from "../src/data/seoPages.js";

const siteUrl = "https://redskyg.com";
const lastmod = new Date().toISOString().slice(0, 10);

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

const allRoutes = [...staticRoutes, ...seoRoutes];
const standaloneRoutes = ["/landing"];

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

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ...allRoutes.flatMap((route) => [buildUrl(route, "es"), buildUrl(route, "en")]),
  ...standaloneRoutes.map((path) =>
    [
      "  <url>",
      `    <loc>${siteUrl}${path}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      "  </url>",
    ].join("\n")
  ),
  "</urlset>",
  "",
].join("\n");

writeFileSync(new URL("../public/sitemap.xml", import.meta.url), xml, "utf8");
