export const SITE_URL = "https://redskyg.com";

export const cleanText = (value) => {
  const text = String(value ?? "").trim();
  return text && !["undefined", "null", "n/d", "na", "nan"].includes(text.toLowerCase()) ? text : "";
};

export const normalizeRegistration = (value) =>
  cleanText(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const getAircraftName = (aircraft, locale) => {
  const registration = cleanText(aircraft?.registration);
  const model = cleanText(aircraft?.model);
  const genericAircraft = locale === "en" ? "Aircraft" : "Aeronave";

  if (registration && model) return `${registration} - ${model}`;
  if (registration) return `${registration} - ${genericAircraft}`;
  return model || genericAircraft;
};

export const buildAircraftSeo = (aircraft, locale, siteUrl = SITE_URL) => {
  const normalizedLocale = locale === "en" ? "en" : "es";
  const slug = normalizeRegistration(aircraft?.registration);
  const name = getAircraftName(aircraft, normalizedLocale);
  const market = normalizedLocale === "en" ? "en" : "mx";
  const path = `/${market}/aircraft-sales/${slug}`;
  const canonical = `${siteUrl}${path}`;
  const title = `${name} ${normalizedLocale === "en" ? "for Sale" : "en Venta"} | Sky Group Aviation`;
  const h1 = `${name} ${normalizedLocale === "en" ? "for Sale" : "en Venta"}`;
  const description =
    normalizedLocale === "en"
      ? `${name} aircraft for sale. View photos, specifications and availability with Sky Group Aviation.`
      : `${name} disponible para venta. Consulta fotografias, especificaciones y disponibilidad con Sky Group Aviation.`;
  const spanishUrl = `${siteUrl}/mx/aircraft-sales/${slug}`;
  const englishUrl = `${siteUrl}/en/aircraft-sales/${slug}`;

  return {
    canonical,
    description,
    englishUrl,
    h1,
    htmlLang: normalizedLocale === "en" ? "en-US" : "es-MX",
    locale: normalizedLocale,
    ogLocale: normalizedLocale === "en" ? "en_US" : "es_MX",
    path,
    slug,
    spanishUrl,
    title,
  };
};

export const escapeHtml = (value) =>
  cleanText(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
