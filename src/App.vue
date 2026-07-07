<template>
  <div id="app">
    <MainLayout>
      <Suspense>
        <template #default>
          <RouterView v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <div v-if="Component" :key="route.fullPath">
                <component :is="Component" />
              </div>
            </transition>
          </RouterView>
        </template>

        <template #fallback>
          <div class="loading">Loading...</div>
        </template>
      </Suspense>
    </MainLayout>
  </div>
</template>

<script setup>
import { onMounted, watch } from "vue";
import { RouterView, useRoute } from "vue-router";
import { getSeoPageBySlug, getSeoPagePathForLocale, resolveSeoPageForLocale } from "./data/seoPages";
import MainLayout from "./layouts/MainLayout.vue";
import en from "./locales/en";
import es from "./locales/es";
import { getLocaleFromRoute, getLocaleMeta, localizePath } from "./i18n";

const route = useRoute();
const localeMessages = { es, en };
const siteUrl = (import.meta.env.VITE_SITE_URL || "").replace(/\/+$/, "");

const getBaseUrl = () => {
  if (siteUrl) return siteUrl;
  return window.location.origin;
};

const getSeoContent = () => {
  const locale = getLocaleFromRoute(route);
  const defaults = localeMessages[locale].seo.default;
  const localizedSeo = route.meta.seo?.[locale];
  const seoPage =
    typeof route.name === "string"
      ? resolveSeoPageForLocale(getSeoPageBySlug(route.name), locale)
      : undefined;

  return {
    locale,
    title:
      localizedSeo?.title ||
      (seoPage?.seoTitle || (seoPage ? `${seoPage.title} | Sky Group Aviation` : route.meta.title)) ||
      defaults.title,
    description:
      localizedSeo?.description ||
      seoPage?.seoDescription ||
      seoPage?.description ||
      route.meta.description ||
      defaults.description,
    keywords:
      localizedSeo?.keywords ||
      seoPage?.keywords ||
      route.meta.keywords ||
      defaults.keywords,
  };
};

const setMetaTag = (selector, attrKey, attrValue, content) => {
  let tag = document.head.querySelector(selector);

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attrKey, attrValue);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
};

const setCanonical = (href) => {
  let link = document.head.querySelector("link[rel='canonical']");

  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }

  link.setAttribute("href", href);
};

const setAlternateLink = (hreflang, href) => {
  let link = document.head.querySelector(`link[rel='alternate'][hreflang='${hreflang}']`);

  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "alternate");
    link.setAttribute("hreflang", hreflang);
    document.head.appendChild(link);
  }

  link.setAttribute("href", href);
};

const syncAlternateLinks = (links) => {
  const managedLinks = Array.from(document.head.querySelectorAll("link[rel='alternate'][hreflang]"));
  const activeHreflangs = new Set(links.map((entry) => entry.hreflang));

  managedLinks.forEach((link) => {
    const hreflang = link.getAttribute("hreflang");
    if (hreflang && !activeHreflangs.has(hreflang)) {
      link.remove();
    }
  });

  links.forEach(({ hreflang, href }) => {
    setAlternateLink(hreflang, href);
  });
};

const getCurrentRouteLabel = (locale) => {
  const localizedSeo = route.meta.seo?.[locale];
  if (localizedSeo?.title) return localizedSeo.title;

  const seoPage =
    typeof route.name === "string"
      ? resolveSeoPageForLocale(getSeoPageBySlug(route.name), locale)
      : undefined;

  if (seoPage?.title) return seoPage.title;
  if (typeof route.meta.title === "string") return route.meta.title;

  return locale === "en" ? "Home" : "Inicio";
};

const getBreadcrumbItems = (locale, baseUrl) => {
  const homeName = locale === "en" ? "Home" : "Inicio";
  const homePath = localizePath("/", locale);
  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: homeName,
      item: `${baseUrl}${homePath}`,
    },
  ];

  const currentPath = getLocalizedRoutePath(locale);
  const currentLabel = getCurrentRouteLabel(locale);

  if (currentPath !== homePath) {
    items.push({
      "@type": "ListItem",
      position: 2,
      name: currentLabel,
      item: `${baseUrl}${currentPath}`,
    });
  }

  return items;
};

const setStructuredData = () => {
  const locale = getLocaleFromRoute(route);
  const baseUrl = getBaseUrl();
  const canonicalUrl = `${baseUrl}${getLocalizedRoutePath(locale)}`;
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Sky Group Aviation",
      url: baseUrl,
      logo: `${baseUrl}/images/logoo.png`,
      sameAs: [
        "https://www.linkedin.com/company/red-aviation-corp/",
        "https://www.instagram.com/skygroup_llc/",
        "https://www.tiktok.com/@redaviationcompany",
        "https://www.facebook.com/RedAviationJets",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Sky Group Aviation",
      alternateName: "Red Sky Group",
      url: baseUrl,
      inLanguage: locale === "en" ? "en-US" : "es-MX",
      hasPart: [
        {
          "@type": "WebPage",
          name: locale === "en" ? "Private flight quote" : "Cotizacion de vuelos privados",
          url: `${baseUrl}/landing`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Sky Group Aviation",
      image: `${baseUrl}/images/logoo.png`,
      url: canonicalUrl,
      telephone: "+52 722-112-6671",
      email: "sales@redskyg.com",
      inLanguage: locale === "en" ? "en" : "es",
      address: {
        "@type": "PostalAddress",
        streetAddress: "San Nicolas Tolentino",
        addressLocality: "Toluca de Lerdo",
        addressRegion: "Estado de Mexico",
        addressCountry: "MX",
      },
      areaServed: ["Toluca", "Ciudad de Mexico", "Monterrey", "Guadalajara", "Cancun", "Mexico"],
      sameAs: [
        "https://www.linkedin.com/company/red-aviation-corp/",
        "https://www.instagram.com/skygroup_llc/",
        "https://www.tiktok.com/@redaviationcompany",
        "https://www.facebook.com/RedAviationJets",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: getBreadcrumbItems(locale, baseUrl),
    },
  ];

  let script = document.head.querySelector("#structured-data");

  if (!script) {
    script = document.createElement("script");
    script.id = "structured-data";
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(schema);
};

const getLocalizedRoutePath = (targetLocale) => {
  const routeName = typeof route.name === "string" ? route.name : "";
  const seoPage = getSeoPageBySlug(routeName);

  if (seoPage) {
    return localizePath(getSeoPagePathForLocale(seoPage, targetLocale), targetLocale);
  }

  return localizePath(route.path, targetLocale);
};

const applySeo = () => {
  const { locale, title, description, keywords } = getSeoContent();
  const localeMeta = getLocaleMeta(locale);
  const baseUrl = getBaseUrl();
  const canonicalPath = getLocalizedRoutePath(locale);
  const canonicalUrl = `${baseUrl}${canonicalPath}`;
  const imageUrl = `${baseUrl}/images/Home/home10.png`;
  const englishUrl = `${baseUrl}${getLocalizedRoutePath("en")}`;
  const spanishUrl = `${baseUrl}${getLocalizedRoutePath("es")}`;
  const alternateLocale = locale === "en" ? "es" : "en";
  const alternateLocaleMeta = getLocaleMeta(alternateLocale);

  document.documentElement.lang = localeMeta.htmlLang;

  document.title = title;

  setMetaTag("meta[name='description']", "name", "description", description);
  setMetaTag("meta[name='keywords']", "name", "keywords", keywords);
  setMetaTag("meta[name='robots']", "name", "robots", "index, follow, max-image-preview:large");
  setMetaTag("meta[name='author']", "name", "author", "Sky Group Aviation");
  setMetaTag("meta[name='geo.region']", "name", "geo.region", "MX-MEX");
  setMetaTag("meta[name='geo.placename']", "name", "geo.placename", "Toluca, Mexico");

  setMetaTag("meta[property='og:title']", "property", "og:title", title);
  setMetaTag("meta[property='og:description']", "property", "og:description", description);
  setMetaTag("meta[property='og:type']", "property", "og:type", "website");
  setMetaTag("meta[property='og:url']", "property", "og:url", canonicalUrl);
  setMetaTag("meta[property='og:image']", "property", "og:image", imageUrl);
  setMetaTag("meta[property='og:locale']", "property", "og:locale", localeMeta.ogLocale);
  setMetaTag(
    "meta[property='og:locale:alternate']",
    "property",
    "og:locale:alternate",
    alternateLocaleMeta.ogLocale
  );

  setMetaTag("meta[name='twitter:card']", "name", "twitter:card", "summary_large_image");
  setMetaTag("meta[name='twitter:title']", "name", "twitter:title", title);
  setMetaTag("meta[name='twitter:description']", "name", "twitter:description", description);
  setMetaTag("meta[name='twitter:image']", "name", "twitter:image", imageUrl);

  setCanonical(canonicalUrl);
  syncAlternateLinks([
    { hreflang: "es-MX", href: spanishUrl },
    { hreflang: "en-US", href: englishUrl },
    { hreflang: "x-default", href: spanishUrl },
  ]);
  setStructuredData();
};

onMounted(() => {
  applySeo();
});

watch(
  () => route.fullPath,
  () => {
    applySeo();
  }
);
</script>
