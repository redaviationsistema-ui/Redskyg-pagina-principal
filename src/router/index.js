import { h } from "vue";
import { RouterView, createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import { getSeoPageBySlug, getSeoPagePathForLocale, seoPages } from "../data/seoPages";
import { defaultLocale, getLocaleFromRoute, getMarketFromLocale, normalizeMarket } from "../i18n";

const AboutUs = () => import("../views/AboutUs.vue");
const Pricing = () => import("../views/Pricing.vue");
const Blog = () => import("../views/Blog.vue");
const Contact = () => import("../views/Contact.vue");
const SeoLanding = () => import("../views/SeoLanding.vue");
const CompraVenta = () => import("../views/services/CompraVenta.vue");
const TaxiAereo = () => import("../views/services/TaxiAereo.vue");
const AdministracionOperativa = () => import("../views/services/AdministracionOperativa.vue");
const AsesoriaPrecompra = () => import("../views/services/AsesoriaPrecompra.vue");
const ImportExport = () => import("../views/services/ImportExport.vue");
const TallerMotores = () => import("../views/services/TallerMotores.vue");
const Avionica = () => import("../views/services/Avionica.vue");
const Privacy = () => import("../views/Privacy.vue");
const Cookies = () => import("../views/Cookies.vue");
const Terms = () => import("../views/Terms.vue");
const TiempoCompartido = () => import("../views/services/TiempoCompartido.vue");
const Copropiedad = () => import("../views/services/Copropiedad.vue");

const LocaleRouterView = {
  render: () => h(RouterView),
};

const legacySeoRedirects = [
  {
    path: "vuelos-privados-en-mexico",
    redirect: (to) => ({
      name: "vuelos-privados-mexico",
      params: {
        market: normalizeMarket(to.params.market),
      },
      query: to.query,
      hash: to.hash,
      replace: true,
    }),
  },
  {
    path: "vuelos-privados-méxico",
    redirect: (to) => ({
      name: "vuelos-privados-mexico",
      params: {
        market: normalizeMarket(to.params.market),
      },
      query: to.query,
      hash: to.hash,
      replace: true,
    }),
  },
];

const createRouteSeo = (esMeta, enMeta) => ({
  seo: {
    es: esMeta,
    en: enMeta,
  },
});

const pageRoutes = [
  {
    path: "",
    name: "Home",
    component: Home,
    meta: {
      seo: {
        es: {
          title: "Jet Privado en Mexico | Charter Ejecutivo Premium | RedSkyG",
          description:
            "Jet privado en Mexico con disponibilidad real, charter ejecutivo premium y soluciones de aviacion privada sin intermediarios innecesarios.",
          keywords:
            "private jet charter mexico, vuelos privados mexico, charter ejecutivo mexico, jet privado mexico, aviacion privada mexico",
        },
        en: {
          title: "Private Jet in Mexico | Premium Executive Charter | RedSkyG",
          description:
            "Private jet in Mexico with real availability, premium executive charter, and private aviation solutions without unnecessary intermediaries.",
          keywords:
            "private jet charter mexico, private flights mexico, executive charter mexico, private jet mexico, sky group aviation",
        },
      },
    },
  },
  ...legacySeoRedirects,
  {
    path: "about",
    name: "AboutUs",
    component: AboutUs,
    meta: createRouteSeo(
      {
        title: "Sobre Sky Group | Aviacion privada en Mexico",
        description:
          "Conoce Sky Group, un grupo especializado en vuelos privados en Mexico y servicios aeronauticos para clientes corporativos y privados.",
        keywords:
          "vuelos privados en mexico, sky group aviation, aviacion ejecutiva mexico, charter privado mexico",
      },
      {
        title: "About Sky Group | Private Aviation in Mexico",
        description:
          "Learn about Sky Group, a company specialized in private flights in Mexico and aviation services for corporate and private clients.",
        keywords:
          "private aviation mexico, private flights mexico, sky group aviation, aviation services mexico",
      }
    ),
  },
  {
    path: "pricing",
    name: "Pricing",
    component: Pricing,
    meta: createRouteSeo(
      {
        title: "Precios | Vuelos privados en Mexico",
        description:
          "Consulta informacion de precios para vuelos privados en Mexico y servicios aeronauticos personalizados.",
        keywords:
          "precios vuelos privados mexico, cotizar vuelo privado, charter ejecutivo mexico, jet privado mexico",
      },
      {
        title: "Pricing | Private Flights in Mexico",
        description:
          "Review pricing information for private flights in Mexico and tailored aviation services.",
        keywords:
          "private flight pricing mexico, quote private flight mexico, executive charter mexico, private jet mexico",
      }
    ),
  },
  {
    path: "blog",
    name: "Blog",
    component: Blog,
    meta: createRouteSeo(
      {
        title: "Guia de vuelos privados | Sky Group Aviation",
        description:
          "Explora la guia de vuelos privados con rutas, ciudades, contenidos informativos y paginas de cotizacion para aviacion privada en Mexico.",
        keywords:
          "guia de vuelos privados, vuelos privados mexico, rutas jet privado, cotizar vuelo privado mexico, aviacion ejecutiva mexico",
      },
      {
        title: "Private Flight Guide | Sky Group Aviation",
        description:
          "Explore the private flight guide with routes, city pages, educational content, and quote-oriented pages for private aviation in Mexico.",
        keywords:
          "private flight guide, private flights mexico, private jet routes, quote private flight mexico, executive aviation mexico",
      }
    ),
  },
  {
    path: "contact",
    name: "Contact",
    component: Contact,
    meta: createRouteSeo(
      {
        title: "Contacto | Vuelos privados en Mexico",
        description:
          "Contacta a Sky Group para cotizar vuelos privados en Mexico y servicios aeronauticos especializados.",
        keywords:
          "contacto vuelos privados mexico, cotizar vuelo privado, contacto charter ejecutivo, aviacion privada mexico",
      },
      {
        title: "Contact | Private Flights in Mexico",
        description:
          "Contact Sky Group to request private flights in Mexico and specialized aviation services.",
        keywords:
          "contact private flights mexico, quote private flight, executive charter contact, private aviation mexico",
      }
    ),
  },
  {
    path: "aircraft-sales",
    name: "AircraftSales",
    component: CompraVenta,
    meta: createRouteSeo(
      {
        title: "Compra y Venta de Aeronaves | Sky Group Aviation",
        description:
          "Asesoria para compra y venta de aeronaves dentro de un grupo experto en vuelos privados en Mexico y servicios aeronauticos especializados.",
        keywords:
          "compra venta aeronaves mexico, vuelos privados en mexico, comprar jet privado, asesoria aeronaves",
      },
      {
        title: "Aircraft Sales and Acquisition | Sky Group Aviation",
        description:
          "Advisory support for buying and selling aircraft from a team experienced in private aviation in Mexico.",
        keywords:
          "aircraft sales mexico, buy private jet mexico, aircraft acquisition support, private aviation mexico",
      }
    ),
  },
  {
    path: "air-taxi",
    name: "AirTaxi",
    component: TaxiAereo,
    meta: createRouteSeo(
      {
        title: "Taxi Aereo y Vuelos Privados en Mexico | Sky Group",
        description:
          "Servicio de vuelos privados en Mexico con cotizacion rapida, rutas flexibles y atencion ejecutiva.",
        keywords:
          "vuelos privados en mexico, charter ejecutivo mexico, renta de jet privado, taxi aereo mexico",
      },
      {
        title: "Private Jet Charter in Mexico | Sky Group",
        description:
          "Private jet charter service in Mexico with fast quoting, flexible routes, and executive support.",
        keywords:
          "private jet charter in mexico, private flights mexico, executive charter mexico, private jet rental mexico",
      }
    ),
  },
  {
    path: "operations-management",
    name: "OperationsManagement",
    component: AdministracionOperativa,
    meta: createRouteSeo(
      {
        title: "Administracion Operativa | Sky Group Aviation",
        description:
          "Administracion operativa para aeronaves dentro de una estructura enfocada en vuelos privados en Mexico.",
        keywords:
          "administracion operativa aeronaves, vuelos privados en mexico, gestion aeronaves, operacion aeronautica",
      },
      {
        title: "Aircraft Operations Management | Sky Group Aviation",
        description:
          "Aircraft operations management from a team focused on private aviation and executive service in Mexico.",
        keywords:
          "aircraft operations management, private aviation mexico, aircraft management mexico, executive aviation support",
      }
    ),
  },
  {
    path: "prepurchase-inspection",
    name: "PrePurchaseInspection",
    component: AsesoriaPrecompra,
    meta: createRouteSeo(
      {
        title: "Asesoria Precompra | Sky Group Aviation",
        description:
          "Asesoria precompra, valuacion y revision tecnica para operaciones relacionadas con aeronaves ejecutivas y aviacion privada.",
        keywords:
          "asesoria precompra aeronaves, valuacion aeronaves, revision tecnica aeronaves, aviacion ejecutiva mexico",
      },
      {
        title: "Pre-Purchase Inspection | Sky Group Aviation",
        description:
          "Pre-purchase inspection, valuation, and technical review for executive aircraft operations and acquisitions.",
        keywords:
          "pre purchase inspection aircraft, aircraft valuation, executive aircraft review, private aviation mexico",
      }
    ),
  },
  {
    path: "import-export",
    name: "ImportExport",
    component: ImportExport,
    meta: createRouteSeo(
      {
        title: "Importacion y Exportacion Aeronautica | Sky Group",
        description:
          "Coordinacion de importacion y exportacion aeronautica para aeronaves, componentes y operaciones ligadas a aviacion ejecutiva.",
        keywords:
          "importacion aeronaves mexico, exportacion aeronaves, logistica aeronautica, comercio aeronautico",
      },
      {
        title: "Aeronautical Import and Export | Sky Group",
        description:
          "Import and export coordination for aircraft, components, and operations tied to executive aviation.",
        keywords:
          "aircraft import mexico, aircraft export, aeronautical logistics, executive aviation support",
      }
    ),
  },
  {
    path: "engine-shop",
    name: "EngineShop",
    component: TallerMotores,
    meta: createRouteSeo(
      {
        title: "Servicios de Motores Aeronauticos | Sky Group",
        description:
          "Soporte tecnico y coordinacion para motores aeronauticos dentro de un grupo con enfoque en aviacion ejecutiva y vuelos privados en Mexico.",
        keywords:
          "motores aeronauticos mexico, soporte tecnico aeronaves, mantenimiento motores aeronauticos, aviacion ejecutiva",
      },
      {
        title: "Aircraft Engine Services | Sky Group",
        description:
          "Technical support and coordination for aircraft engines from a team focused on executive aviation in Mexico.",
        keywords:
          "aircraft engine services, aircraft technical support, aviation engine maintenance, executive aviation mexico",
      }
    ),
  },
  {
    path: "avionics",
    name: "Avionics",
    component: Avionica,
    meta: createRouteSeo(
      {
        title: "Avionica y Sistemas de Aeronaves | Sky Group",
        description:
          "Avionica, modernizacion y sistemas de aeronaves para operadores y propietarios vinculados con aviacion ejecutiva y vuelos privados en Mexico.",
        keywords:
          "avionica aeronaves mexico, sistemas de aeronaves, modernizacion avionica, aviacion ejecutiva mexico",
      },
      {
        title: "Aircraft Avionics and Systems | Sky Group",
        description:
          "Avionics, modernization, and aircraft systems support for operators and owners connected to executive aviation in Mexico.",
        keywords:
          "aircraft avionics mexico, aircraft systems support, avionics modernization, executive aviation mexico",
      }
    ),
  },
  {
    path: "privacy",
    name: "Privacy",
    component: Privacy,
    meta: createRouteSeo(
      {
        title: "Aviso de Privacidad | Sky Group",
        description:
          "Consulta el aviso de privacidad de Sky Group para conocer el manejo de datos y las practicas de comunicacion del sitio.",
        keywords: "aviso de privacidad sky group, privacidad sitio web aviacion",
      },
      {
        title: "Privacy Policy | Sky Group",
        description:
          "Read the Sky Group privacy policy for information on data handling and communication practices.",
        keywords: "privacy policy sky group, website privacy aviation company",
      }
    ),
  },
  {
    path: "cookies",
    name: "Cookies",
    component: Cookies,
    meta: createRouteSeo(
      {
        title: "Politica de Cookies | Sky Group",
        description:
          "Consulta la politica de cookies de Sky Group para conocer las tecnologias de medicion, sesion y navegacion utilizadas en el sitio.",
        keywords: "politica de cookies sky group, cookies sitio web aviacion, google analytics sky group",
      },
      {
        title: "Cookie Policy | Sky Group",
        description:
          "Read the Sky Group cookie policy to understand the measurement, session, and browsing technologies used on the website.",
        keywords: "cookie policy sky group, website cookies aviation company, google analytics sky group",
      }
    ),
  },
  {
    path: "terms",
    name: "Terms",
    component: Terms,
    meta: createRouteSeo(
      {
        title: "Terminos y Condiciones | Sky Group",
        description:
          "Consulta los terminos y condiciones de uso del sitio web de Sky Group para cotizaciones, servicios, contenidos y comunicaciones.",
        keywords: "terminos y condiciones sky group, uso del sitio web aviacion, condiciones de cotizacion sky group",
      },
      {
        title: "Terms and Conditions | Sky Group",
        description:
          "Read the Sky Group website terms and conditions for quotations, services, content, and communications.",
        keywords: "terms and conditions sky group, aviation website terms, quote conditions sky group",
      }
    ),
  },
  {
    path: "fractional-ownership",
    name: "FractionalOwnership",
    component: TiempoCompartido,
    meta: createRouteSeo(
      {
        title: "Tiempo Compartido Aeronautico | Sky Group",
        description:
          "Modelos de tiempo compartido para clientes que buscan acceso constante a aviacion ejecutiva y vuelos privados en Mexico.",
        keywords:
          "tiempo compartido aeronaves, vuelos privados en mexico, propiedad fraccional jet, acceso compartido aeronaves",
      },
      {
        title: "Fractional Aircraft Ownership | Sky Group",
        description:
          "Fractional ownership models for clients seeking regular access to executive aviation and private flights in Mexico.",
        keywords:
          "fractional aircraft ownership, private aviation mexico, shared jet access, private flights mexico",
      }
    ),
  },
  {
    path: "co-ownership",
    name: "CoOwnership",
    component: Copropiedad,
    meta: createRouteSeo(
      {
        title: "Copropiedad de Aeronaves | Sky Group",
        description:
          "Esquemas de copropiedad para acceso compartido a aeronaves dentro de una estrategia de aviacion ejecutiva y vuelos privados en Mexico.",
        keywords:
          "copropiedad aeronaves mexico, vuelos privados en mexico, propiedad compartida jet, aviacion ejecutiva mexico",
      },
      {
        title: "Aircraft Co-Ownership | Sky Group",
        description:
          "Co-ownership structures for shared access to aircraft within an executive aviation strategy in Mexico.",
        keywords:
          "aircraft co ownership, shared jet ownership, executive aviation mexico, private aircraft access",
      }
    ),
  },
  ...seoPages.map((page) => ({
    path: page.slug,
    alias: [
      getSeoPagePathForLocale(page, "en")?.replace(/^\//, ""),
      getSeoPagePathForLocale(page, "es")?.replace(/^\//, ""),
    ].filter((alias, index, aliases) => alias && alias !== page.slug && aliases.indexOf(alias) === index),
    name: page.slug,
    component: SeoLanding,
    meta: {
      title: page.seoTitle || `${page.title} | Sky Group Aviation`,
      description: page.seoDescription || page.description,
      keywords: page.keywords,
    },
    props: {
      slug: page.slug,
    },
  })),
];

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: () => {
        if (typeof window === "undefined") {
          return `/${getMarketFromLocale(defaultLocale)}`;
        }

        const browserLocale = window.navigator.language?.toLowerCase() || "";
        const market = browserLocale.startsWith("en-us") || browserLocale.startsWith("en")
          ? "en"
          : "mx";

        return `/${market}`;
      },
    },
    {
      path: "/:market(mx|en|us)",
      component: LocaleRouterView,
      children: pageRoutes,
    },
    {
      path: "/us",
      redirect: "/en",
    },
    {
      path: "/us/:pathMatch(.*)*",
      redirect: (to) => {
        const path = Array.isArray(to.params.pathMatch) ? to.params.pathMatch.join("/") : to.params.pathMatch || "";
        return path ? `/en/${path}` : "/en";
      },
    },
    {
      path: "/es",
      redirect: "/mx",
    },
    {
      path: "/es/:pathMatch(.*)*",
      redirect: (to) => {
        const path = Array.isArray(to.params.pathMatch) ? to.params.pathMatch.join("/") : to.params.pathMatch || "";
        return path ? `/mx/${path}` : "/mx";
      },
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach((to, from) => {
  const fromLocale = getLocaleFromRoute(from);
  const fromMarket = normalizeMarket(from.params.market);

  if (to.name && !to.params.market) {
    return {
      name: to.name,
      params: {
        ...to.params,
        market: from.name ? fromMarket : getMarketFromLocale(fromLocale || defaultLocale),
      },
      query: to.query,
      hash: to.hash,
      replace: true,
    };
  }

  if (typeof to.name === "string") {
    const page = getSeoPageBySlug(to.name);

    if (page) {
      const locale = getLocaleFromRoute(to);
      const localizedPath = getSeoPagePathForLocale(page, locale);
      const canonicalPath = `/${normalizeMarket(to.params.market)}/${localizedPath.replace(/^\//, "")}`;

      if (to.path !== canonicalPath) {
        return {
          path: canonicalPath,
          query: to.query,
          hash: to.hash,
          replace: true,
        };
      }
    }
  }

  return true;
});

export default router;
