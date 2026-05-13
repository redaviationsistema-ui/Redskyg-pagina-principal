import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

export const supportedLocales = ["es", "en"];
export const defaultLocale = "es";
export const localeMarketMap = {
  es: "mx",
  en: "en",
};

export const marketLocaleMap = {
  mx: "es",
  en: "en",
  us: "en",
};

export const normalizeLocale = (locale) =>
  supportedLocales.includes(locale) ? locale : defaultLocale;

export const getMarketFromLocale = (locale) =>
  localeMarketMap[normalizeLocale(locale)] || localeMarketMap[defaultLocale];

export const normalizeMarket = (market) => {
  if (marketLocaleMap[market]) return market;
  if (market === "en") return "en";
  if (market === "es") return "mx";
  return getMarketFromLocale(defaultLocale);
};

export const getLocaleFromRoute = (route) =>
  normalizeLocale(marketLocaleMap[normalizeMarket(route?.params?.market)]);

export const getLocaleMeta = (locale) =>
  locale === "en"
    ? {
        htmlLang: "en-US",
        ogLocale: "en_US",
        hrefLang: "en-US",
      }
    : {
        htmlLang: "es-MX",
        ogLocale: "es_MX",
        hrefLang: "es-MX",
      };

export const localizePath = (path, locale = defaultLocale) => {
  if (!path.startsWith("/")) return path;

  const cleanPath = path.replace(/^\/(?:mx|en|us|es)(?=\/|$)/, "") || "/";
  const market = getMarketFromLocale(locale);

  return cleanPath === "/" ? `/${market}` : `/${market}${cleanPath}`;
};

export const useLocale = () => {
  const route = useRoute();
  const router = useRouter();

  const locale = computed(() => getLocaleFromRoute(route));
  const isEnglish = computed(() => locale.value === "en");

  const toLocalizedRoute = (name, params = {}) => ({
    name,
    params: {
      ...params,
      market: getMarketFromLocale(locale.value),
    },
  });

  const switchLocale = (nextLocale) => {
    const normalizedLocale = normalizeLocale(nextLocale);
    const params = { ...route.params };
    params.market = getMarketFromLocale(normalizedLocale);

    if (route.name) {
      router.push({
        name: route.name,
        params,
        query: route.query,
        hash: route.hash,
      });
      return;
    }

    router.push(localizePath(route.path, normalizedLocale));
  };

  return {
    locale,
    isEnglish,
    toLocalizedRoute,
    switchLocale,
  };
};
