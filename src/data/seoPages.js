const whatsappHref =
  "https://wa.me/525586186576?text=Hola,%20quiero%20cotizar%20un%20vuelo%20privado%20en%20Mexico.%20Podrian%20darme%20informacion%3F";
const whatsappHrefEn =
  "https://wa.me/525586186576?text=Hello,%20I%20would%20like%20to%20request%20a%20private%20flight%20quote%20in%20Mexico.%20Could%20you%20share%20more%20information%3F";

const sectionImages = [
  "/images/blog/Blog1.png",
  "/images/blog/Blog2.png",
  "/images/blog/Blog3.png",
  "/images/blog/About.png",
  "/images/Home/home10.png",
  "/images/About/About10.png",
];

const hashString = (value = "") =>
  Array.from(String(value)).reduce((acc, char) => acc + char.charCodeAt(0), 0);

const getPrimaryKeyword = (keywords = "", title = "") =>
  String(keywords)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)[0] || title;

const getAudienceLabel = (audience = [], locale = "es") => {
  if (!audience.length) {
    return locale === "en"
      ? "companies, premium travelers, and urgent trips"
      : "empresas, viajeros premium y viajes urgentes";
  }

  if (locale === "en") return audience.join(", ").toLowerCase();
  return audience.join(", ").toLowerCase();
};

const buildFaqs = (title, variant, locale = "es") =>
  locale === "en"
    ? [
        {
          question: `How do I request ${variant.article} ${title.toLowerCase()}?`,
          answer:
            "Share your route, preferred timing, passenger count, and whether the trip is one-way or round-trip. That makes it easier to evaluate availability and send a proposal with the right aircraft profile.",
        },
        {
          question: `What usually matters most when evaluating ${title.toLowerCase()}?`,
          answer:
            "The most important factors are route profile, schedule flexibility, airport access, passenger needs, and the type of experience expected. Those points shape the proposal more than a generic public rate.",
        },
        {
          question: `What does ${title.toLowerCase()} include?`,
          answer:
            "It usually includes commercial follow-up, operational coordination, passenger support, and a quote aligned with your route, timing, and travel needs.",
        },
        {
          question: `Can I request an immediate quote for ${title.toLowerCase()}?`,
          answer:
            "Yes. You can request a quote through WhatsApp or the contact flow to receive a faster review based on route, passengers, and timing.",
        },
      ]
    : [
        {
          question: `Como contratar ${variant.article} ${title.toLowerCase()}?`,
          answer:
            "Solo comparte ruta, fecha, numero de pasajeros y si necesitas vuelo sencillo o redondo. Con esa base es mas facil revisar disponibilidad y armar una propuesta util para tu operacion.",
        },
        {
          question: `Que es lo mas importante al evaluar ${title.toLowerCase()}?`,
          answer:
            "Normalmente importan la ruta, la flexibilidad de horario, el acceso al aeropuerto, el perfil de pasajeros y el tipo de experiencia que espera el cliente. Esas variables pesan mas que una cifra generica publicada sin contexto.",
        },
        {
          question: `Que incluye ${title.toLowerCase()}?`,
          answer:
            "Incluye coordinacion comercial, seguimiento operativo, atencion personalizada y una propuesta alineada a tu ruta, tus tiempos y el tipo de viaje que necesitas.",
        },
        {
          question: `Puedo solicitar cotizacion inmediata para ${title.toLowerCase()}?`,
          answer:
            "Si. Puedes pedir una cotizacion por WhatsApp o desde contacto para recibir respuesta mas rapida sobre ruta, pasajeros y disponibilidad inicial.",
        },
      ];

const buildLongformSections = ({
  slug,
  title,
  description,
  keywords,
  intro,
  benefitTitle,
  benefitText,
  operationTitle,
  operationText,
  ctaText,
  audience,
  locale = "es",
}) => {
  const primaryKeyword = getPrimaryKeyword(keywords, title);
  const audienceLabel = getAudienceLabel(audience, locale);
  const imageOffset = hashString(slug) % sectionImages.length;

  if (locale === "en") {
    return [
      {
        title: benefitTitle || `Why ${title} is a strong search term`,
        kicker: "Search Intent",
        image: sectionImages[imageOffset % sectionImages.length],
        summary:
          `If you are already comparing private aviation options, ${primaryKeyword} usually means you are much closer to requesting a quote than just browsing.`,
        highlights: ["High-intent traffic", "Private aviation demand", "Clear commercial focus"],
        paragraphs: [
          `${title} is not just a descriptive topic. If you arrive through this search, you are usually much closer to taking action than someone who is only starting to research. ${intro} The goal here is simple: help you understand what the service means, whether it fits your trip, and why a private aviation quote should be reviewed according to route, timing, and service expectations.`,
          `${description} That matters especially for ${audienceLabel}, because the decision is rarely based on one generic factor. You usually want to know if the route works, how the operation adapts to your timing, and whether the service level really matches the urgency or premium nature of the trip. Clearer content helps you move faster from broad interest to a real quote conversation.`,
        ],
      },
      {
        title: operationTitle || `How ${title} is usually evaluated`,
        kicker: "Operation",
        image: sectionImages[(imageOffset + 1) % sectionImages.length],
        summary:
          "Private aviation decisions usually depend on route logic, airport access, schedule flexibility, passenger profile, and the level of coordination required.",
        highlights: ["Route planning", "Schedule flexibility", "Passenger profile"],
        paragraphs: [
          `${operationText} In practice, the value of ${title.toLowerCase()} grows when you need more control over departure windows, less friction at the airport, stronger privacy, or a better way to protect a business or premium agenda. That is why the operational side matters. It gives you context and shows that private aviation is not one fixed product, but a service that adapts to airport pair, aircraft category, travel distance, baggage needs, and the importance of your trip.`,
          `This also makes the next step clearer. Many searches start broad, but once you understand whether you need a light jet, a larger cabin, a domestic route solution, or a charter setup for tighter planning windows, it becomes much easier to request the right kind of support.`,
        ],
      },
      {
        title: `Who usually searches for ${title}`,
        kicker: "Audience",
        image: sectionImages[(imageOffset + 2) % sectionImages.length],
        summary:
          "This kind of search usually comes from people who already value time, privacy, flexibility, and a smoother travel experience than commercial aviation can offer.",
        highlights: ["Companies", "Premium travelers", "Urgent departures"],
        paragraphs: [
          `The intent behind ${primaryKeyword} is usually more defined than it looks. Maybe you need to protect a business schedule, simplify a premium itinerary, move a group with more privacy, or solve a trip without losing time in a fragmented booking process. Stronger copy helps connect that need with the right message. Instead of relying on luxury clichés, it should help you see why control, continuity, privacy, and timing matter.`,
          `${benefitText} That becomes even more relevant when you are comparing several providers or route options at the same time. Clearer language builds more trust because it feels informed and operationally grounded instead of generic.`,
        ],
      },
      {
        title: `How ${title} supports route planning in Mexico`,
        kicker: "Route Context",
        image: sectionImages[(imageOffset + 3) % sectionImages.length],
        summary:
          "A focused landing page helps connect the keyword with real route demand, airport patterns, and the reasons why travelers move to private aviation.",
        highlights: ["Domestic and international routes", "Airport strategy", "Mission fit"],
        paragraphs: [
          `One of the biggest advantages of focusing on ${title.toLowerCase()} is that it turns a broad search into a more practical route conversation. In Mexico, private aviation demand is shaped by corporate corridors, tourism hubs, executive airports, and time-sensitive travel patterns. That means you need more than a headline and a short description. You need to understand how route design, airport access, turnaround timing, and service continuity change the proposal.`,
          `That clarity also helps the rest of the site connect better around routes, cities, quote pages, and supporting content without sounding repetitive. More importantly, it gives you a stronger sense that the brand understands the market and your trip.`,
        ],
      },
      {
        title: `How to request ${title} with a clearer quote process`,
        kicker: "Next Step",
        image: sectionImages[(imageOffset + 4) % sectionImages.length],
        summary:
          "The best next step is to move from a generic search into a quote request with route, date, passengers, and timing clearly defined.",
        highlights: ["Share route details", "Define timing", "Request a tailored proposal"],
        paragraphs: [
          `If ${title.toLowerCase()} matches what you need, the next step should feel easy. Share your route, date, passenger count, and preferred timing. ${ctaText} That handoff matters because private aviation works much better when the quote starts from a real trip instead of a vague request.`,
          `A clearer quote process also builds more trust. Instead of leaving with only a general idea, you get a more useful path toward a personalized proposal that actually fits the trip.`,
        ],
      },
    ];
  }

  return [
    {
      title: benefitTitle || `Por que ${title} es una keyword fuerte`,
      kicker: "Intencion de busqueda",
      image: sectionImages[imageOffset % sectionImages.length],
      summary:
        `Si ya estas comparando opciones reales de aviacion privada, ${primaryKeyword} suele indicar que estas mucho mas cerca de cotizar que de solo explorar.`,
      highlights: ["Trafico con intencion", "Aviacion privada", "Enfoque comercial"],
      paragraphs: [
        `${title} no es solo un tema descriptivo. Si llegas por esta busqueda, normalmente estas mucho mas cerca de pedir una propuesta que de apenas investigar. ${intro} La idea aqui es ayudarte a entender que significa el servicio, si encaja con tu viaje y por que una propuesta de aviacion privada debe revisarse segun la ruta, el horario y el nivel de atencion que esperas.`,
        `${description} Eso importa especialmente para ${audienceLabel}, porque esta decision rara vez depende de un solo factor generico. Normalmente quieres saber si la ruta hace sentido, como cambia la operacion segun tus tiempos y si el servicio realmente encaja con la urgencia o el perfil premium del viaje. Un contenido mas claro te ayuda a pasar mas rapido de la duda a una cotizacion real.`,
      ],
    },
    {
      title: operationTitle || `Como se evalua normalmente ${title}`,
      kicker: "Operacion",
      image: sectionImages[(imageOffset + 1) % sectionImages.length],
      summary:
        "Las decisiones de aviacion privada suelen depender de la logica de ruta, el acceso a aeropuerto, la flexibilidad de horario y el perfil real del pasajero.",
      highlights: ["Planeacion de ruta", "Flexibilidad", "Perfil de pasajeros"],
      paragraphs: [
        `${operationText} En la practica, el valor de ${title.toLowerCase()} crece cuando necesitas mas control sobre el horario de salida, menos friccion en aeropuerto, mejor privacidad o una forma mas eficiente de proteger una agenda ejecutiva o premium. Por eso el lado operativo importa. Te da contexto y te deja ver que la aviacion privada no es un producto fijo, sino un servicio que cambia segun el par de aeropuertos, la categoria de aeronave, la distancia, el equipaje y la importancia del viaje.`,
        `Eso tambien hace mas claro el siguiente paso. Muchas busquedas empiezan amplias, pero cuando entiendes si te conviene un jet ligero, una cabina mas amplia, una solucion nacional o una estructura charter para tiempos mas cerrados, pedir apoyo se vuelve mucho mas facil.`,
      ],
    },
    {
      title: `Quien suele buscar ${title}`,
      kicker: "Perfil del cliente",
      image: sectionImages[(imageOffset + 2) % sectionImages.length],
      summary:
        "Este tipo de busqueda suele venir de personas que ya valoran tiempo, privacidad, flexibilidad y una experiencia mas fluida que la aviacion comercial.",
      highlights: ["Empresas", "Viajeros premium", "Salidas urgentes"],
      paragraphs: [
        `La intencion detras de ${primaryKeyword} suele estar mas definida de lo que parece. Tal vez quieres proteger una agenda de negocio, simplificar un itinerario premium, mover a tu grupo con mas privacidad o resolver un viaje sin perder tiempo en procesos fragmentados. Un mensaje mas claro conecta mejor con eso. En vez de depender de frases aspiracionales, conviene mostrarte por que control, continuidad, privacidad y tiempos si hacen diferencia.`,
        `${benefitText} Eso pesa aun mas cuando comparas varios proveedores o varias rutas al mismo tiempo. Un lenguaje mas claro genera mas confianza porque se siente mejor aterrizado y menos generico.`,
      ],
    },
    {
      title: `Como ${title} ayuda a planear rutas en Mexico`,
      kicker: "Contexto de ruta",
      image: sectionImages[(imageOffset + 3) % sectionImages.length],
      summary:
        "Una landing enfocada permite conectar la keyword con demanda real de rutas, patrones de aeropuerto y razones por las que el usuario cambia a aviacion privada.",
      highlights: ["Rutas MX + INTL", "Estrategia de aeropuerto", "Mision adecuada"],
      paragraphs: [
        `Una de las ventajas mas claras de enfocarte en ${title.toLowerCase()} es que convierte una busqueda amplia en una conversacion de ruta mucho mas practica. En Mexico, la demanda de aviacion privada se mueve por corredores corporativos, destinos premium, aeropuertos ejecutivos y traslados sensibles al tiempo. Por eso no basta con un titulo y una descripcion corta. Necesitas entender como el diseno de ruta, el acceso al aeropuerto, los tiempos de respuesta y la continuidad del servicio cambian la propuesta.`,
        `Esa claridad tambien ayuda a conectar mejor rutas, ciudades, paginas de cotizacion y contenido de apoyo sin que todo suene repetido. Y, sobre todo, te deja ver que la marca entiende el mercado y tu viaje.`,
      ],
    },
    {
      title: `Como solicitar ${title} con una cotizacion mas clara`,
      kicker: "Siguiente paso",
      image: sectionImages[(imageOffset + 4) % sectionImages.length],
      summary:
        "El mejor siguiente paso es pasar de una busqueda generica a una solicitud con ruta, fecha, pasajeros y horario bien definidos.",
      highlights: ["Comparte ruta", "Define horario", "Recibe propuesta"],
      paragraphs: [
        `Si ${title.toLowerCase()} si encaja con lo que buscas, el siguiente paso debe sentirse facil. Comparte tu ruta, fecha, numero de pasajeros y horario ideal. ${ctaText} Ese momento importa porque la aviacion privada funciona mucho mejor cuando la cotizacion arranca desde un viaje real y no desde una solicitud vaga.`,
        `Un proceso de cotizacion mas claro tambien genera mas confianza. En lugar de quedarte con una idea general, avanzas hacia una propuesta personalizada que si tiene sentido para tu viaje.`,
      ],
    },
  ];
};

const createPage = ({
  slug,
  title,
  seoTitle,
  seoDescription,
  category,
  description,
  keywords,
  intro,
  benefitTitle,
  benefitText,
  operationTitle,
  operationText,
  ctaTitle,
  ctaText,
  audience,
  english = false,
}) => {
  const variant = english
    ? {
        kicker: "Private Aviation Guide",
        article: "a",
        whyTitle: "Why this page matters",
        whyText:
          "It answers the questions you are already asking and gives you a clearer path to quote private aviation in Mexico.",
      }
    : {
        kicker: category,
        article: "un",
        whyTitle: "Por que esta pagina ayuda a convertir",
        whyText:
          "Responde las dudas que ya tienes y te acerca a una cotizacion real en lugar de dejarte solo explorando.",
      };

  return {
    autogeneratedLongform: true,
    slug,
    path: `/${slug}`,
    title,
    seoTitle,
    seoDescription,
    description,
    keywords,
    heroKicker: variant.kicker,
    heroTitle: title,
    heroIntro: intro,
    heroIntroByLocale: {
      es: intro,
      en: `If you are looking for ${title.toLowerCase()}, here you can understand how it works, what really matters, and how to move toward a clearer private aviation quote in Mexico.`,
    },
    audience,
    whatsappHref,
    sections: buildLongformSections({
      slug,
      title,
      description,
      keywords,
      intro,
      benefitTitle,
      benefitText,
      operationTitle,
      operationText,
      ctaText,
      audience,
      locale: "es",
    }),
    sectionsByLocale: {
      es: buildLongformSections({
        slug,
        title,
        description,
        keywords,
        intro,
        benefitTitle,
        benefitText,
        operationTitle,
        operationText,
        ctaText,
        audience,
        locale: "es",
      }),
      en: buildLongformSections({
        slug,
        title,
        description,
        keywords,
        intro,
        benefitTitle,
        benefitText,
        operationTitle,
        operationText,
        ctaText,
        audience,
        locale: "en",
      }),
    },
    ctaTitle,
    ctaText,
    ctaByLocale: {
      es: {
        title: ctaTitle,
        text: ctaText,
      },
      en: {
        title: `Get more information about ${title}`,
        text:
          "Share your route, passengers, and preferred timing so you can receive a quote that fits your trip.",
      },
    },
    faqs: buildFaqs(title, variant, "es"),
    faqsByLocale: {
      es: buildFaqs(title, variant, "es"),
      en: buildFaqs(title, { article: "a" }, "en"),
    },
  };
};

export const seoPages = [
  {
    slug: "vuelos-privados-mexico",
    path: "/vuelos-privados-mexico",
    title: "Vuelos privados en Mexico",
    category: "Paginas Principales",
    description:
      "Cotiza vuelos privados en Mexico con atencion personalizada, cobertura nacional y rutas ejecutivas para tu agenda personal o de negocio.",
    keywords:
      "vuelos privados mexico, vuelo privado mexico, contratar vuelo privado, cotizar vuelo privado mexico",
    heroKicker: "Paginas Principales",
    heroTitle: "Vuelos privados en Mexico",
    heroIntro:
      "Si buscas una forma premium de viajar dentro o fuera del pais, aqui puedes entender como funciona una operacion privada, que variables cambian la propuesta, que aeropuertos concentran mayor actividad ejecutiva y que rutas suelen tener mas demanda en Mexico.",
    heroImage: "/images/Home/home2.jpg",
    heroStats: [
      { value: "MX + INTL", label: "Cobertura para rutas nacionales e internacionales" },
      { value: "24/7", label: "Atencion para cotizacion y coordinacion inicial" },
      { value: "Premium", label: "Enfoque ejecutivo para viajeros y empresas" },
    ],
    audience: ["Clientes privados", "Empresas", "Viajes urgentes"],
    whatsappHref,
    sections: [
      {
        title: "Cuanto cuesta un vuelo privado en Mexico?",
        kicker: "Cotizacion",
        image: "/images/blog/Blog1.png",
        summary:
          "Una cotizacion profesional depende de la ruta, la aeronave, la disponibilidad y el perfil real del viaje, no de una tarifa publica unica.",
        highlights: ["Ruta y horario", "Tipo de aeronave", "Perfil de pasajeros"],
        paragraphs: [
          "El costo de un vuelo privado en Mexico no se define con una tarifa unica ni con una tabla general, porque cada operacion cambia segun la ruta, el tipo de aeronave, el tiempo total de vuelo, la disponibilidad del equipo y los servicios que el pasajero necesita. Una salida ejecutiva entre ciudades cercanas no se estructura igual que una operacion hacia playa, una ruta fronteriza o un itinerario internacional con escalas, permisos y tiempos de espera. Por eso una pagina de vuelos privados en Mexico debe explicar el criterio detras de la cotizacion sin caer en promesas de precio poco confiables.",
          "Tambien influyen factores operativos como posicionamiento de aeronave, horarios de salida, uso de terminal ejecutiva, perfil de pasajeros, equipaje, pernocta de tripulacion y requerimientos adicionales de coordinacion. En viajes corporativos, por ejemplo, importa mucho la puntualidad, la posibilidad de ajustar la agenda y la eficiencia puerta a puerta. En viajes familiares o premium, el foco puede estar en privacidad, flexibilidad y experiencia. La mejor forma de orientarte no es publicar cifras genericas, sino explicarte que una cotizacion profesional se arma con base en la mision real para que la propuesta tenga sentido desde el inicio.",
        ],
      },
      {
        title: "Aeropuertos privados en Mexico",
        kicker: "Infraestructura",
        image: "/images/About/About10.png",
        summary:
          "La operacion privada suele apoyarse en aeropuertos ejecutivos, terminales especializadas y hubs clave como Toluca, CDMX, Monterrey, Guadalajara y Cancun.",
        highlights: ["Terminal ejecutiva", "Menor friccion", "Hubs estrategicos"],
        paragraphs: [
          "Cuando los usuarios buscan aeropuertos privados en Mexico, en realidad suelen referirse a los aeropuertos y terminales que operan aviacion ejecutiva, vuelos charter y servicios de atencion privada. En el pais, la actividad privada se concentra en zonas con fuerte movimiento corporativo, turistico y patrimonial, como Toluca, Ciudad de Mexico, Monterrey, Guadalajara, Queretaro, Cancun y Los Cabos. No todos funcionan de la misma manera, pero si comparten un objetivo: ofrecer una experiencia con menor friccion que la aviacion comercial, con acceso mas agil, coordinacion dedicada y mejores condiciones para agendas exigentes.",
          "Segun la ruta y el perfil del pasajero, la operacion puede apoyarse en terminales ejecutivas, FBOs, slots disponibles, manejo especial de pasajeros y procesos de embarque mas directos. Esto es especialmente relevante si valoras continuidad de agenda, privacidad y tiempos optimizados. Tambien te ayuda a entender desde donde puedes salir, que hubs ejecutivos te convienen mas y como cambia la experiencia cuando vuelas por infraestructura orientada a aviacion privada.",
        ],
      },
      {
        title: "Tipos de jets privados",
        kicker: "Aeronaves",
        image: "/images/Service/TaxiAereo.png",
        summary:
          "No todos los vuelos requieren la misma categoria de aeronave: el viaje cambia segun alcance, pasajeros, equipaje y experiencia buscada.",
        highlights: ["Jets ligeros", "Midsize y heavy", "Opciones segun mision"],
        paragraphs: [
          "No todos los vuelos privados en Mexico se operan con la misma categoria de aeronave. Existen jets ligeros, midsize, super midsize, heavy jets, turbohelices y helicopteros, y cada opcion responde a una necesidad distinta de alcance, tiempo, numero de pasajeros, equipaje y perfil de viaje. Si quieres resolver una agenda ejecutiva dentro del pais, puede convenirte una aeronave agil para tramos cortos o medianos. Si viajas en familia o en un grupo premium, puede hacer mas sentido una cabina mas amplia, con mayor autonomia y comodidad. Entender estas diferencias te ayuda a pedir una propuesta mejor orientada.",
          "Desde la perspectiva comercial, hablar de tipos de jets privados permite alinear expectativa y operacion. Hay usuarios que llegan buscando un termino general como vuelo privado en Mexico, pero en realidad tienen una necesidad concreta: rentar un jet para una reunion, una salida urgente, un viaje de lujo o una ruta frecuente. Esta seccion sirve para traducir esa necesidad a una categoria operativa sin abrumar al visitante con tecnicismos. Ademas, fortalece el SEO semantico al relacionar la pagina con conceptos como charter ejecutivo, avion privado, jet ligero, jet mediano y aeronaves para rutas nacionales e internacionales, ampliando el espectro de palabras clave que la URL puede capturar.",
        ],
      },
      {
        title: "Rutas mas solicitadas",
        kicker: "Demanda real",
        image: "/images/blog/Blog2.png",
        summary:
          "Las rutas con mayor demanda suelen unir corredores corporativos y destinos premium como Monterrey, Guadalajara, Cancun y Los Cabos.",
        highlights: ["Corredores de negocio", "Destinos premium", "Alta intencion de compra"],
        paragraphs: [
          "Entre las rutas mas solicitadas dentro de la aviacion privada en Mexico destacan corredores de negocio y destinos premium como CDMX a Monterrey, CDMX a Guadalajara, Toluca a Cancun, Monterrey a Cancun, Guadalajara a Los Cabos y conexiones hacia ciudades con alta actividad corporativa o turistica. Estas rutas suelen concentrar demanda porque combinan ahorro de tiempo, necesidad de flexibilidad y usuarios con una motivacion clara para cotizar. Una landing fuerte debe recoger esa intencion y mostrar que los vuelos privados en Mexico no son un concepto abstracto, sino una solucion concreta para trayectos que se repiten con frecuencia y donde el valor del servicio es facil de entender.",
          "Tambien existen rutas que ganan fuerza por temporadas, por cambios de agenda o por necesidades de traslado urgente. Un viaje privado puede ser valioso cuando hay reuniones en distintas ciudades el mismo dia, cuando un grupo necesita moverse sin depender de horarios comerciales o cuando el destino tiene un componente premium donde la experiencia completa importa. Incluir rutas mas solicitadas dentro de esta pagina ayuda a posicionar mejor el contenido principal y a abrir espacio para enlazado interno hacia paginas de ruta, paginas por ciudad y contenidos de apoyo. Eso hace que la URL ganadora no solo atraiga trafico, sino que distribuya autoridad a otras piezas del ecosistema SEO.",
        ],
      },
      {
        title: "Como cotizar un vuelo privado",
        kicker: "Siguiente paso",
        image: "/images/blog/About.png",
        summary:
          "La mejor cotizacion empieza con una ruta clara, fecha, pasajeros y necesidades operativas bien definidas para recibir una propuesta util.",
        highlights: ["Comparte tu ruta", "Define pasajeros", "Avanza a propuesta"],
        paragraphs: [
          "Cotizar un vuelo privado de forma correcta empieza por compartir informacion clara sobre la ruta, la fecha, el numero de pasajeros, el tipo de viaje y cualquier restriccion operativa o de agenda. Mientras mejor se define el escenario, mas facil es recibir una propuesta alineada a lo que realmente necesitas.",
          "Si quieres profundizar en el proceso, el siguiente paso puede llevarte a https://redskyg.com/landing/ para revisar que datos conviene compartir, como se estructura una respuesta comercial y por que una propuesta personalizada vale mas que una cifra generica sin contexto.",
        ],
        href: "https://redskyg.com/landing/",
        linkLabel: "Ir a la pagina para cotizar un vuelo privado",
      },
    ],
    ctaTitle: "Solicita tu propuesta de vuelo privado",
    ctaText:
      "Comparte tu ruta y horarios para recibir atencion personalizada y una cotizacion alineada a tu operacion.",
    faqs: [
      {
        question: "Como solicitar una cotizacion de vuelos privados en Mexico?",
        answer:
          "Comparte aeropuerto de salida, destino, fecha, numero de pasajeros, horario tentativo y cualquier dato importante sobre equipaje o flexibilidad. Con esa base es mas facil revisar disponibilidad y proponer una opcion alineada a la operacion.",
      },
      {
        question: "Que rutas suelen tener mas demanda en vuelos privados en Mexico?",
        answer:
          "Rutas corporativas y premium como CDMX, Toluca, Monterrey, Guadalajara, Cancun y Los Cabos suelen concentrar mucha actividad, aunque la demanda depende del perfil del pasajero, la temporada y la urgencia del traslado.",
      },
      {
        question: "Publicar precios fijos ayuda a cotizar mejor un vuelo privado?",
        answer:
          "No necesariamente. En aviacion privada las variables operativas cambian mucho, asi que una propuesta personalizada suele ser mas util que un precio generico sin contexto de ruta, pasajeros y disponibilidad.",
      },
    ],
  },
  {
    slug: "landing",
    path: "/landing",
    title: "Como Cotizar un Vuelo Privado",
    category: "Paginas de Intencion de Compra",
    description:
      "Conoce como cotizar un vuelo privado con los datos correctos para recibir una propuesta clara, agil y alineada a tu operacion.",
    keywords:
      "como cotizar un vuelo privado, cotizar vuelo privado mexico, solicitar cotizacion vuelo privado, landing vuelos privados",
    heroKicker: "Paginas de Intencion de Compra",
    heroTitle: "Como Cotizar un Vuelo Privado",
    heroIntro:
      "Si ya estas evaluando una salida privada, aqui puedes ver que informacion conviene compartir para recibir una propuesta clara, util y mejor orientada desde el primer contacto.",
    heroIntroByLocale: {
      es: "Si ya estas evaluando una salida privada, aqui puedes ver que informacion conviene compartir para recibir una propuesta clara, util y mejor orientada desde el primer contacto.",
      en: "If you are already considering a private flight, here you can see which details matter before asking for a clearer, more useful quote.",
    },
    audience: ["Usuarios listos para cotizar", "Leads calientes", "Cotizacion"],
    whatsappHref,
    sections: [
      {
        title: "Que informacion conviene compartir",
        kicker: "Datos clave",
        image: "/images/blog/Blog1.png",
        summary:
          "Una mejor cotizacion empieza con una ruta clara, fecha, pasajeros y contexto suficiente para entender la mision real del viaje.",
        paragraphs: [
          "Lo mas importante al cotizar un vuelo privado es indicar ruta, fecha, numero de pasajeros, si el viaje es sencillo o redondo y cualquier limitacion de horario. Con esa base el equipo puede aterrizar mejor la necesidad, revisar viabilidad operativa y construir una propuesta mucho mas util que una respuesta general. Cuando compartes informacion clara desde el inicio, la cotizacion deja de ser una aproximacion vaga y se convierte en una herramienta real para decidir.",
          "Si ya conoces aeropuerto de salida, destino, horario deseado, perfil de equipaje o tipo de viaje, incluirlo acelera el proceso y evita propuestas demasiado abiertas. Esto es especialmente importante en aviacion privada, donde la mision cambia segun tiempos, aeropuerto, disponibilidad y experiencia esperada. Una buena pagina de cotizacion no solo pide datos: explica por que esos datos ayudan a recibir una respuesta mejor alineada con la operacion.",
        ],
      },
      {
        title: "Por que una cotizacion personalizada funciona mejor",
        kicker: "Valor comercial",
        image: "/images/blog/Blog2.png",
        summary:
          "Una propuesta personalizada vale mas que una cifra generica porque toma en cuenta la ruta, la aeronave, la disponibilidad y el tipo de servicio esperado.",
        paragraphs: [
          "Una operacion privada depende de disponibilidad, tipo de aeronave, posicionamiento, tiempos de tripulacion y condiciones del itinerario. Por eso una propuesta a la medida suele aportar mas valor que un precio generico. En este mercado, publicar un numero fijo sin contexto puede generar expectativas poco realistas, mientras que una cotizacion personalizada ayuda a entender por que ciertas opciones operan mejor para una ruta especifica, un perfil de pasajeros concreto o una agenda con poca flexibilidad.",
          "Ademas, una cotizacion bien trabajada te permite comparar opciones con mas claridad y decidir con mejor contexto operativo. No solo recibes una respuesta comercial; recibes una orientacion mas cercana a tu caso.",
        ],
      },
      {
        title: "Como se estructura una solicitud util",
        kicker: "Proceso",
        image: "/images/blog/About.png",
        summary:
          "Una solicitud de calidad traduce una necesidad de viaje en un escenario comercial y operativo que si se puede evaluar con rapidez.",
        paragraphs: [
          "Una solicitud util no necesita ser compleja, pero si debe aterrizar la necesidad. Compartir la mision, el motivo general del viaje, la cantidad de pasajeros, el nivel de flexibilidad y cualquier dato clave sobre horarios ayuda a transformar una idea general en una operacion evaluable. Eso permite al equipo comercial revisar disponibilidad, estimar escenarios razonables y responder con una propuesta que no se sienta improvisada o demasiado abierta.",
          "Este paso reduce friccion. En vez de sentir que tienes que entender toda la aviacion privada antes de preguntar, solo necesitas compartir informacion suficiente para que el equipo haga el resto. La idea es darte claridad, rapidez y un proceso facil para pasar de interes a propuesta.",
        ],
      },
      {
        title: "Errores comunes al pedir una cotizacion",
        kicker: "Mejor practica",
        image: "/images/Home/home10.png",
        summary:
          "El error mas comun es pedir una cotizacion sin contexto, porque eso obliga a trabajar con supuestos y debilita la calidad de la respuesta.",
        paragraphs: [
          "Uno de los errores mas comunes es pedir una cotizacion sin ruta definida, sin fecha tentativa o sin numero de pasajeros. En esos casos la respuesta inevitablemente se vuelve mas amplia, porque faltan datos para estimar una solucion aterrizada. Tambien pasa cuando no aclaras si necesitas una salida urgente, un viaje sencillo, una operacion redonda o una experiencia premium con requerimientos especiales. Mientras menos contexto exista, mas probable es que la propuesta se sienta distante de lo que realmente buscas.",
          "Otro error frecuente es asumir que todas las misiones privadas se parecen. No es lo mismo una salida corporativa con agenda critica que un viaje de placer a un destino premium o una ruta que necesita operar en horarios poco comunes. Entender estas diferencias te ayuda a recibir una propuesta mas inteligente y mas util.",
        ],
      },
      {
        title: "Siguiente paso para solicitar tu propuesta",
        kicker: "Conversion",
        image: "/images/Home/home11.png",
        summary:
          "El objetivo final es pasar de la investigacion a una propuesta clara con seguimiento comercial y operativo bien enfocado.",
        paragraphs: [
          "Si ya tienes la ruta definida o una idea clara de la operacion, puedes enviar tus datos por WhatsApp o por la pagina de contacto para recibir seguimiento mas rapido. La clave es que el siguiente paso no se quede en una consulta abstracta, sino que se convierta en una solicitud util para que el equipo pueda ayudarte con opciones reales y tiempos de respuesta razonables.",
          "El objetivo es convertir tu necesidad en una propuesta clara, no dejarte con informacion ambigua o sin ruta comercial. Por eso esta pagina funciona mejor cuando combina educacion breve, orientacion practica y una llamada a la accion directa. Asi entiendes que cotizar un vuelo privado no es complicado, pero si conviene hacerlo con mejor informacion desde el inicio.",
        ],
      },
    ],
    sectionsByLocale: {
      en: [
        {
          title: "What information should you share first?",
          kicker: "Key details",
          image: "/images/blog/Blog1.png",
          summary:
            "A better private flight quote starts with a clear route, timing, passenger count, and enough context to understand the mission.",
          paragraphs: [
            "The most useful starting point when quoting a private flight is the route, date, passenger count, whether the trip is one-way or round-trip, and any schedule limitation that matters. That gives the team a stronger base for evaluating feasibility and building a proposal that actually fits the request. When users share clear information from the beginning, the quote becomes more than a vague estimate and starts working as a real decision-making tool.",
            "If you already know the departure airport, destination airport, preferred time, baggage profile, or travel purpose, adding those points helps speed up the process and avoid overly broad responses. This matters in private aviation because every mission changes according to airport pair, schedule, availability, and service expectations. A strong quote page should not only ask for data. It should explain why that data leads to a better proposal.",
          ],
        },
        {
          title: "Why a personalized quote works better",
          kicker: "Commercial value",
          image: "/images/blog/Blog2.png",
          summary:
            "A personalized proposal creates more value than a generic number because it reflects the route, aircraft profile, availability, and expected service level.",
          paragraphs: [
            "A private aviation mission depends on availability, aircraft category, positioning, crew timing, and the structure of the itinerary. That is why a tailored quote is usually far more useful than a generic public figure. In this market, fixed numbers without context often create unrealistic expectations, while a personalized quote helps explain why certain options work better for a specific route, traveler profile, or schedule window.",
            "A stronger quote also improves comparison. Instead of receiving a vague answer, the user gets a more practical commercial orientation and can evaluate options with better operational context. That strengthens trust, improves lead quality, and makes it easier for the commercial team to respond with a serious proposal from the first exchange.",
          ],
        },
        {
          title: "How a useful request is structured",
          kicker: "Process",
          image: "/images/blog/About.png",
          summary:
            "A strong request turns a general travel need into a mission that can actually be reviewed quickly and clearly.",
          paragraphs: [
            "A useful request does not need to be complex, but it should define the mission. Sharing the route, travel purpose, passenger count, level of flexibility, and any key timing detail helps transform general interest into something the team can evaluate. That makes it easier to review availability, estimate realistic scenarios, and answer with a proposal that does not feel improvised or too open-ended.",
            "From the traveler perspective, this lowers friction. Instead of feeling like they need to understand the whole private aviation market before asking, they only need to share enough detail for the team to do the rest. That is the message a strong quote landing should send: clarity, speed, and an easy path from interest to proposal.",
          ],
        },
        {
          title: "Common mistakes when requesting a quote",
          kicker: "Best practice",
          image: "/images/Home/home10.png",
          summary:
            "The most common mistake is requesting a quote with no context, because that forces the process to rely on assumptions.",
          paragraphs: [
            "One of the most common mistakes is requesting a quote without a defined route, tentative date, or passenger count. When that happens, the answer naturally becomes broader because the team has to work with missing information. The same thing happens when the traveler does not clarify whether the mission is urgent, one-way, round-trip, or connected to a premium service expectation with special requirements.",
            "Another frequent mistake is assuming all private missions work the same way. A corporate departure with a protected agenda is different from a leisure flight to a premium destination or a route that needs unusual timing. Explaining these differences inside the page improves the quality of the requests and helps users receive a smarter, more useful commercial answer.",
          ],
        },
        {
          title: "Next step to request your proposal",
          kicker: "Conversion",
          image: "/images/Home/home11.png",
          summary:
            "The final goal is to move from research into a clear proposal with commercial and operational follow-up.",
          paragraphs: [
            "If you already have the route or a clear idea of the mission, you can send your details through WhatsApp or the contact flow for faster support. The key is that the next step should not stay at the level of abstract interest. It should become a useful request so the team can review real options and respond within a more realistic timeframe.",
            "The goal is to turn your travel need into a clear proposal instead of leaving you with broad or ambiguous information. That is why this page works best when it combines short education, practical guidance, and a direct call to action. It shows that quoting a private flight does not need to be complicated, but it does work better when the request starts with the right information.",
          ],
        },
      ],
    },
    ctaTitle: "Solicita una cotizacion bien orientada",
    ctaText:
      "Comparte los datos clave de tu viaje y recibe una propuesta pensada para tu ruta, pasajeros y tiempos.",
    ctaByLocale: {
      en: {
        title: "Request a better-structured quote",
        text:
          "Share the key details of your trip and receive a proposal built around your route, passengers, and preferred timing.",
      },
    },
    faqs: [
      {
        question: "Que necesito para cotizar un vuelo privado?",
        answer:
          "Normalmente basta con ruta, fecha, pasajeros y horario tentativo. Si hay restricciones de agenda o equipaje, compartirlas ayuda a afinar mejor la propuesta.",
      },
      {
        question: "Se puede cotizar sin conocer la aeronave exacta?",
        answer:
          "Si. El equipo puede sugerir la categoria mas adecuada con base en la mision, los pasajeros y la ruta prevista.",
      },
      {
        question: "La cotizacion tambien aplica para vuelos urgentes?",
        answer:
          "Si. Las solicitudes urgentes pueden revisarse segun disponibilidad, aeropuerto, tiempos de tripulacion y viabilidad operativa.",
      },
    ],
    faqsByLocale: {
      en: [
        {
          question: "What do I need to quote a private flight?",
          answer:
            "Usually route, date, passenger count, and a preferred departure window are enough to begin. If there are baggage or agenda restrictions, adding them helps refine the proposal.",
        },
        {
          question: "Can I request a quote without knowing the exact aircraft?",
          answer:
            "Yes. The team can recommend the most suitable aircraft category according to the mission, passenger profile, and route.",
        },
        {
          question: "Why is a personalized quote better than a fixed public price?",
          answer:
            "Because private aviation changes according to timing, airport access, availability, and service expectations. A tailored quote is usually much more useful than a generic number.",
        },
        {
          question: "Does the quoting process also apply to urgent flights?",
          answer:
            "Yes. Urgent requests can be reviewed based on availability, airport access, crew timing, and overall operational feasibility.",
        },
      ],
    },
  },
  createPage({
    slug: "jet-charter-mexico",
    title: "Jet Charter Mexico",
    category: "Paginas Principales",
    description:
      "Servicio de jet charter en Mexico para vuelos ejecutivos, viajes corporativos y operaciones privadas con respuesta agil.",
    keywords:
      "jet charter mexico, charter privado mexico, jet privado mexico, renta de jet charter",
    intro:
      "Pensada para capturar busquedas con intencion directa de renta de jet privado y charter ejecutivo en Mexico.",
    benefitTitle: "Servicio charter con perfil premium",
    benefitText:
      "Ayuda a posicionar la marca frente a usuarios que ya saben lo que quieren y buscan una solucion de movilidad privada con menos friccion.",
    operationTitle: "Atencion para rutas nacionales e internacionales",
    operationText:
      "Funciona bien para vuelos de negocios, traslados premium, agendas exigentes y operaciones donde el tiempo es un factor critico.",
    ctaTitle: "Cotiza un servicio de jet charter en Mexico",
    ctaText:
      "Solicita una propuesta de charter privado con datos de ruta, fecha y pasajeros para recibir opciones disponibles.",
    audience: ["Directores", "Viajes premium", "Equipos ejecutivos"],
  }),
  createPage({
    slug: "aviacion-ejecutiva-mexico",
    title: "Aviacion Ejecutiva Mexico",
    category: "Paginas Principales",
    description:
      "Soluciones de aviacion ejecutiva en Mexico para empresas, directivos y clientes que buscan eficiencia, privacidad y atencion especializada.",
    keywords:
      "aviacion ejecutiva mexico, vuelos ejecutivos mexico, movilidad ejecutiva aerea, jet ejecutivo mexico",
    intro:
      "Refuerza el posicionamiento institucional para un termino comercial fuerte y de autoridad dentro del sector.",
    benefitTitle: "Una pagina mas institucional y comercial",
    benefitText:
      "Sirve para atacar un termino amplio con valor de marca, confianza y fuerte relacion con usuarios corporativos de alto nivel.",
    operationTitle: "Contenido alineado a decisiones empresariales",
    operationText:
      "La narrativa puede enfocarse en ahorro de tiempo, flexibilidad operativa, privacidad y continuidad de agenda para equipos directivos.",
    ctaTitle: "Habla con un asesor de aviacion ejecutiva",
    ctaText:
      "Comparte tus necesidades y recibe una propuesta de movilidad privada adaptada a tu operacion.",
    audience: ["Corporativos", "Directivos", "Travel managers"],
  }),
  createPage({
    slug: "renta-avion-privado-mexico",
    title: "Renta de Avion Privado Mexico",
    category: "Paginas Principales",
    description:
      "Renta de avion privado en Mexico para viajes ejecutivos, familiares y rutas premium con cotizacion personalizada.",
    keywords:
      "renta de avion privado mexico, avion privado mexico, rentar avion privado, renta de jet privado mexico",
    intro:
      "Ataca una busqueda de compra muy clara y conecta con usuarios que buscan una solucion inmediata y facil de entender.",
    benefitTitle: "Alta intencion de compra",
    benefitText:
      "El usuario que busca renta de avion privado normalmente esta mas cerca de pedir cotizacion, por lo que esta pagina tiene peso comercial directo.",
    operationTitle: "Mensajes claros para reducir friccion",
    operationText:
      "Conviene destacar proceso simple, tiempos de respuesta y personalizacion de la propuesta para acelerar el paso a contacto.",
    ctaTitle: "Solicita tu cotizacion de avion privado",
    ctaText:
      "Envianos ruta, fecha y pasajeros para preparar una propuesta a la medida.",
    audience: ["Usuarios listos para cotizar", "Viajes familiares", "Viajes de negocios"],
  }),
  createPage({
    slug: "renta-avion-privado",
    title: "Renta de Avion Privado",
    category: "Paginas Principales",
    description:
      "Renta de avion privado con atencion personalizada, rutas flexibles y soporte comercial para viajes ejecutivos, familiares y premium.",
    keywords:
      "renta avion privado, rentar avion privado, avion privado renta, renta de jet privado",
    intro:
      "Pagina pensada para captar una busqueda corta, directa y altamente comercial de usuarios que ya buscan una solucion concreta.",
    benefitTitle: "Busqueda corta con alta intencion",
    benefitText:
      "El termino funciona bien para captar usuarios que ya entienden el servicio y solo necesitan una propuesta clara para avanzar.",
    operationTitle: "Proceso simple para pedir disponibilidad",
    operationText:
      "La pagina puede enfocarse en ruta, pasajeros, horarios y rapidez de respuesta para reducir friccion y mover al usuario a contacto.",
    ctaTitle: "Solicita tu renta de avion privado",
    ctaText:
      "Comparte tu fecha, ruta y numero de pasajeros para recibir una propuesta a la medida.",
    audience: ["Usuarios listos para cotizar", "Leads calientes", "Viajes premium"],
  }),
  createPage({
    slug: "charter-privado-mexico",
    title: "Charter Privado Mexico",
    category: "Paginas Principales",
    description:
      "Charter privado en Mexico para vuelos ejecutivos, traslados premium y operaciones personalizadas con atencion inmediata.",
    keywords:
      "charter privado mexico, charter mexico, vuelo charter privado, charter ejecutivo mexico",
    intro:
      "Ataca una keyword comercial fuerte para usuarios que ya buscan opciones de charter privado dentro del pais.",
    benefitTitle: "Termino fuerte para conversion",
    benefitText:
      "Ayuda a captar trafico con lenguaje muy alineado a usuarios listos para comparar opciones y solicitar cotizacion.",
    operationTitle: "Charter adaptado a ruta y perfil de viaje",
    operationText:
      "Permite explicar flexibilidad operativa, soporte por horarios y una propuesta personalizada segun la mision y tipo de pasajero.",
    ctaTitle: "Cotiza tu charter privado en Mexico",
    ctaText:
      "Solicita disponibilidad, horarios y propuesta comercial para tu siguiente operacion privada.",
    audience: ["Directores", "Empresas", "Usuarios listos para comprar"],
  }),
  createPage({
    slug: "private-jet-charter",
    title: "Private Jet Charter",
    seoTitle: "Private Jet Charter | Sky Group Aviation",
    seoDescription:
      "Premium private jet charter in Mexico with executive support, flexible scheduling, and personalized flight coordination.",
    category: "Paginas Principales",
    description:
      "Premium private jet charter in Mexico with executive support, flexible scheduling, and personalized flight coordination.",
    keywords:
      "private jet charter mexico, private jet charter, charter flights mexico, executive jet charter",
    intro:
      "This page is dedicated to private jet charter only, so charter demand has a focused destination instead of sharing space with aircraft sales or broader aviation topics.",
    benefitTitle: "A focused page for charter intent",
    benefitText:
      "It gives charter traffic a cleaner path with content centered on flights, scheduling, routing, and executive travel needs.",
    operationTitle: "Built around flight requests and schedule control",
    operationText:
      "The page is designed for travelers who need private flights, flexible departures, premium handling, and direct support to define the right aircraft for the mission.",
    ctaTitle: "Request your private jet charter",
    ctaText:
      "Share your route, date, and passenger count to receive a tailored charter proposal.",
    audience: ["Executive travelers", "Urgent departures", "Corporate travel"],
  }),
  createPage({
    slug: "sell-your-aircraft",
    title: "Sell Your Aircraft",
    seoTitle: "Sell Your Aircraft | Sky Group Aviation",
    seoDescription:
      "Aircraft sales with global reach and qualified buyers. Get support to position, market, and sell your aircraft with a clearer transaction process.",
    category: "Paginas Principales",
    description:
      "Aircraft sales with global reach and qualified buyers. Get support to position, market, and sell your aircraft with a clearer transaction process.",
    keywords:
      "sell your aircraft, aircraft sales mexico, qualified aircraft buyers, aircraft brokerage mexico",
    intro:
      "This page is dedicated to aircraft sales, so owner intent is separated from charter traffic and focused on reaching qualified buyers with stronger market positioning.",
    benefitTitle: "A page built for seller intent",
    benefitText:
      "It helps owners move into a more focused sales conversation with clearer expectations around positioning, outreach, and buyer qualification.",
    operationTitle: "Structured support from listing to buyer review",
    operationText:
      "The page can speak directly to owners who want global reach, qualified buyers, and a better process to evaluate pricing, documentation, and transaction readiness.",
    ctaTitle: "Start the aircraft sales process",
    ctaText:
      "Share your aircraft details and sales objective to begin a more structured transaction path.",
    audience: ["Aircraft owners", "Qualified buyers", "Cross-border transactions"],
  }),
  createPage({
    slug: "precio-vuelo-privado-por-hora",
    title: "Precio de Vuelo Privado por Hora en Mexico",
    category: "Paginas Informativas",
    description:
      "En promedio, en vuelos dentro de Mexico, puedes esperar precios desde USD $2,500 hasta $8,900 por hora de vuelo, dependiendo del modelo seleccionado.",
    keywords:
      "precio vuelo privado por hora mexico, costo jet privado por hora, cuanto cuesta un vuelo privado por hora",
    intro:
      "En promedio, en vuelos dentro de Mexico, puedes esperar precios desde USD $2,500 hasta $8,900 por hora de vuelo, dependiendo del modelo seleccionado. Esta pagina ayuda a poner ese rango en contexto segun ruta, categoria de aeronave y nivel de servicio.",
    benefitTitle: "Una referencia de precio que si aporta contexto",
    benefitText:
      "Sirve para atraer usuarios que ya estan comparando costos, pero necesitan entender por que el rango cambia segun el tipo de jet y la operacion.",
    operationTitle: "El precio por hora cambia con la mision",
    operationText:
      "La cifra por hora no funciona igual para un Light Jet que para un Mid Size Jet, ni para una ruta corta que para una operacion con tiempos, posicionamiento y requerimientos especiales.",
    ctaTitle: "Renta un avion privado con una propuesta clara",
    ctaText:
      "Comparte tu ruta y pasajeros para recibir una cotizacion real segun el modelo seleccionado y el tiempo estimado de vuelo.",
    audience: ["Usuarios comparando precios", "Leads calientes", "Viajes ejecutivos"],
  }),
  createPage({
    slug: "renta-de-aviones-privados",
    title: "Renta de Aviones Privados",
    category: "Paginas Principales",
    description:
      "Renta de aviones privados. Ofrecemos los servicios mas completos para que en tu viaje de placer o negocio, obtengas el mejor servicio que existe. Cotiza tu jet.",
    keywords:
      "renta de aviones privados, renta de jet privado, aviones privados mexico, cotiza tu jet",
    intro:
      "Renta de aviones privados. Ofrecemos los servicios mas completos para que en tu viaje de placer o negocio, obtengas el mejor servicio que existe. Cotiza tu jet.",
    benefitTitle: "Mensaje comercial directo para usuarios listos para avanzar",
    benefitText:
      "Esta pagina conecta muy bien con personas que ya saben que quieren rentar un servicio privado y solo necesitan claridad, atencion y una ruta facil hacia cotizacion.",
    operationTitle: "Servicio adaptado a viajes de placer o negocio",
    operationText:
      "La propuesta puede orientarse a viajes ejecutivos, salidas familiares, escapadas premium y operaciones donde importa combinar privacidad, flexibilidad y respuesta agil.",
    ctaTitle: "Cotiza tu jet privado",
    ctaText:
      "Envianos tu ruta, fecha y numero de pasajeros para recibir una propuesta personalizada.",
    audience: ["Viajes de placer", "Viajes de negocio", "Usuarios listos para cotizar"],
  }),
  createPage({
    slug: "vuelos-privados-para-reuniones",
    title: "Vuelos Privados para Reuniones",
    category: "Paginas Informativas",
    description:
      "Disenamos vuelos privados que se ajustan a tus reuniones. Quiero saber mas. Nuestra flota. Jets que impulsan tu agenda y tu libertad. Light Jet Mid Size Jet.",
    keywords:
      "vuelos privados para reuniones, jet privado para negocios, light jet, mid size jet mexico",
    intro:
      "Disenamos vuelos privados que se ajustan a tus reuniones. Nuestra flota integra opciones como Light Jet y Mid Size Jet para agendas ejecutivas que necesitan flexibilidad real.",
    benefitTitle: "Pensada para agendas con valor ejecutivo",
    benefitText:
      "Ayuda a conectar con usuarios que valoran continuidad de agenda, tiempos optimizados y una experiencia privada alineada a reuniones, visitas y cierres de negocio.",
    operationTitle: "Modelos de aeronave segun la agenda",
    operationText:
      "Un Light Jet puede funcionar muy bien en tramos agiles con pocos pasajeros, mientras que un Mid Size Jet aporta mas cabina, confort y margen operativo para reuniones de mayor alcance.",
    ctaTitle: "Quiero saber mas sobre nuestra flota",
    ctaText:
      "Comparte tu itinerario y te ayudamos a elegir la categoria adecuada para tu agenda.",
    audience: ["Directivos", "Empresas", "Viajes de negocios"],
  }),
  createPage({
    slug: "jet-privado-cdmx-cancun",
    title: "Jet Privado CDMX a Cancun",
    category: "Paginas por Rutas",
    description:
      "Cotiza un jet privado de CDMX a Cancun con atencion ejecutiva, horarios flexibles y una propuesta personalizada para tu viaje.",
    keywords:
      "jet privado cdmx a cancun, vuelo privado cdmx cancun, renta de jet cdmx cancun",
    intro:
      "Ruta de alta demanda para turismo premium, viajes corporativos, grupos familiares y agendas con necesidades de tiempo mas estrictas.",
    benefitTitle: "Ruta con altisima intencion comercial",
    benefitText:
      "Es una de las combinaciones mas fuertes para captar usuarios listos para cotizar una salida inmediata o planificada.",
    operationTitle: "Salida eficiente desde la zona centro",
    operationText:
      "Permite comunicar flexibilidad de horarios, privacidad, tiempos optimizados y mejor experiencia para viajeros premium hacia Caribe mexicano.",
    ctaTitle: "Cotiza tu jet privado de CDMX a Cancun",
    ctaText:
      "Solicita disponibilidad, horarios y opciones de aeronave para esta ruta prioritaria.",
    audience: ["Vacaciones premium", "Empresas", "Viajes VIP"],
  }),
  createPage({
    slug: "jet-privado-cdmx-monterrey",
    title: "Jet Privado CDMX a Monterrey",
    category: "Paginas por Rutas",
    description:
      "Renta un jet privado de CDMX a Monterrey para traslados ejecutivos, viajes corporativos y operaciones con tiempos cerrados.",
    keywords:
      "jet privado cdmx a monterrey, vuelo privado cdmx monterrey, charter cdmx monterrey",
    intro:
      "Pagina clave para conectar con usuarios de negocios que viajan entre dos polos corporativos de alto movimiento.",
    benefitTitle: "Ruta fuerte para mercado corporativo",
    benefitText:
      "Refuerza visibilidad ante empresas y directivos que priorizan agenda, rapidez y privacidad entre Ciudad de Mexico y Monterrey.",
    operationTitle: "Ideal para agendas cerradas",
    operationText:
      "Conviene destacar facilidad de coordinacion, tiempos optimizados y servicio premium para viajes de ida y vuelta el mismo dia.",
    ctaTitle: "Solicita cotizacion CDMX a Monterrey",
    ctaText:
      "Recibe una propuesta personalizada para tu vuelo privado en esta ruta ejecutiva.",
    audience: ["Empresas", "Consejos directivos", "Viajes de negocios"],
  }),
  createPage({
    slug: "jet-privado-cdmx-guadalajara",
    title: "Jet Privado CDMX a Guadalajara",
    seoTitle:
      "Aviacion Privada de Alta Gama | Jets Ejecutivos, Charter Exclusivo y Vuelos de Lujo",
    seoDescription:
      "Vuela de CDMX a Guadalajara con aviacion privada de alta gama, jets ejecutivos, charter exclusivo y una experiencia de lujo pensada para clientes premium y viajes de negocios.",
    category: "Paginas por Rutas",
    description:
      "Cotiza un jet privado de CDMX a Guadalajara para viajes ejecutivos, reuniones clave y traslados privados con flexibilidad total.",
    keywords:
      "jet privado cdmx a guadalajara, vuelo privado cdmx guadalajara, charter privado mexico guadalajara",
    intro:
      "Ruta muy util para captar busquedas entre dos centros economicos con fuerte dinamica empresarial.",
    benefitTitle: "Excelente combinacion entre volumen y conversion",
    benefitText:
      "Puede captar tanto usuarios corporativos como clientes privados que buscan rapidez y experiencia premium.",
    operationTitle: "Una propuesta pensada para productividad",
    operationText:
      "Ayuda a comunicar ahorros de tiempo, facilidad logistica y una experiencia mas controlada frente al vuelo comercial.",
    ctaTitle: "Cotiza tu vuelo privado CDMX a Guadalajara",
    ctaText:
      "Comparte tu itinerario y recibe una propuesta ajustada a tu necesidad.",
    audience: ["Empresas", "Industria", "Clientes premium"],
  }),
  createPage({
    slug: "jet-privado-toluca-cancun",
    title: "Jet Privado Toluca a Cancun",
    category: "Paginas por Rutas",
    description:
      "Renta un jet privado de Toluca a Cancun con salida ejecutiva, atencion personalizada y opciones para viajes premium.",
    keywords:
      "jet privado toluca a cancun, vuelo privado toluca cancun, charter toluca cancun",
    intro:
      "Ruta muy relevante para capturar demanda desde Toluca y su zona de influencia hacia uno de los destinos mas buscados.",
    benefitTitle: "Toluca como punto fuerte de salida",
    benefitText:
      "Permite explotar la cercania operativa de la marca con Toluca y ganar relevancia local en una ruta muy atractiva.",
    operationTitle: "Mas control en salidas desde Toluca",
    operationText:
      "La pagina puede reforzar beneficios de operar desde Toluca con mayor comodidad, menor friccion y respuesta agil para clientes premium.",
    ctaTitle: "Solicita tu jet privado Toluca a Cancun",
    ctaText:
      "Envia fecha, pasajeros y horarios para recibir una cotizacion personalizada.",
    audience: ["Toluca", "Valle de Mexico", "Viajes vacacionales VIP"],
  }),
  createPage({
    slug: "jet-privado-monterrey-cancun",
    title: "Jet Privado Monterrey a Cancun",
    category: "Paginas por Rutas",
    description:
      "Cotiza un jet privado de Monterrey a Cancun para viajes premium, traslados corporativos y vuelos privados con atencion inmediata.",
    keywords:
      "jet privado monterrey a cancun, vuelo privado monterrey cancun, charter monterrey cancun",
    intro:
      "Ruta atractiva para mercado corporativo y turismo premium desde el norte del pais hacia Caribe mexicano.",
    benefitTitle: "Comercialmente muy potente",
    benefitText:
      "Combina una ciudad con fuerte poder adquisitivo y un destino aspiracional con clara intencion de renta privada.",
    operationTitle: "Flexibilidad para viajes de placer o negocios",
    operationText:
      "La propuesta puede ajustarse a escapadas, viajes familiares, agendas ejecutivas o traslados con horarios fuera de lo comun.",
    ctaTitle: "Cotiza tu vuelo privado Monterrey a Cancun",
    ctaText:
      "Solicita una propuesta con opciones de aeronave y disponibilidad para esta ruta.",
    audience: ["Norte del pais", "Viajes premium", "Usuarios listos para comprar"],
  }),
  createPage({
    slug: "jet-privado-guadalajara-los-cabos",
    title: "Jet Privado Guadalajara a Los Cabos",
    category: "Paginas por Rutas",
    description:
      "Renta un jet privado de Guadalajara a Los Cabos con servicio ejecutivo, privacidad y una experiencia premium de principio a fin.",
    keywords:
      "jet privado guadalajara a los cabos, vuelo privado guadalajara los cabos, charter guadalajara los cabos",
    intro:
      "Ruta aspiracional enfocada en turismo premium, descanso ejecutivo y traslados privados a uno de los destinos top del pais.",
    benefitTitle: "Una ruta premium con gran potencial de conversion",
    benefitText:
      "Ayuda a atraer usuarios con alto poder adquisitivo que ya visualizan el servicio como parte de la experiencia completa.",
    operationTitle: "Experiencia mas exclusiva y flexible",
    operationText:
      "Permite resaltar privacidad, tiempos optimizados y comodidad para familias, parejas, grupos o ejecutivos en descanso.",
    ctaTitle: "Solicita tu jet privado a Los Cabos",
    ctaText:
      "Comparte tu plan de viaje y recibe una cotizacion a la medida.",
    audience: ["Turismo premium", "Familias", "Clientes VIP"],
  }),
  createPage({
    slug: "vuelo-privado-cdmx-tijuana",
    title: "Vuelo Privado CDMX a Tijuana",
    category: "Paginas por Rutas",
    description:
      "Cotiza un vuelo privado de CDMX a Tijuana con enfoque ejecutivo, tiempos optimizados y atencion personalizada.",
    keywords:
      "vuelo privado cdmx a tijuana, jet privado cdmx tijuana, charter privado cdmx tijuana",
    intro:
      "Ruta relevante para negocios, industria, cruces internacionales y agendas con tiempos sensibles.",
    benefitTitle: "Busqueda util para decisiones empresariales",
    benefitText:
      "Capta usuarios que valoran rapidez, continuidad de agenda y privacidad para una ruta larga dentro del pais.",
    operationTitle: "Pensada para tiempos de traslado mas eficientes",
    operationText:
      "Se puede trabajar el valor de viajar con mayor control, menos interrupciones y un servicio premium adaptado a la operacion.",
    ctaTitle: "Cotiza tu vuelo privado a Tijuana",
    ctaText:
      "Solicita opciones para esta ruta y recibe una propuesta ejecutiva.",
    audience: ["Industria", "Directivos", "Usuarios fronterizos"],
  }),
  createPage({
    slug: "vuelo-privado-cancun-miami",
    title: "Vuelo Privado Cancun a Miami",
    category: "Paginas por Rutas",
    description:
      "Renta un vuelo privado de Cancun a Miami con servicio premium, atencion personalizada y soporte para una ruta internacional.",
    keywords:
      "vuelo privado cancun a miami, jet privado cancun miami, charter cancun miami",
    intro:
      "Ruta internacional muy atractiva para usuarios premium, viajeros frecuentes y clientes que buscan continuidad de experiencia.",
    benefitTitle: "Ruta internacional con fuerte atractivo comercial",
    benefitText:
      "Es ideal para captar usuarios que combinan ocio, negocios e itinerarios de alto valor entre Mexico y Estados Unidos.",
    operationTitle: "Mensaje premium para un corredor internacional",
    operationText:
      "Ayuda a posicionar la marca con un perfil mas global, resaltando comodidad, flexibilidad y experiencia de viaje de alto nivel.",
    ctaTitle: "Solicita tu vuelo privado Cancun a Miami",
    ctaText:
      "Comparte fecha, pasajeros y preferencias para recibir una propuesta personalizada.",
    audience: ["Viajeros internacionales", "Turismo de lujo", "Negocios"],
  }),
  createPage({
    slug: "renta-jet-privado-cdmx",
    title: "Renta de Jet Privado CDMX",
    category: "Paginas por Ciudad",
    description:
      "Renta de jet privado en CDMX para viajes ejecutivos, traslados premium y vuelos privados con cotizacion personalizada.",
    keywords:
      "renta de jet privado cdmx, jet privado cdmx, vuelo privado cdmx, charter cdmx",
    intro:
      "Pagina local para reforzar presencia en la capital y captar demanda con alta intencion de compra.",
    benefitTitle: "Posicionamiento local en la ciudad mas competitiva",
    benefitText:
      "Refuerza relevancia ante busquedas directas desde Ciudad de Mexico y alrededores con foco comercial muy claro.",
    operationTitle: "Ideal para usuarios de agenda exigente",
    operationText:
      "La pagina puede destacar rapidez, flexibilidad y soluciones para negocios, reuniones, placer o conexiones premium.",
    ctaTitle: "Cotiza tu jet privado en CDMX",
    ctaText:
      "Solicita atencion personalizada para vuelos privados desde Ciudad de Mexico.",
    audience: ["CDMX", "Zona metropolitana", "Usuarios premium"],
  }),
  createPage({
    slug: "renta-jet-privado-toluca",
    title: "Renta de Jet Privado Toluca",
    category: "Paginas por Ciudad",
    description:
      "Cotiza la renta de jet privado en Toluca con atencion ejecutiva, salidas personalizadas y soporte comercial inmediato.",
    keywords:
      "renta de jet privado toluca, jet privado toluca, vuelo privado toluca, charter toluca",
    intro:
      "Pagina estrategica por la relacion local de la marca con Toluca y su fortaleza operativa en la zona.",
    benefitTitle: "Gran potencial por cercania local",
    benefitText:
      "Ayuda a construir autoridad geografica y a convertir mejor busquedas regionales con tono comercial directo.",
    operationTitle: "Ventaja para salidas desde Toluca",
    operationText:
      "Permite explicar beneficios de coordinar vuelos privados desde Toluca con atencion cercana y propuestas personalizadas.",
    ctaTitle: "Solicita tu cotizacion en Toluca",
    ctaText:
      "Comparte tu ruta y recibe una propuesta para renta de jet privado desde Toluca.",
    audience: ["Toluca", "Estado de Mexico", "Valle de Mexico"],
  }),
  createPage({
    slug: "renta-jet-privado-monterrey",
    title: "Renta de Jet Privado Monterrey",
    category: "Paginas por Ciudad",
    description:
      "Renta de jet privado en Monterrey para viajes de negocios, vuelos premium y traslados ejecutivos con respuesta agil.",
    keywords:
      "renta de jet privado monterrey, jet privado monterrey, vuelo privado monterrey, charter monterrey",
    intro:
      "Refuerza presencia comercial en un mercado con alto poder adquisitivo y fuerte dinamica corporativa.",
    benefitTitle: "Mercado empresarial con mucho valor",
    benefitText:
      "La ciudad tiene un perfil ideal para convertir usuarios que ya conocen la aviacion privada y buscan opciones confiables.",
    operationTitle: "Enfoque comercial para usuarios listos para cotizar",
    operationText:
      "Puede resaltar beneficios de flexibilidad, privacidad y continuidad de agenda para viajeros frecuentes y directivos.",
    ctaTitle: "Cotiza un jet privado en Monterrey",
    ctaText:
      "Solicita una propuesta para tus vuelos privados desde Monterrey.",
    audience: ["Empresarios", "Industria", "Usuarios recurrentes"],
  }),
  createPage({
    slug: "renta-jet-privado-guadalajara",
    title: "Renta de Jet Privado Guadalajara",
    category: "Paginas por Ciudad",
    description:
      "Cotiza la renta de jet privado en Guadalajara para viajes ejecutivos, corporativos y vuelos premium con atencion especializada.",
    keywords:
      "renta de jet privado guadalajara, jet privado guadalajara, vuelo privado guadalajara, charter guadalajara",
    intro:
      "Pagina local para una ciudad con gran actividad empresarial, industrial y de negocios.",
    benefitTitle: "Visibilidad local con alta intencion",
    benefitText:
      "Ayuda a captar busquedas muy directas en una plaza relevante donde la rapidez y la comodidad son argumentos de peso.",
    operationTitle: "Servicio premium alineado a viajes de negocios",
    operationText:
      "Permite reforzar beneficios frente al viaje comercial y destacar una experiencia mas controlada y eficiente.",
    ctaTitle: "Solicita tu vuelo privado en Guadalajara",
    ctaText:
      "Comparte tu fecha y ruta para recibir una propuesta personalizada.",
    audience: ["Guadalajara", "Empresas", "Viajeros ejecutivos"],
  }),
  createPage({
    slug: "renta-jet-privado-cancun",
    title: "Renta de Jet Privado Cancun",
    category: "Paginas por Ciudad",
    description:
      "Renta de jet privado en Cancun para viajes de lujo, traslados VIP y vuelos privados con cotizacion a la medida.",
    keywords:
      "renta de jet privado cancun, jet privado cancun, vuelo privado cancun, charter cancun",
    intro:
      "Pagina enfocada en turismo premium, traslados de lujo y rutas con alta demanda de usuarios internacionales y nacionales.",
    benefitTitle: "Ciudad clave para usuarios premium",
    benefitText:
      "Cancun es una plaza de alto potencial para busquedas aspiracionales y transaccionales relacionadas con vuelos privados.",
    operationTitle: "Ideal para servicio premium y turismo de alto nivel",
    operationText:
      "La pagina puede trabajar experiencia, privacidad, facilidad logistica y continuidad del viaje desde o hacia destinos exclusivos.",
    ctaTitle: "Cotiza tu jet privado en Cancun",
    ctaText:
      "Solicita disponibilidad y opciones para vuelos privados desde Cancun.",
    audience: ["Turismo premium", "Hoteleria", "Viajeros internacionales"],
  }),
  createPage({
    slug: "jet-privado-cancun",
    title: "Jet Privado Cancun",
    category: "Paginas por Ciudad",
    description:
      "Jet privado en Cancun para vuelos de lujo, traslados VIP y salidas ejecutivas con cotizacion personalizada.",
    keywords:
      "jet privado cancun, vuelo privado cancun, charter privado cancun, renta jet cancun",
    intro:
      "Pagina local enfocada en una plaza premium donde la demanda mezcla turismo de alto nivel, hoteleria y viajeros internacionales.",
    benefitTitle: "Cancun como plaza premium de alta demanda",
    benefitText:
      "La keyword ayuda a captar usuarios que buscan una solucion aspiracional y transaccional desde o hacia uno de los destinos mas fuertes del pais.",
    operationTitle: "Experiencia premium con respuesta agil",
    operationText:
      "Conviene destacar privacidad, flexibilidad, continuidad del viaje y atencion ejecutiva para rutas vacacionales o corporativas.",
    ctaTitle: "Solicita tu jet privado en Cancun",
    ctaText:
      "Comparte tu ruta y recibe una propuesta para operar desde Cancun con atencion personalizada.",
    audience: ["Turismo premium", "Hoteleria", "Viajeros internacionales"],
  }),
  createPage({
    slug: "renta-jet-privado-los-cabos",
    title: "Renta de Jet Privado Los Cabos",
    category: "Paginas por Ciudad",
    description:
      "Cotiza la renta de jet privado en Los Cabos para viajes de lujo, traslados ejecutivos y experiencias premium personalizadas.",
    keywords:
      "renta de jet privado los cabos, jet privado los cabos, vuelo privado los cabos, charter los cabos",
    intro:
      "Pagina orientada a uno de los destinos mas aspiracionales para clientes premium y turismo de alto nivel.",
    benefitTitle: "Una ciudad muy atractiva para SEO comercial",
    benefitText:
      "Conecta con usuarios que valoran la exclusividad y que suelen estar mas dispuestos a solicitar una cotizacion inmediata.",
    operationTitle: "Experiencia alineada a lujo y flexibilidad",
    operationText:
      "Permite reforzar privacidad, comodidad y personalizacion para viajes familiares, vacacionales o corporativos premium.",
    ctaTitle: "Solicita tu cotizacion en Los Cabos",
    ctaText:
      "Envia tus datos de viaje y recibe una propuesta a la medida.",
    audience: ["Turismo de lujo", "Clientes VIP", "Hotspots premium"],
  }),
  createPage({
    slug: "jet-privado-toluca",
    title: "Jet Privado Toluca",
    category: "Paginas por Ciudad",
    description:
      "Jet privado en Toluca con salidas ejecutivas, atencion cercana y propuestas personalizadas para vuelos privados desde la zona centro.",
    keywords:
      "jet privado toluca, vuelo privado toluca, charter privado toluca, renta jet toluca",
    intro:
      "Pagina estrategica por la relevancia operativa de Toluca y su peso para usuarios que buscan rapidez y cercania en la salida.",
    benefitTitle: "Toluca como punto fuerte de operacion",
    benefitText:
      "Refuerza relevancia local y ayuda a capturar usuarios que ya asocian Toluca con una alternativa eficiente para aviacion privada.",
    operationTitle: "Ideal para salidas desde la zona centro",
    operationText:
      "La propuesta puede destacar menor friccion, mejor coordinacion y atencion personalizada para viajes de negocios o premium.",
    ctaTitle: "Cotiza tu jet privado en Toluca",
    ctaText:
      "Solicita disponibilidad y una propuesta comercial para operar desde Toluca.",
    audience: ["Toluca", "Estado de Mexico", "Valle de Mexico"],
  }),
  createPage({
    slug: "jet-privado-monterrey",
    title: "Jet Privado Monterrey",
    category: "Paginas por Ciudad",
    description:
      "Jet privado en Monterrey para viajes corporativos, salidas premium y traslados ejecutivos con respuesta comercial agil.",
    keywords:
      "jet privado monterrey, vuelo privado monterrey, charter privado monterrey, renta jet monterrey",
    intro:
      "Pagina local pensada para una ciudad con fuerte actividad empresarial y usuarios acostumbrados a valorar rapidez, privacidad y continuidad de agenda.",
    benefitTitle: "Mercado corporativo con alto valor comercial",
    benefitText:
      "Monterrey permite captar trafico con alta intencion de compra gracias a su perfil empresarial y demanda de movilidad ejecutiva.",
    operationTitle: "Flexibilidad para agendas de negocio",
    operationText:
      "La pagina puede resaltar rapidez, privacidad y soporte para ejecutivos, empresarios y grupos que requieren tiempos mas controlados.",
    ctaTitle: "Solicita tu jet privado en Monterrey",
    ctaText:
      "Comparte tu operacion y recibe una propuesta para vuelos privados desde Monterrey.",
    audience: ["Empresarios", "Industria", "Usuarios recurrentes"],
  }),
  createPage({
    slug: "como-contratar-vuelo-privado",
    title: "Como Contratar un Vuelo Privado",
    category: "Paginas Informativas",
    description:
      "Conoce como contratar un vuelo privado en Mexico, que datos necesitas y como solicitar una cotizacion personalizada.",
    keywords:
      "como contratar un vuelo privado, contratar vuelo privado mexico, pasos para rentar un jet privado",
    intro:
      "Contenido informativo de alto valor SEO para atraer usuarios en fase de investigacion y acercarlos a una cotizacion.",
    benefitTitle: "Educacion que empuja a la compra",
    benefitText:
      "Explicar el proceso reduce friccion, resuelve dudas comunes y prepara al usuario para contactar con mas confianza.",
    operationTitle: "Proceso simple y claro",
    operationText:
      "Conviene detallar que informacion se solicita, como se construye una propuesta y como se confirma la operacion.",
    ctaTitle: "Pide ayuda para contratar tu vuelo privado",
    ctaText:
      "Habla con un asesor y recibe apoyo para cotizar tu primera o siguiente operacion.",
    audience: ["Nuevos usuarios", "Usuarios comparando opciones", "SEO informativo"],
  }),
  createPage({
    slug: "que-incluye-jet-privado",
    title: "Que Incluye un Jet Privado",
    category: "Paginas Informativas",
    description:
      "Descubre que incluye un jet privado, como se estructura el servicio y que puedes esperar al contratar un vuelo privado.",
    keywords:
      "que incluye un jet privado, servicios de un jet privado, que incluye vuelo privado",
    intro:
      "Pagina pensada para resolver una duda frecuente con potencial de mover al usuario hacia una decision comercial.",
    benefitTitle: "Contenido util para usuarios indecisos",
    benefitText:
      "Aclarar que incluye el servicio ayuda a justificar el valor del vuelo privado y a reducir objeciones en la etapa de comparacion.",
    operationTitle: "Expectativas claras antes de cotizar",
    operationText:
      "Es buena oportunidad para explicar personalizacion, coordinacion, privacidad y enfoque premium del servicio.",
    ctaTitle: "Solicita una propuesta con detalles claros",
    ctaText:
      "Comparte tu viaje y recibe una cotizacion personalizada con atencion uno a uno.",
    audience: ["Usuarios comparando", "Investigacion de compra", "SEO fuerte"],
  }),
  createPage({
    slug: "beneficios-aviacion-ejecutiva",
    title: "Beneficios de la Aviacion Ejecutiva",
    category: "Paginas Informativas",
    description:
      "Conoce los principales beneficios de la aviacion ejecutiva para empresas, directivos y viajeros que valoran tiempo y privacidad.",
    keywords:
      "beneficios de la aviacion ejecutiva, ventajas de un vuelo privado, por que usar aviacion ejecutiva",
    intro:
      "Articulo pensado para captar busquedas informativas con potencial comercial fuerte en segmento corporativo.",
    benefitTitle: "Conecta beneficio racional con decision premium",
    benefitText:
      "Esta pagina ayuda a vender valor, no solo lujo: tiempo, productividad, privacidad y control operativo.",
    operationTitle: "Ideal para enfoque corporativo",
    operationText:
      "Se puede orientar a directivos, empresas y clientes que necesitan justificar la decision de una forma mas estrategica.",
    ctaTitle: "Conoce si la aviacion ejecutiva es para ti",
    ctaText:
      "Habla con el equipo y recibe una propuesta acorde a tu perfil de viaje.",
    audience: ["Corporativos", "Directivos", "Investigacion comercial"],
  }),
  createPage({
    slug: "tipos-jets-privados",
    title: "Tipos de Jets Privados",
    category: "Paginas Informativas",
    description:
      "Explora los tipos de jets privados y conoce que categoria puede adaptarse mejor a tu ruta, pasajeros y objetivos de viaje.",
    keywords:
      "tipos de jets privados, categorias de jets privados, que jet privado necesito",
    intro:
      "Contenido educativo que ayuda a orientar al usuario sin obligarlo a entender detalles tecnicos complejos.",
    benefitTitle: "Explicacion sencilla para una decision compleja",
    benefitText:
      "Ayuda a capturar trafico organico de investigacion y a encaminar al usuario hacia una cotizacion mejor informada.",
    operationTitle: "Guia para elegir mejor",
    operationText:
      "Permite relacionar categoria de aeronave con pasajeros, autonomia, comodidad y tipo de mision.",
    ctaTitle: "Solicita asesoria sobre el tipo de jet ideal",
    ctaText:
      "Comparte tu ruta y el equipo te orienta sobre la mejor categoria para tu viaje.",
    audience: ["Usuarios nuevos", "Comparadores", "SEO educativo"],
  }),
  createPage({
    slug: "como-funciona-vuelo-privado",
    title: "Como Funciona un Vuelo Privado",
    category: "Paginas Informativas",
    description:
      "Aprende como funciona un vuelo privado, desde la solicitud de cotizacion hasta la coordinacion operativa del viaje.",
    keywords:
      "como funciona un vuelo privado, proceso vuelo privado, contratar jet privado mexico",
    intro:
      "Pagina informativa que reduce incertidumbre y ayuda a mover al usuario desde la curiosidad hacia la conversion.",
    benefitTitle: "Resuelve dudas clave antes del contacto",
    benefitText:
      "Cuando el usuario entiende el proceso, es mas facil que comparta datos concretos y avance a una cotizacion real.",
    operationTitle: "Contenido pensado para guiar",
    operationText:
      "Sirve para explicar tiempos, pasos, requerimientos y la atencion personalizada que acompana toda la experiencia.",
    ctaTitle: "Habla con un asesor y resuelve tu vuelo",
    ctaText:
      "Solicita apoyo directo para planear tu viaje privado en Mexico.",
    audience: ["SEO informativo", "Primeros compradores", "Usuarios curiosos"],
  }),
  createPage({
    slug: "cotizar-vuelo-privado-mexico",
    title: "Cotizar Vuelo Privado Mexico",
    category: "Paginas de Intencion de Compra",
    description:
      "Cotiza un vuelo privado en Mexico con atencion rapida, soporte personalizado y una propuesta basada en tu ruta y pasajeros.",
    keywords:
      "cotizar vuelo privado mexico, cotizacion jet privado mexico, precio vuelo privado mexico",
    intro:
      "Pagina totalmente transaccional pensada para capturar usuarios que ya buscan una propuesta o precio.",
    benefitTitle: "Intencion de compra directa",
    benefitText:
      "Este tipo de busqueda suele estar muy cerca de la conversion, por lo que la pagina debe ser clara, rapida y orientada a contacto.",
    operationTitle: "Proceso comercial simple",
    operationText:
      "Conviene pedir solo datos esenciales para acelerar la atencion y evitar friccion innecesaria en la solicitud.",
    ctaTitle: "Cotiza tu vuelo privado ahora",
    ctaText:
      "Envia tu ruta, fecha y pasajeros para recibir una propuesta personalizada.",
    audience: ["Usuarios listos para comprar", "Leads calientes", "Cotizacion inmediata"],
  }),
  createPage({
    slug: "solicitar-jet-privado",
    title: "Solicitar Jet Privado",
    category: "Paginas de Intencion de Compra",
    description:
      "Solicita un jet privado en Mexico con soporte personalizado, disponibilidad por ruta y una propuesta adaptada a tu operacion.",
    keywords:
      "solicitar jet privado, pedir jet privado mexico, contratar jet privado",
    intro:
      "Pagina orientada a usuarios decididos que necesitan avanzar rapido hacia una solucion real de vuelo privado.",
    benefitTitle: "Llamado directo a la accion",
    benefitText:
      "Ayuda a evitar rodeos y llevar al usuario a un contacto inmediato con tono comercial claro.",
    operationTitle: "Ideal para respuesta rapida",
    operationText:
      "La pagina puede destacar tiempos de atencion, flexibilidad y personalizacion para convertir mejor el trafico de alta intencion.",
    ctaTitle: "Solicita tu jet privado hoy",
    ctaText:
      "Comparte tus datos y recibe una propuesta alineada a tu viaje.",
    audience: ["Leads calientes", "Viajes urgentes", "Conversion directa"],
  }),
  createPage({
    slug: "charter-privado-mexico-cotizacion",
    title: "Charter Privado Mexico Cotizacion",
    category: "Paginas de Intencion de Compra",
    description:
      "Solicita cotizacion de charter privado en Mexico para vuelos ejecutivos, viajes premium y rutas personalizadas.",
    keywords:
      "charter privado mexico cotizacion, cotizar charter privado, precio charter privado mexico",
    intro:
      "Pensada para capturar usuarios que buscan precio, opciones y una propuesta concreta de charter privado.",
    benefitTitle: "Muy alineada a conversion",
    benefitText:
      "La combinacion de charter y cotizacion es especialmente fuerte para usuarios listos para comprar.",
    operationTitle: "Ruta clara hacia la propuesta",
    operationText:
      "Conviene explicar que cada operacion se personaliza segun ruta, pasajeros, horario y tipo de mision.",
    ctaTitle: "Pide tu cotizacion de charter privado",
    ctaText:
      "Solicita una propuesta con informacion clara y atencion personalizada.",
    audience: ["Usuarios de precio", "Cotizaciones", "Alta intencion"],
  }),
  createPage({
    slug: "renta-avion-ejecutivo-personalizado",
    title: "Renta de Avion Ejecutivo Personalizado",
    category: "Paginas de Intencion de Compra",
    description:
      "Renta de avion ejecutivo personalizado en Mexico con opciones adaptadas a tu ruta, pasajeros y necesidades operativas.",
    keywords:
      "renta de avion ejecutivo personalizado, avion ejecutivo mexico, renta avion ejecutivo",
    intro:
      "Pagina comercial que mezcla intencion de compra con una propuesta mas premium y flexible.",
    benefitTitle: "Muy buena para diferenciar el servicio",
    benefitText:
      "Permite vender personalizacion, atencion consultiva y enfoque premium sin perder claridad comercial.",
    operationTitle: "Servicio adaptado a cada viaje",
    operationText:
      "El mensaje puede centrarse en una propuesta hecha a medida segun agenda, destino, numero de pasajeros y experiencia deseada.",
    ctaTitle: "Solicita una propuesta personalizada",
    ctaText:
      "Comparte tu operacion y recibe una solucion de vuelo ejecutivo a la medida.",
    audience: ["Clientes premium", "Viajes especiales", "Conversion alta"],
  }),
  createPage({
    slug: "como-viajar-en-jet-privado-en-mexico",
    title: "Como Viajar en Jet Privado en Mexico",
    category: "Blog SEO",
    description:
      "Descubre como viajar en jet privado en Mexico, que necesitas para cotizar y como aprovechar mejor la experiencia.",
    keywords:
      "como viajar en jet privado en mexico, viajar en jet privado mexico, guia jet privado mexico",
    intro:
      "Articulo de blog enfocado en trafico organico con potencial para educar y convertir usuarios interesados en el servicio.",
    benefitTitle: "Contenido ideal para atraer usuarios nuevos",
    benefitText:
      "Funciona muy bien para captar trafico top of funnel y acercarlo a una solicitud de cotizacion mediante informacion clara.",
    operationTitle: "Una guia util y orientada a accion",
    operationText:
      "Se puede estructurar con pasos simples, recomendaciones y una invitacion clara a solicitar apoyo comercial.",
    ctaTitle: "Empieza a planear tu viaje privado",
    ctaText:
      "Habla con el equipo y recibe asesoria para tu primera o siguiente experiencia en jet privado.",
    audience: ["Blog", "SEO organico", "Usuarios curiosos"],
  }),
  createPage({
    slug: "diferencias-vuelo-privado-y-comercial",
    title: "Diferencias entre Vuelo Privado y Comercial",
    category: "Blog SEO",
    description:
      "Conoce las diferencias entre un vuelo privado y un vuelo comercial para elegir la opcion adecuada segun tu viaje.",
    keywords:
      "diferencias entre vuelo privado y comercial, vuelo privado vs comercial, ventajas vuelo privado",
    intro:
      "Tema muy bueno para comparativas SEO y para mover usuarios desde la duda hacia la compra.",
    benefitTitle: "Comparativa con mucho valor comercial",
    benefitText:
      "Ayuda a explicar el diferencial del servicio sin sonar solo aspiracional, sino practico y util.",
    operationTitle: "Perfecta para justificar la decision",
    operationText:
      "Se puede hablar de tiempos, privacidad, flexibilidad, experiencia y productividad para reforzar el valor del servicio.",
    ctaTitle: "Compara y solicita tu propuesta",
    ctaText:
      "Si ya sabes que el vuelo privado encaja contigo, pide una cotizacion personalizada.",
    audience: ["Comparadores", "Investigacion", "Trafico organico"],
  }),
  createPage({
    slug: "mejores-rutas-jet-privado-mexico",
    title: "Mejores Rutas en Jet Privado Mexico",
    category: "Blog SEO",
    description:
      "Explora las mejores rutas en jet privado en Mexico para viajes ejecutivos, escapadas premium y traslados de alto valor.",
    keywords:
      "mejores rutas en jet privado mexico, rutas jet privado mexico, destinos jet privado mexico",
    intro:
      "Articulo de blog ideal para mezclar inspiracion con rutas de alta intencion y fortalecer enlazado interno.",
    benefitTitle: "Muy buena para enlazar paginas de rutas",
    benefitText:
      "Este contenido puede impulsar trafico organico hacia las paginas transaccionales de CDMX, Cancun, Monterrey y Los Cabos.",
    operationTitle: "Contenido inspiracional con salida comercial",
    operationText:
      "Permite presentar destinos y corredores fuertes mientras se dirige al usuario hacia una cotizacion concreta.",
    ctaTitle: "Descubre tu proxima ruta privada",
    ctaText:
      "Solicita atencion personalizada para planear tu siguiente vuelo privado.",
    audience: ["Blog", "Inspiracion", "Enlazado interno"],
  }),
  createPage({
    slug: "cuando-conviene-rentar-jet-privado",
    title: "Cuando Conviene Rentar un Jet Privado",
    category: "Blog SEO",
    description:
      "Descubre cuando conviene rentar un jet privado y en que casos ofrece mas valor frente a otras opciones de viaje.",
    keywords:
      "cuando conviene rentar un jet privado, vale la pena rentar un jet privado, beneficios rentar jet privado",
    intro:
      "Tema util para responder objeciones y activar usuarios que aun estan evaluando si el servicio encaja con su caso.",
    benefitTitle: "Excelente para resolver objeciones",
    benefitText:
      "Ayuda a transformar dudas en argumentos claros para comprar cuando el tiempo, privacidad y flexibilidad importan.",
    operationTitle: "Enfoque practico y comercial",
    operationText:
      "La pagina puede explicar en que escenarios el vuelo privado genera valor real para negocios, familias y viajes premium.",
    ctaTitle: "Evalua tu viaje con un asesor",
    ctaText:
      "Comparte tu necesidad y te ayudamos a definir si un jet privado es la mejor opcion.",
    audience: ["Usuarios tibios", "Comparadores", "SEO blog"],
  }),
  createPage({
    slug: "private-jet-travel-experience",
    title: "Private jet charter in Mexico",
    category: "Blog SEO",
    description:
      "Explore the private jet travel experience in Mexico, from personalized planning to premium comfort and flexible schedules.",
    keywords:
      "private jet travel experience, private jet experience mexico, luxury private flight experience",
    intro:
      "English-language article created to attract premium organic traffic and international users researching private aviation in Mexico.",
    benefitTitle: "Built for international search demand",
    benefitText:
      "This page expands reach to English-speaking travelers, luxury clients, and international audiences considering private flights in Mexico.",
    operationTitle: "A premium narrative with sales intent",
    operationText:
      "It can highlight privacy, flexibility, personalized service, and the smoother airport experience expected from private aviation.",
    ctaTitle: "Request your private flight experience",
    ctaText:
      "Share your itinerary and receive a tailored proposal for private jet travel in Mexico.",
    audience: ["International travelers", "Luxury clients", "English SEO"],
    english: true,
  }),
  createPage({
    slug: "costo-jet-privado-mexico",
    title: "Costo de un Jet Privado en Mexico",
    category: "Blog SEO",
    description:
      "Conoce cuanto cuesta un jet privado en Mexico y que variables cambian el precio segun ruta, tipo de aeronave, horarios y nivel de servicio.",
    keywords:
      "costo de un jet privado en mexico, cuanto cuesta un jet privado mexico, precio jet privado mexico",
    intro:
      "Esta pagina responde una de las preguntas con mayor intencion comercial: cuanto cuesta un jet privado en Mexico y por que el rango cambia segun la mision.",
    benefitTitle: "Una pregunta de precio con alto potencial de lead",
    benefitText:
      "El contenido ayuda a captar usuarios que ya entienden el servicio y necesitan una referencia clara antes de solicitar una propuesta privada.",
    operationTitle: "El precio depende de ruta, aeronave y disponibilidad",
    operationText:
      "El costo final cambia por distancia, categoria de aeronave, posicionamiento, horarios, aeropuerto y nivel de soporte operativo requerido.",
    ctaTitle: "Solicita una cotizacion privada con precio mas claro",
    ctaText:
      "Comparte tu ruta, fecha y pasajeros para recibir una propuesta premium alineada con disponibilidad real.",
    audience: ["SEO blog", "Usuarios comparando precios", "Alta intencion"],
  }),
  createPage({
    slug: "cuanto-cuesta-cdmx-cancun-jet-privado",
    title: "Cuanto Cuesta un Jet Privado de CDMX a Cancun",
    category: "Blog SEO",
    description:
      "Descubre el rango estimado para volar en jet privado de CDMX a Cancun y que factores mueven la cotizacion en esta ruta premium.",
    keywords:
      "cuanto cuesta cdmx cancun jet privado, precio jet privado cdmx cancun, costo vuelo privado cdmx cancun",
    intro:
      "El objetivo es capturar usuarios que ya comparan una ruta concreta y estan mas cerca de pedir cotizacion que de solo explorar.",
    benefitTitle: "Contenido orientado a una ruta con alta demanda",
    benefitText:
      "CDMX a Cancun es una de las rutas con mayor intencion de compra, ideal para conectar trafico SEO con una solicitud privada de disponibilidad.",
    operationTitle: "La ruta combina tiempo, categoria de jet y ventana operativa",
    operationText:
      "El precio depende del aeropuerto de salida, tipo de cabina, horarios, pasajeros, equipaje y urgencia de la operacion.",
    ctaTitle: "Cotiza tu ruta CDMX a Cancun con disponibilidad real",
    ctaText:
      "Solicita una propuesta privada para esta ruta premium y recibe una respuesta mas clara sobre aeronave, tiempo y rango estimado.",
    audience: ["SEO blog", "Viajes premium", "Leads calientes"],
  }),
  createPage({
    slug: "como-comprar-avion-ejecutivo",
    title: "Como Comprar un Avion Ejecutivo",
    category: "Blog SEO",
    description:
      "Aprende como comprar un avion ejecutivo con una evaluacion mas clara de presupuesto, uso, due diligence y soporte de adquisicion.",
    keywords:
      "como comprar un avion ejecutivo, comprar avion ejecutivo mexico, adquirir aeronave ejecutiva",
    intro:
      "Esta pagina fortalece la autoridad comercial de la marca frente a usuarios que buscan adquisicion de aeronaves y asesoria premium.",
    benefitTitle: "Contenido estrategico para leads de alto valor",
    benefitText:
      "Conecta busquedas de compra con una conversacion mas seria sobre adquisicion, evaluacion tecnica, negociacion y estructura de operacion.",
    operationTitle: "La compra correcta depende de perfil de uso y revision tecnica",
    operationText:
      "Antes de comprar conviene definir mision, presupuesto, categoria de aeronave, costos operativos y validacion documental.",
    ctaTitle: "Habla con un asesor para comprar aeronave ejecutiva",
    ctaText:
      "Comparte tu objetivo de adquisicion y te ayudamos a evaluar opciones con una ruta mas clara y confidencial.",
    audience: ["SEO blog", "Usuarios listos para comprar", "Clientes premium"],
  }),
];

export const seoPageGroups = [
  {
    title: "Paginas Principales",
    slugs: [
      "vuelos-privados-mexico",
      "jet-charter-mexico",
      "aviacion-ejecutiva-mexico",
      "renta-avion-privado-mexico",
      "renta-avion-privado",
      "charter-privado-mexico",
    ],
  },
  {
    title: "Paginas por Rutas",
    slugs: [
      "jet-privado-cdmx-cancun",
      "jet-privado-cdmx-monterrey",
      "jet-privado-cdmx-guadalajara",
      "jet-privado-toluca-cancun",
      "jet-privado-monterrey-cancun",
      "jet-privado-guadalajara-los-cabos",
      "vuelo-privado-cdmx-tijuana",
      "vuelo-privado-cancun-miami",
    ],
  },
  {
    title: "Paginas por Ciudad",
    slugs: [
      "renta-jet-privado-cdmx",
      "jet-privado-toluca",
      "renta-jet-privado-toluca",
      "jet-privado-monterrey",
      "renta-jet-privado-monterrey",
      "renta-jet-privado-guadalajara",
      "jet-privado-cancun",
      "renta-jet-privado-cancun",
      "renta-jet-privado-los-cabos",
    ],
  },
  {
    title: "Paginas Informativas",
    slugs: [
      "como-contratar-vuelo-privado",
      "que-incluye-jet-privado",
      "beneficios-aviacion-ejecutiva",
      "tipos-jets-privados",
      "como-funciona-vuelo-privado",
    ],
  },
  {
    title: "Paginas de Intencion de Compra",
    slugs: [
      "landing",
      "cotizar-vuelo-privado-mexico",
      "solicitar-jet-privado",
      "charter-privado-mexico-cotizacion",
      "renta-avion-ejecutivo-personalizado",
    ],
  },
  {
    title: "Blog SEO",
    slugs: [
      "como-viajar-en-jet-privado-en-mexico",
      "diferencias-vuelo-privado-y-comercial",
      "mejores-rutas-jet-privado-mexico",
      "cuando-conviene-rentar-jet-privado",
      "private-jet-travel-experience",
      "costo-jet-privado-mexico",
      "cuanto-cuesta-cdmx-cancun-jet-privado",
      "como-comprar-avion-ejecutivo",
    ],
  },
];

const categoryTranslations = {
  "Paginas Principales": { en: "Main Pages", es: "Paginas Principales" },
  "Paginas por Rutas": { en: "Route Pages", es: "Paginas por Rutas" },
  "Paginas por Ciudad": { en: "City Pages", es: "Paginas por Ciudad" },
  "Paginas Informativas": { en: "Informational Pages", es: "Paginas Informativas" },
  "Paginas de Intencion de Compra": { en: "Purchase Intent Pages", es: "Paginas de Intencion de Compra" },
  "Blog SEO": { en: "Content Blog", es: "Blog de contenido" },
};

const audienceTranslations = {
  "Clientes privados": { en: "Private clients" },
  Empresas: { en: "Companies" },
  "Viajes urgentes": { en: "Urgent travel" },
  Directores: { en: "Directors" },
  "Viajes premium": { en: "Premium travel" },
  "Equipos ejecutivos": { en: "Executive teams" },
  Corporativos: { en: "Corporate clients" },
  Directivos: { en: "Executives" },
  "Travel managers": { en: "Travel managers" },
  "Usuarios listos para cotizar": { en: "Quote-ready clients" },
  "Viajes familiares": { en: "Family travel" },
  "Viajes de negocios": { en: "Business travel" },
  "Vacaciones premium": { en: "Premium vacations" },
  "Viajes VIP": { en: "VIP travel" },
  Industria: { en: "Industry" },
  "Clientes premium": { en: "Premium clients" },
  Toluca: { en: "Toluca" },
  "Valle de Mexico": { en: "Valley of Mexico" },
  "Viajes vacacionales VIP": { en: "VIP leisure travel" },
  "Norte del pais": { en: "Northern Mexico" },
  "Usuarios listos para comprar": { en: "Ready-to-buy clients" },
  "Turismo premium": { en: "Premium tourism" },
  Familias: { en: "Families" },
  "Clientes VIP": { en: "VIP clients" },
  "Usuarios fronterizos": { en: "Border-region travelers" },
  "Viajeros internacionales": { en: "International travelers" },
  Negocios: { en: "Business travel" },
  CDMX: { en: "Mexico City" },
  "Zona metropolitana": { en: "Metro area" },
  "Estado de Mexico": { en: "State of Mexico" },
  Empresarios: { en: "Business owners" },
  Guadalajara: { en: "Guadalajara" },
  "Viajeros ejecutivos": { en: "Executive travelers" },
  Hoteleria: { en: "Hospitality" },
  "Turismo de lujo": { en: "Luxury tourism" },
  "Hotspots premium": { en: "Premium destinations" },
  "Nuevos usuarios": { en: "New users" },
  "Usuarios comparando opciones": { en: "Comparing users" },
  "Usuarios comparando": { en: "Comparing users" },
  "Investigacion de compra": { en: "Purchase research" },
  "Investigacion comercial": { en: "Commercial research" },
  Comparadores: { en: "Comparing travelers" },
  "Usuarios curiosos": { en: "Curious readers" },
  "Primeros compradores": { en: "First-time buyers" },
  "Leads calientes": { en: "Hot leads" },
  Cotizacion: { en: "Quoting" },
  Cotizaciones: { en: "Quoting" },
  "Alta intencion": { en: "High intent" },
  "Viajes especiales": { en: "Special trips" },
  "Conversion alta": { en: "High-conversion readers" },
  Blog: { en: "Content readers" },
  Inspiracion: { en: "Travel inspiration" },
  "Enlazado interno": { en: "Internal navigation" },
  "Usuarios tibios": { en: "Evaluating clients" },
  "SEO organico": { en: "Organic readers" },
  "SEO blog": { en: "Content readers" },
  "English SEO": { en: "English readers" },
};

const englishSectionTemplates = {
  "Paginas Principales": [
    {
      title: "National coverage with an executive focus",
      text:
        "This page is designed for clients looking for stronger visibility, premium service positioning, and a clearer path toward a real private aviation request in Mexico.",
    },
    {
      title: "A stronger path from interest to proposal",
      text:
        "The messaging can align route, passenger profile, schedule, and service expectations so the visit turns into a real quote instead of passive browsing.",
    },
    {
      title: "Why this page matters",
      text:
        "It answers high-intent questions with clearer language, a stronger sales path, and more relevance for premium travelers looking for private aviation in Mexico.",
    },
  ],
  "Paginas por Rutas": [
    {
      title: "A route with strong executive demand",
      text:
        "This route page is built to capture travelers who already know their origin and destination and are closer to requesting a private flight proposal.",
    },
    {
      title: "Operational value for premium travel",
      text:
        "The content can highlight schedule flexibility, privacy, optimized timing, and a smoother experience for business and premium travelers.",
    },
    {
      title: "Why this page matters",
      text:
        "It answers high-intent questions with clearer language, a stronger sales path, and more relevance for premium travelers looking for private aviation in Mexico.",
    },
  ],
  "Paginas por Ciudad": [
    {
      title: "Local visibility with real commercial value",
      text:
        "This city page helps position the brand closer to travelers searching for private aviation options in a specific market with a clear commercial intent.",
    },
    {
      title: "Built for stronger regional conversion",
      text:
        "The page can communicate response speed, route flexibility, and personalized proposals for users searching from a defined city or metro area.",
    },
    {
      title: "Why this page matters",
      text:
        "It answers high-intent questions with clearer language, a stronger sales path, and more relevance for premium travelers looking for private aviation in Mexico.",
    },
  ],
  "Paginas Informativas": [
    {
      title: "Useful guidance before the quote stage",
      text:
        "This page helps readers understand the topic in a practical way so they can move forward with better context and fewer doubts.",
    },
    {
      title: "Educational content with commercial value",
      text:
        "It can explain the process, expectations, and decision factors in a way that naturally guides the reader toward a real conversation with the team.",
    },
    {
      title: "Why this page matters",
      text:
        "It answers high-intent questions with clearer language, a stronger sales path, and more relevance for premium travelers looking for private aviation in Mexico.",
    },
  ],
  "Paginas de Intencion de Compra": [
    {
      title: "Designed for direct buying intent",
      text:
        "This page is built for visitors who are already looking for a quote, price guidance, or immediate support for a private aviation request.",
    },
    {
      title: "A clear route toward contact",
      text:
        "The goal is to reduce friction, ask for only the right details, and move the visitor quickly toward a personalized proposal.",
    },
    {
      title: "Why this page matters",
      text:
        "It answers high-intent questions with clearer language, a stronger sales path, and more relevance for premium travelers looking for private aviation in Mexico.",
    },
  ],
  "Blog SEO": [
    {
      title: "Useful content for informed readers",
      text:
        "This article is designed to answer practical questions, add clarity, and help readers better understand private aviation topics in Mexico.",
    },
    {
      title: "Built to connect interest with action",
      text:
        "The content can inform, compare options, and naturally guide the reader toward a quote request or a conversation with the team.",
    },
    {
      title: "Why this page matters",
      text:
        "It answers high-intent questions with clearer language, a stronger sales path, and more relevance for premium travelers looking for private aviation in Mexico.",
    },
  ],
};

const pageTranslations = {
  "vuelos-privados-mexico": {
    en: {
      path: "/private-jet-mexico",
      title: "Private Flights in Mexico",
      description:
        "Request private flights in Mexico with personalized attention, nationwide coverage, and executive routes for corporate and private clients.",
      heroIntro:
        "If you are looking for a premium way to move within Mexico and beyond, here you can understand what shapes the quote, which airports matter most, what aircraft categories are usually used, and which routes tend to have the strongest demand.",
      sections: [
        {
          title: "How much does a private flight in Mexico cost?",
          kicker: "Quoting",
          image: "/images/blog/Blog1.png",
          summary:
            "A professional quote depends on the route, aircraft category, availability, and the real profile of the trip, not on one flat public rate.",
          highlights: ["Route and timing", "Aircraft category", "Passenger profile"],
          paragraphs: [
            "The cost of a private flight in Mexico is not based on one flat public rate because every mission changes according to route, aircraft category, total flight time, schedule, availability, and passenger needs. A short executive route inside the country is structured very differently from a leisure departure to a beach destination, a cross-border movement, or a more complex itinerary that involves repositioning, waiting times, and airport coordination. That is why strong SEO content around private flights should explain the logic behind quoting instead of publishing generic numbers that do not reflect real operations.",
            "Other variables also matter, including aircraft positioning, desired departure time, baggage profile, passenger count, overnight crew requirements, private terminal coordination, and the level of operational support expected. In corporate travel, timing and continuity of agenda usually carry more weight. In premium leisure, privacy, comfort, and flexibility may be the priority. The best way to guide the reader is to explain that a professional quote is built around the actual mission so the proposal starts from a realistic commercial and operational basis.",
          ],
        },
        {
          title: "Private airports in Mexico",
          kicker: "Infrastructure",
          image: "/images/About/About10.png",
          summary:
            "Private aviation usually relies on executive airports, specialized terminals, and strategic hubs such as Toluca, Mexico City, Monterrey, Guadalajara, and Cancun.",
          highlights: ["Executive terminals", "Less friction", "Strategic hubs"],
          paragraphs: [
            "When you search for private airports in Mexico, you are usually referring to airports and executive facilities used for private aviation, charter movements, and premium passenger handling. Activity is concentrated in markets with strong business, tourism, and high-value travel demand, such as Toluca, Mexico City, Monterrey, Guadalajara, Queretaro, Cancun, and Los Cabos. These locations do not all operate in exactly the same way, but they share the same value proposition: a smoother experience than commercial aviation, with more direct coordination and better support for demanding schedules.",
            "Depending on your route and travel profile, the operation may rely on executive terminals, FBO support, slot availability, private passenger services, and a faster boarding process. That matters if you prioritize privacy, time savings, and schedule continuity. It also helps you understand where departures usually happen, which executive hubs may be more convenient, and how the experience changes when the trip is built around private aviation infrastructure.",
          ],
        },
        {
          title: "Types of private jets",
          kicker: "Aircraft",
          image: "/images/Service/TaxiAereo.png",
          summary:
            "Not every trip needs the same aircraft category. The best option changes according to range, passengers, luggage, and the experience expected.",
          highlights: ["Light jets", "Midsize and heavy", "Mission-based options"],
          paragraphs: [
            "Not every private flight in Mexico is operated with the same aircraft category. There are light jets, midsize aircraft, super midsize jets, heavy jets, turboprops, and helicopters, and each one fits a different combination of range, travel time, passenger count, luggage needs, and mission profile. If you move quickly between major cities, you may need an agile aircraft for short or mid-range legs. If you travel with family or a premium group, you may need more cabin space, autonomy, and comfort for a longer route.",
            "Talking about aircraft categories also helps align expectations with the actual mission. You may arrive searching for a broad phrase like private flights in Mexico, but what you really need may be something more specific: a charter for a meeting, an urgent movement, a luxury trip, or a recurring route.",
          ],
        },
        {
          title: "Most requested routes",
          kicker: "Real demand",
          image: "/images/blog/Blog2.png",
          summary:
            "The strongest demand usually appears in business corridors and premium destinations such as Monterrey, Guadalajara, Cancun, and Los Cabos.",
          highlights: ["Business corridors", "Premium destinations", "High buying intent"],
          paragraphs: [
            "Among the most requested private aviation routes in Mexico are business and premium corridors such as Mexico City to Monterrey, Mexico City to Guadalajara, Toluca to Cancun, Monterrey to Cancun, Guadalajara to Los Cabos, and other links tied to strong executive or leisure demand. These routes attract consistent interest because they combine time savings, scheduling flexibility, and clear reasons to request private travel.",
            "Some routes also gain momentum seasonally or because a traveler needs an urgent departure outside the logic of commercial aviation. Private travel becomes especially valuable when meetings happen in different cities on the same day, when a group needs to move together, or when the destination is tied to a premium experience where timing and privacy matter. Including most requested routes inside the main landing page helps SEO performance and creates stronger internal linking opportunities toward route pages, city pages, and supporting content. That allows the winning URL to attract demand while also distributing authority across the rest of the content ecosystem.",
          ],
        },
        {
          title: "How to quote a private flight",
          kicker: "Next step",
          image: "/images/blog/About.png",
          summary:
            "The best quote starts with a clear route, date, passenger count, and a defined operational context so the proposal is actually useful.",
          highlights: ["Share your route", "Define passengers", "Move to proposal"],
          paragraphs: [
            "The right way to quote a private flight starts with sharing a clear route, date, passenger count, trip type, and any schedule restriction or operational detail that matters. The more defined the scenario is, the easier it becomes to receive a proposal that actually fits the mission.",
            "To work that buying intent more directly, the next step should point to https://redskyg.com/landing/ focused on the quoting process. From here, the user can move into a more transactional experience that explains what details to share, how a proposal is structured, and why a personalized quote is more useful than a generic public number. That link helps split intent intelligently between the main landing page and a dedicated conversion page without weakening the authority of the primary URL.",
          ],
          href: "https://redskyg.com/landing/",
          linkLabel: "Go to the page about quoting a private flight",
        },
      ],
      ctaTitle: "Request your private flight proposal",
      ctaText:
        "Share your route and schedule to receive personalized attention and a proposal aligned with your travel needs.",
      faqs: [
        {
          question: "How do I request a private flight quote in Mexico?",
          answer:
            "Share your departure airport, destination, date, passenger count, time preference, and any relevant baggage or schedule details. That creates a stronger base for reviewing availability and suitable options.",
        },
        {
          question: "Which routes tend to see the strongest private flight demand in Mexico?",
          answer:
            "Corporate and premium corridors such as Mexico City, Toluca, Monterrey, Guadalajara, Cancun, and Los Cabos usually concentrate strong demand, although seasonality and urgency also influence activity.",
        },
        {
          question: "Do fixed public prices help users quote a private flight better?",
          answer:
            "Not always. In private aviation, operational variables change significantly, so a personalized proposal is usually more useful than a generic number without route and mission context.",
        },
      ],
    },
  },
  landing: {
    en: {
      title: "How to Quote a Private Flight",
      description:
        "Learn how to quote a private flight with the right details so you can receive a clearer and more useful proposal.",
      heroIntro:
        "If you are already evaluating a private departure, here you can see what information to share so the proposal you receive is clearer and more useful.",
      sections: [
        {
          title: "What information should you share?",
          paragraphs: [
            "The most useful starting point is route, date, passenger count, whether the trip is one-way or round-trip, and any schedule limitations. That gives the team a stronger operational base for evaluating options.",
            "If you already know the departure airport, destination airport, desired schedule, baggage profile, or the nature of the trip, adding those details helps speed up the quoting process.",
          ],
        },
        {
          title: "Why does a personalized quote work better?",
          paragraphs: [
            "A private aviation mission depends on availability, aircraft category, positioning, crew timing, and the structure of the itinerary. That is why a tailored quote usually creates more value than a generic public number.",
            "A better-built proposal also helps compare alternatives with more clarity and make decisions with stronger commercial and operational context.",
          ],
        },
        {
          title: "Next step to request your proposal",
          paragraphs: [
            "If you already have the route or a defined travel need, you can send your details through WhatsApp or the contact page for a faster response.",
            "The goal is to turn your need into a clear proposal instead of leaving you with ambiguous information or weak guidance.",
          ],
        },
      ],
      ctaTitle: "Request a well-structured quote",
      ctaText:
        "Share the key details of your trip and receive a proposal based on your route, passenger count, and timing.",
      audience: ["Quote-ready clients", "Hot leads", "Quoting"],
      faqs: [
        {
          question: "What do I need to quote a private flight?",
          answer:
            "Usually route, date, passenger count, and a preferred schedule are enough to begin. If there are baggage or agenda restrictions, adding them helps refine the proposal.",
        },
        {
          question: "Can I request a quote without knowing the exact aircraft?",
          answer:
            "Yes. The team can recommend the most suitable aircraft category based on the mission, passengers, and route.",
        },
        {
          question: "Does the quote process also apply to urgent flights?",
          answer:
            "Yes. Urgent requests can be reviewed according to availability, airport access, crew timing, and overall operational feasibility.",
        },
      ],
    },
  },
  "jet-charter-mexico": {
    en: {
      title: "Jet Charter Mexico",
      description:
        "Jet charter service in Mexico for executive flights, corporate travel, and private operations with a fast response.",
    },
  },
  "aviacion-ejecutiva-mexico": {
    en: {
      title: "Executive Aviation Mexico",
      description:
        "Executive aviation solutions in Mexico for companies, directors, and clients seeking efficiency, privacy, and specialized attention.",
    },
  },
  "renta-avion-privado-mexico": {
    en: {
      title: "Private Aircraft Rental Mexico",
      description:
        "Private aircraft rental in Mexico for executive, family, and premium routes with personalized quoting.",
    },
  },
  "renta-avion-privado": {
    en: {
      title: "Private Aircraft Rental",
      description:
        "Private aircraft rental with personalized attention, flexible routes, and commercial support for executive, family, and premium travel.",
    },
  },
  "charter-privado-mexico": {
    en: {
      title: "Private Charter Mexico",
      description:
        "Private charter in Mexico for executive flights, premium transfers, and personalized operations with immediate attention.",
    },
  },
  "jet-privado-cdmx-cancun": {
    es: {
      title: "Jet Privado CDMX a Cancun",
      description:
        "Private jet charter CDMX a Cancun con disponibilidad inmediata, jets ligeros, midsize y heavy, y salidas desde Toluca, Santa Fe y AICM.",
      heroTitle: "Private Jet Charter CDMX -> Cancun",
      heroIntro:
        "Disponibilidad inmediata. Light, midsize y heavy jets. Salidas desde Toluca, Santa Fe y AICM para una salida privada mas rapida, discreta y controlada.",
      primaryCtaLabel: "Cotizar vuelo ahora",
      secondaryCtaLabel: "Hablar con asesor",
      heroHighlights: [
        "Immediate availability",
        "Departures from Toluca, Santa Fe & AICM",
        "Light, midsize & heavy jets",
      ],
      sections: [
        {
          title: "Vuela de CDMX a Cancun en menos de 2 horas",
          summary:
            "Evita la friccion del aeropuerto comercial. Abordaje directo, tiempos mas cortos y una operacion privada mucho mas eficiente.",
          highlights: ["Direct boarding", "Full privacy", "Fast departure"],
          paragraphs: [
            "Si necesitas velocidad, discrecion y una salida mejor controlada hacia Cancun, esta ruta te da un camino mucho mas directo.",
            "La ventaja no es solo llegar. Es proteger agenda, reducir ruido operativo y mantener la experiencia premium desde el primer contacto.",
          ],
        },
        {
          title: "Disponibilidad real segun horario y categoria",
          summary:
            "Ajustamos la aeronave segun pasajeros, equipaje, agenda y perfil del viaje para evitar propuestas vagas.",
          highlights: ["Light jet", "Midsize jet", "Heavy jet"],
          paragraphs: [
            "Cada cotizacion parte de una revision real de ruta, horario y categoria. Eso acelera la decision y mejora la claridad comercial.",
            "Cuando la salida importa, tener disponibilidad revisada en tiempo real hace la diferencia.",
          ],
        },
        {
          title: "Pensado para viajes ejecutivos y premium",
          summary:
            "Ideal para escapadas de alto valor, traslados de negocios, villas, hoteles premium y agendas con poco margen.",
          highlights: ["Business travel", "Luxury travel", "VIP coordination"],
          paragraphs: [
            "La ruta CDMX a Cancun combina una de las salidas mas demandadas con una experiencia donde el tiempo y la privacidad pesan mucho.",
            "Por eso esta pagina debe cerrar, no solo informar: el siguiente paso correcto es revisar disponibilidad y cotizar de inmediato.",
          ],
        },
      ],
      ctaTitle: "Asegura tu aeronave antes de que cambie la disponibilidad",
      ctaText:
        "Solicita una cotizacion inmediata para esta ruta prioritaria y recibe respuesta con aeronave, horario y ventana operativa mas claros.",
      audience: ["Vacaciones premium", "Viajes ejecutivos", "Salidas urgentes"],
    },
    en: {
      title: "Private Jet CDMX to Cancun",
      description:
        "Private jet charter CDMX to Cancun with immediate availability, light, midsize, and heavy jets, plus departures from Toluca, Santa Fe, and AICM.",
      heroTitle: "Private Jet Charter CDMX -> Cancun",
      heroIntro:
        "Immediate availability. Light, midsize & heavy jets. Departures from Toluca, Santa Fe & AICM for a faster, more discreet, better-controlled private departure.",
      primaryCtaLabel: "Get Instant Quote",
      secondaryCtaLabel: "Speak to Advisor",
      heroHighlights: [
        "Immediate availability",
        "Departures from Toluca, Santa Fe & AICM",
        "Light, midsize & heavy jets",
      ],
      sections: [
        {
          title: "Fly from CDMX to Cancun in under 2 hours",
          summary:
            "Skip commercial airport friction. Direct boarding, shorter timing, and a private operation built around speed and control.",
          highlights: ["Direct boarding", "Full privacy", "Fast departure"],
          paragraphs: [
            "This route is built for clients who need speed, discretion, and a better-controlled departure into Cancun.",
            "The advantage is not only arriving faster. It is protecting schedule, reducing operational noise, and keeping the experience premium from the first touchpoint.",
          ],
        },
        {
          title: "Real availability by timing and aircraft category",
          summary:
            "We match the aircraft to passengers, baggage, calendar, and mission profile so the quote feels specific, not generic.",
          highlights: ["Light jet", "Midsize jet", "Heavy jet"],
          paragraphs: [
            "Every quote starts with a real review of route, timing, and aircraft category. That improves clarity and speeds up decision-making.",
            "When the departure matters, live availability review is what makes the commercial path stronger.",
          ],
        },
        {
          title: "Built for executive and premium travel",
          summary:
            "Ideal for high-value leisure, business transfers, villas, premium resorts, and calendars with no room for wasted time.",
          highlights: ["Business travel", "Luxury travel", "VIP coordination"],
          paragraphs: [
            "The CDMX to Cancun route combines one of the strongest private flight demands with an experience where time and privacy matter deeply.",
            "That is why this page should close, not just inform. The right next step is to review live availability and quote now.",
          ],
        },
      ],
      ctaTitle: "Secure your aircraft before availability changes",
      ctaText:
        "Request an instant quote for this priority route and receive a clearer reply on aircraft fit, timing, and operating window.",
      audience: ["Premium vacations", "Executive travel", "Urgent departures"],
    },
  },
  "jet-privado-cdmx-monterrey": {
    en: {
      title: "Private Jet CDMX to Monterrey",
      description:
        "Rent a private jet from Mexico City to Monterrey for executive transfers, corporate travel, and time-sensitive operations.",
      heroIntro:
        "A key route for business travelers moving between two of the country’s strongest corporate hubs.",
      sections: [
        {
          title: "A strong route for corporate demand",
          text:
            "It increases visibility among companies and executives who prioritize schedule control, speed, and privacy between Mexico City and Monterrey.",
        },
        {
          title: "Designed for tightly scheduled agendas",
          text:
            "The page can emphasize easier coordination, optimized timing, and premium service for same-day round trips or executive transfers.",
        },
        {
          title: "Why this page matters",
          text:
            "It answers high-intent questions with clearer language, a stronger sales path, and more relevance for premium travelers looking for private aviation in Mexico.",
        },
      ],
      ctaTitle: "Request a quote from CDMX to Monterrey",
      ctaText:
        "Receive a personalized proposal for your private flight on this executive route.",
      audience: ["Companies", "Board members", "Business travel"],
    },
  },
  "jet-privado-cdmx-guadalajara": {
    es: {
      title: "Jet Privado de CDMX a Guadalajara",
      seoTitle: "Jet Privado CDMX a Guadalajara | Charter Ejecutivo Premium | Red Sky Group",
      seoDescription:
        "Reserva vuelos privados de Ciudad de Mexico a Guadalajara con servicio premium, seguridad y disponibilidad ejecutiva.",
      description:
        "Reserva vuelos privados de Ciudad de Mexico a Guadalajara con servicio premium, seguridad y disponibilidad ejecutiva.",
      heroKicker: "Ruta ejecutiva prioritaria",
      heroTitle: "Jet Privado de CDMX a Guadalajara",
      heroIntro:
        "Charter ejecutivo con disponibilidad real para reuniones, visitas industriales y traslados premium entre Ciudad de Mexico y Guadalajara.",
      primaryCtaLabel: "Solicita cotizacion privada",
      secondaryCtaLabel: "Habla con ventas",
      heroHighlights: [
        "Disponibilidad ejecutiva real",
        "Ruta corporativa de alta demanda",
        "Atencion premium sin brokers tradicionales",
      ],
      heroStats: [
        { value: "1h 10m - 1h 25m", label: "Tiempo estimado de vuelo segun aeropuerto y categoria" },
        { value: "Light a Midsize", label: "Tipos de aeronave frecuentes para esta ruta" },
        { value: "$145k - $295k MXN", label: "Rango estimado sujeto a disponibilidad real" },
      ],
      sections: [
        {
          title: "Tiempo estimado",
          kicker: "Ruta",
          summary:
            "La mayoria de las operaciones entre CDMX y Guadalajara se mueven en una ventana aproximada de 1 hora 10 minutos a 1 hora 25 minutos.",
          highlights: ["Salida ejecutiva", "Menos friccion", "Mas control de agenda"],
          paragraphs: [
            "Esta ruta permite proteger reuniones, visitas de planta y movimientos corporativos con una salida privada mucho mas agil que la aviacion comercial.",
            "El tiempo final depende del aeropuerto de salida, condiciones operativas y categoria de aeronave, pero la ventaja principal es la continuidad de agenda.",
          ],
        },
        {
          title: "Tipos de aeronave",
          kicker: "Aircraft fit",
          summary:
            "Normalmente recomendamos light jets y midsize jets para equilibrar tiempo, confort, numero de pasajeros y costo operativo.",
          highlights: ["Light Jet", "Midsize Jet", "Executive cabin"],
          paragraphs: [
            "La seleccion correcta cambia segun pasajeros, equipaje, flexibilidad de horario y el tipo de experiencia que buscas.",
            "No enviamos opciones vagas. Revisamos disponibilidad real para proponer una categoria que haga sentido comercial y operativo.",
          ],
        },
        {
          title: "Rango de precio",
          kicker: "Pricing",
          summary:
            "Como referencia comercial, la ruta suele moverse en un rango aproximado de $145,000 a $295,000 MXN segun categoria, horario, aeropuerto y disponibilidad.",
          highlights: ["Precio orientativo", "Disponibilidad real", "Propuesta privada"],
          paragraphs: [
            "El precio cambia si la salida requiere posicionamiento, horarios especiales, mayor cabina o una operacion con menor flexibilidad.",
            "Por eso la mejor practica es solicitar una propuesta privada con ruta, fecha y pasajeros definidos para recibir una respuesta mas clara.",
          ],
        },
        {
          title: "Beneficios",
          kicker: "Conversion",
          summary:
            "Esta ruta es ideal para clientes que valoran velocidad, privacidad, productividad y una experiencia premium de punta a punta.",
          highlights: ["Ahorro de tiempo", "Privacidad", "Atencion premium"],
          paragraphs: [
            "Entre CDMX y Guadalajara, la aviacion privada suele ganar cuando la agenda importa mas que una tarifa comercial generica.",
            "No solo compras un asiento; ganas control, disponibilidad executive y una coordinacion mas directa.",
          ],
        },
      ],
      ctaTitle: "Solicita cotizacion para CDMX a Guadalajara",
      ctaText:
        "Comparte tu ruta, fecha y pasajeros para recibir una propuesta privada con disponibilidad real y soporte premium.",
      audience: ["Empresas", "Industria", "Clientes premium"],
      faqs: [
        {
          question: "Cuanto cuesta rentar un jet privado de CDMX a Guadalajara?",
          answer:
            "Como referencia, la ruta suele moverse entre $145,000 y $295,000 MXN, pero el precio final cambia segun categoria de aeronave, horario, aeropuerto y disponibilidad.",
        },
        {
          question: "Que incluye esta propuesta de charter ejecutivo?",
          answer:
            "Incluye revision comercial y operativa, seleccion de aeronave segun la mision, seguimiento de disponibilidad y atencion premium para coordinar la salida.",
        },
        {
          question: "Con cuanto tiempo se recomienda reservar?",
          answer:
            "Mientras antes se comparta la ruta mejor, pero tambien atendemos solicitudes urgentes segun disponibilidad real, ventana operativa y categoria de aeronave.",
        },
      ],
    },
    en: {
      title: "Private Jet CDMX to Guadalajara",
      seoTitle: "Private Jet CDMX to Guadalajara | Premium Executive Charter | Red Sky Group",
      seoDescription:
        "Book private flights from Mexico City to Guadalajara with premium service, safety, and executive availability.",
      description:
        "Request a private jet from Mexico City to Guadalajara for executive travel, key meetings, and private transfers with full flexibility.",
      heroKicker: "Priority executive route",
      heroTitle: "Private Jet from CDMX to Guadalajara",
      heroIntro:
        "Executive charter with real availability for meetings, industrial visits, and premium transfers between Mexico City and Guadalajara.",
      primaryCtaLabel: "Request private quote",
      secondaryCtaLabel: "Speak with sales",
      heroHighlights: [
        "Real executive availability",
        "High-demand corporate route",
        "Premium support without traditional brokers",
      ],
      heroStats: [
        { value: "1h 10m - 1h 25m", label: "Estimated flight time by airport and aircraft" },
        { value: "Light to Midsize", label: "Frequent aircraft categories for this route" },
        { value: "$145k - $295k MXN", label: "Estimated range subject to live availability" },
      ],
      sections: [
        {
          title: "Estimated flight time",
          summary:
            "Most operations between CDMX and Guadalajara move within an estimated window of 1 hour 10 minutes to 1 hour 25 minutes.",
          highlights: ["Executive departure", "Less friction", "Better schedule control"],
          paragraphs: [
            "This route helps protect meetings, plant visits, and high-value business movement with a faster private departure than commercial aviation.",
            "Final timing depends on departure airport, operating conditions, and aircraft category, but the real value is schedule continuity.",
          ],
        },
        {
          title: "Aircraft types",
          summary:
            "Light jets and midsize jets are usually the best fit to balance time, comfort, passenger count, and operating cost on this route.",
          highlights: ["Light Jet", "Midsize Jet", "Executive cabin"],
          paragraphs: [
            "The right option changes according to passengers, baggage, flexibility, and the experience expected by the client.",
            "We do not send vague options. We review live availability first so the proposal makes both commercial and operational sense.",
          ],
        },
        {
          title: "Price range",
          summary:
            "As a commercial reference, this route often moves in an estimated range of $145,000 to $295,000 MXN depending on aircraft, schedule, airport, and availability.",
          highlights: ["Reference pricing", "Live availability", "Private proposal"],
          paragraphs: [
            "Pricing changes if the departure requires repositioning, tighter timing, larger cabin space, or lower operational flexibility.",
            "That is why the best next step is to request a private proposal with route, date, and passenger details already defined.",
          ],
        },
        {
          title: "Benefits",
          summary:
            "This route is ideal for clients who value speed, privacy, productivity, and a premium experience from first contact to departure.",
          highlights: ["Time savings", "Privacy", "Premium attention"],
          paragraphs: [
            "Between CDMX and Guadalajara, private aviation usually wins when the agenda matters more than a generic public fare.",
            "The client is not only buying a seat. They are buying control, executive availability, and more direct coordination.",
          ],
        },
      ],
      ctaTitle: "Request your private flight from CDMX to Guadalajara",
      ctaText:
        "Share your route, date, and passenger count to receive a private proposal with real availability and premium support.",
      audience: ["Companies", "Industry", "Premium clients"],
      faqs: [
        {
          question: "How much does it cost to rent a private jet from CDMX to Guadalajara?",
          answer:
            "As a reference, the route often ranges from $145,000 to $295,000 MXN, but the final amount depends on aircraft category, schedule, airport, and live availability.",
        },
        {
          question: "What does this executive charter proposal include?",
          answer:
            "It includes commercial and operational review, aircraft selection according to the mission, availability follow-up, and premium support to coordinate the departure.",
        },
        {
          question: "How far in advance should I book this route?",
          answer:
            "The earlier the route is shared the better, but urgent requests can also be reviewed according to live availability, operating window, and aircraft category.",
        },
      ],
    },
  },
  "jet-privado-toluca-cancun": {
    en: {
      title: "Private Jet Toluca to Cancun",
      description:
        "Rent a private jet from Toluca to Cancun with executive departures, personalized attention, and premium travel options.",
      heroIntro:
        "A highly relevant route for capturing demand from Toluca and its surrounding area toward one of the country’s most requested destinations.",
      sections: [
        {
          title: "Toluca as a strategic departure point",
          text:
            "This page helps leverage the brand’s operational proximity to Toluca and strengthen local relevance on a route with strong demand.",
        },
        {
          title: "More control from Toluca departures",
          text:
            "It can reinforce the advantages of operating from Toluca with greater convenience, less friction, and a faster response for premium travelers.",
        },
        {
          title: "Why this page matters",
          text:
            "It answers high-intent questions with clearer language, a stronger sales path, and more relevance for premium travelers looking for private aviation in Mexico.",
        },
      ],
      ctaTitle: "Request your private jet from Toluca to Cancun",
      ctaText:
        "Send your travel date, passenger count, and preferred timing to receive a personalized quote.",
      audience: ["Toluca", "Mexico Valley", "VIP leisure travel"],
    },
  },
  "jet-privado-monterrey-cancun": {
    en: {
      title: "Private Jet Monterrey to Cancun",
      description:
        "Request a private jet from Monterrey to Cancun for premium travel, corporate transfers, and private flights with immediate attention.",
      heroIntro:
        "An attractive route for the corporate market and premium leisure demand from northern Mexico to the Mexican Caribbean.",
      sections: [
        {
          title: "A commercially powerful route",
          text:
            "It combines a high-income city with an aspirational destination and clear private-flight intent.",
        },
        {
          title: "Flexibility for leisure or business",
          text:
            "The offer can adapt to weekend escapes, family travel, executive agendas, or transfers with uncommon timing requirements.",
        },
        {
          title: "Why this page matters",
          text:
            "It answers high-intent questions with clearer language, a stronger sales path, and more relevance for premium travelers looking for private aviation in Mexico.",
        },
      ],
      ctaTitle: "Request your private flight from Monterrey to Cancun",
      ctaText:
        "Ask for a proposal with aircraft options and availability for this route.",
      audience: ["Northern Mexico", "Premium travel", "Ready-to-buy travelers"],
    },
  },
  "jet-privado-guadalajara-los-cabos": {
    en: {
      title: "Private Jet Guadalajara to Los Cabos",
      description:
        "Rent a private jet from Guadalajara to Los Cabos with executive service, privacy, and a premium experience from start to finish.",
      heroIntro:
        "An aspirational route focused on premium tourism, executive leisure, and private transfers to one of the country’s top destinations.",
      sections: [
        {
          title: "A premium route with strong conversion potential",
          text:
            "It helps attract high-value travelers who already view private aviation as part of the full travel experience.",
        },
        {
          title: "A more exclusive and flexible experience",
          text:
            "The content can highlight privacy, optimized timing, and comfort for families, couples, groups, or executives traveling for rest.",
        },
        {
          title: "Why this page matters",
          text:
            "It answers high-intent questions with clearer language, a stronger sales path, and more relevance for premium travelers looking for private aviation in Mexico.",
        },
      ],
      ctaTitle: "Request your private jet to Los Cabos",
      ctaText:
        "Share your travel plan and receive a quote tailored to your preferred experience.",
      audience: ["Premium tourism", "Families", "VIP clients"],
    },
  },
  "vuelo-privado-cdmx-tijuana": {
    en: {
      title: "Private Flight CDMX to Tijuana",
      description:
        "Request a private flight from Mexico City to Tijuana with an executive approach, optimized timing, and personalized attention.",
      heroIntro:
        "A relevant route for business, industry, cross-border activity, and schedules with tighter timing needs.",
      sections: [
        {
          title: "A useful search for executive decisions",
          text:
            "It attracts travelers who value speed, schedule continuity, and privacy on a long domestic route.",
        },
        {
          title: "Built for more efficient transfer times",
          text:
            "The page can reinforce the value of traveling with greater control, fewer interruptions, and premium service adapted to operational needs.",
        },
        {
          title: "Why this page matters",
          text:
            "It answers high-intent questions with clearer language, a stronger sales path, and more relevance for premium travelers looking for private aviation in Mexico.",
        },
      ],
      ctaTitle: "Request your private flight to Tijuana",
      ctaText:
        "Ask for route options and receive an executive proposal tailored to your timing.",
      audience: ["Industry", "Executives", "Border-region travelers"],
    },
  },
  "vuelo-privado-cancun-miami": {
    en: {
      title: "Private Flight Cancun to Miami",
      description:
        "Rent a private flight from Cancun to Miami with premium service, personalized attention, and support for an international route.",
      heroIntro:
        "A highly attractive international route for premium travelers, frequent flyers, and clients seeking continuity across the full trip experience.",
      sections: [
        {
          title: "An international route with strong demand",
          text:
            "It is ideal for attracting travelers who combine leisure, business, and high-value itineraries between Mexico and the United States.",
        },
        {
          title: "A premium message for an international corridor",
          text:
            "The content can position the brand with a more global profile, highlighting comfort, flexibility, and a higher-end travel experience.",
        },
        {
          title: "Why this page matters",
          text:
            "It answers high-intent questions with clearer language, a stronger sales path, and more relevance for premium travelers looking for private aviation in Mexico.",
        },
      ],
      ctaTitle: "Request your private flight from Cancun to Miami",
      ctaText:
        "Share your travel date, passengers, and preferences to receive a personalized proposal.",
      audience: ["International travelers", "Luxury tourism", "Business travel"],
    },
  },
  "renta-jet-privado-cdmx": {
    en: {
      title: "Private Jet Rental CDMX",
      description:
        "Private jet rental in Mexico City for executive travel, premium transfers, and private flights with personalized quoting.",
    },
  },
  "renta-jet-privado-toluca": {
    en: {
      title: "Private Jet Rental Toluca",
      description:
        "Request private jet rental in Toluca with executive attention, tailored departures, and immediate commercial support.",
    },
  },
  "jet-privado-toluca": {
    en: {
      title: "Private Jet Toluca",
      description:
        "Private jet service in Toluca with executive departures, close attention, and tailored proposals for private flights from central Mexico.",
    },
  },
  "renta-jet-privado-monterrey": {
    en: {
      title: "Private Jet Rental Monterrey",
      description:
        "Private jet rental in Monterrey for business travel, premium flights, and executive transfers with a quick response.",
    },
  },
  "jet-privado-monterrey": {
    en: {
      title: "Private Jet Monterrey",
      description:
        "Private jet service in Monterrey for corporate travel, premium departures, and executive transfers with agile commercial support.",
    },
  },
  "renta-jet-privado-guadalajara": {
    en: {
      title: "Private Jet Rental Guadalajara",
      description:
        "Request private jet rental in Guadalajara for executive, corporate, and premium flights with specialized attention.",
    },
  },
  "renta-jet-privado-cancun": {
    en: {
      title: "Private Jet Rental Cancun",
      description:
        "Private jet rental in Cancun for luxury travel, VIP transfers, and private flights with tailored quoting.",
    },
  },
  "jet-privado-cancun": {
    en: {
      path: "/private-jet-cancun",
      title: "Private Jet Cancun",
      description:
        "Private jet service in Cancun for luxury travel, VIP transfers, and executive departures with personalized quoting.",
    },
  },
  "renta-jet-privado-los-cabos": {
    en: {
      title: "Private Jet Rental Los Cabos",
      description:
        "Request private jet rental in Los Cabos for luxury travel, executive transfers, and personalized premium experiences.",
    },
  },
  "como-contratar-vuelo-privado": {
    en: {
      title: "How to Book a Private Flight",
      description:
        "Learn how to book a private flight in Mexico, what details you need, and how to request a personalized quote.",
    },
  },
  "que-incluye-jet-privado": {
    en: {
      title: "What a Private Jet Service Includes",
      description:
        "Discover what a private jet service includes, how it is structured, and what to expect when booking a private flight.",
    },
  },
  "beneficios-aviacion-ejecutiva": {
    en: {
      title: "Benefits of Executive Aviation",
      description:
        "Learn the main benefits of executive aviation for companies, directors, and travelers who value time and privacy.",
    },
  },
  "tipos-jets-privados": {
    en: {
      title: "Types of Private Jets",
      description:
        "Explore the types of private jets and learn which category may best fit your route, passengers, and travel goals.",
    },
  },
  "como-funciona-vuelo-privado": {
    en: {
      title: "How a Private Flight Works",
      description:
        "Learn how a private flight works, from the quote request to the operational coordination of the trip.",
    },
  },
  "cotizar-vuelo-privado-mexico": {
    en: {
      title: "Quote a Private Flight in Mexico",
      description:
        "Request a private flight quote in Mexico with fast attention, personalized support, and a proposal based on your route and passengers.",
    },
  },
  "solicitar-jet-privado": {
    en: {
      title: "Request a Private Jet",
      description:
        "Request a private jet in Mexico with personalized support, route-based availability, and a proposal adapted to your operation.",
    },
  },
  "charter-privado-mexico-cotizacion": {
    en: {
      title: "Private Charter Mexico Quote",
      description:
        "Request a private charter quote in Mexico for executive flights, premium trips, and tailored routes.",
    },
  },
  "private-jet-charter": {
    es: {
      title: "Charter Privado en Jet",
      seoTitle: "Charter Privado en Jet | Sky Group Aviation",
      seoDescription:
        "Charter privado en jet en Mexico con soporte ejecutivo, horarios flexibles y coordinacion personalizada para cada vuelo.",
      description:
        "Charter privado en jet en Mexico con soporte ejecutivo, horarios flexibles y coordinacion personalizada para cada vuelo.",
      heroIntro:
        "Esta pagina esta dedicada solo al charter privado en jet, para que las solicitudes de vuelo tengan un destino claro sin mezclarse con venta de aeronaves u otros temas mas amplios de aviacion.",
      sections: [
        {
          title: "Una pagina enfocada en intencion charter",
          text:
            "Da a la demanda de charter una ruta mas limpia, con contenido centrado en vuelos privados, horarios, rutas y necesidades de viaje ejecutivo.",
        },
        {
          title: "Pensada para solicitudes de vuelo y control de agenda",
          text:
            "La propuesta esta construida para viajeros que necesitan salidas flexibles, manejo premium y soporte directo para definir la aeronave correcta segun la mision.",
        },
        {
          title: "Por que esta pagina ayuda a convertir",
          text:
            "Aclara la necesidad comercial con un mensaje mas directo, separa la intencion charter de otros servicios y acerca al usuario a una solicitud real.",
        },
      ],
      ctaTitle: "Solicita tu charter privado en jet",
      ctaText:
        "Comparte tu ruta, fecha y numero de pasajeros para recibir una propuesta charter a la medida.",
      audience: ["Viajeros ejecutivos", "Salidas urgentes", "Viajes corporativos"],
    },
    en: {
      title: "Private Jet Charter",
      description:
        "Premium private jet charter in Mexico with executive support, flexible scheduling, and personalized flight coordination.",
      heroIntro:
        "This page is dedicated to private jet charter only, giving flight requests a focused destination instead of mixing charter with aircraft sales or broader aviation topics.",
      ctaTitle: "Request your private jet charter",
      ctaText:
        "Share your route, date, and passenger count to receive a tailored charter proposal.",
      audience: ["Executive travelers", "Urgent departures", "Corporate travel"],
    },
  },
  "sell-your-aircraft": {
    es: {
      title: "Vende tu Aeronave",
      seoTitle: "Venta de Aeronaves | Sky Group Aviation",
      seoDescription:
        "Adquisicion, venta y asesoria estrategica de aeronaves con alcance global, compradores calificados y ejecucion confidencial.",
      description:
        "Adquisicion, venta y asesoria estrategica de aeronaves con alcance global, compradores calificados y ejecucion confidencial.",
      heroKicker: "Advisory y transacciones aeronauticas",
      heroTitle: "Adquisicion de aeronaves, venta y asesoria estrategica",
      heroIntro:
        "Estructuramos, posicionamos y ejecutamos transacciones aeronauticas de alto valor a traves de Mexico, LATAM y mercados globales.",
      heroImage: "/images/CompraVenta/Compraventa2.png",
      heroVideo: "/images/Home/home2.mp4",
      heroStats: [
        { value: "+120", label: "Operaciones estructuradas en procesos de compra, venta y evaluacion" },
        { value: "LATAM / USA", label: "Cobertura para oportunidades transfronterizas y alcance regional" },
        { value: "Red privada", label: "Acceso a compradores calificados, operadores y decision makers" },
      ],
      heroHighlights: [
        "+120 operaciones estructuradas",
        "Cobertura LATAM / USA",
        "Red privada de aviacion",
      ],
      primaryCtaLabel: "Vender mi aeronave",
      secondaryCtaLabel: "Solicitar vuelo",
      hideHeroInstantQuote: true,
      hideHeroContact: true,
      sections: [
        {
          title: "Pensado para transacciones aeronauticas complejas",
          summary:
            "Vamos mas alla del brokerage tradicional con analisis estructurado, validacion tecnica y ejecucion estrategica para operaciones de alto valor.",
          highlights: ["Estructuracion de transacciones", "Validacion tecnica", "Ejecucion de la operacion"],
          paragraphs: [
            "Cuando una aeronave entra a mercado, la percepcion del activo, el momento comercial y la calidad del proceso importan tanto como el precio. Por eso la propuesta no se limita a publicar una ficha o esperar consultas dispersas. Trabajamos el posicionamiento del activo, la narrativa comercial, la estructura de informacion y la coordinacion necesaria para que la conversacion avance con mayor seriedad.",
            "El objetivo es que propietarios, compradores y equipos internos operen con mas claridad desde el principio. Esa combinacion entre estrategia comercial, lectura tecnica y control de proceso eleva la percepcion internacional de la operacion y reduce friccion en las etapas mas sensibles del deal.",
          ],
        },
        {
          title: "Step 1 - Definir estrategia",
          kicker: "Timeline",
          summary:
            "Alineamos si la prioridad es adquisicion, venta o reposicionamiento del activo antes de salir a mercado.",
          highlights: ["Objetivo comercial", "Estrategia de salida", "Posicionamiento de portafolio"],
          paragraphs: [
            "La primera etapa consiste en entender el tipo de operacion, el contexto del activo y la urgencia real del propietario o comprador. No todas las aeronaves deben salir al mercado del mismo modo, ni todo mandato necesita el mismo nivel de exposicion.",
            "Definir la estrategia correcta desde el inicio permite ordenar el precio objetivo, la ventana de tiempo, el nivel de confidencialidad y el tipo de outreach que conviene ejecutar.",
          ],
        },
        {
          title: "Step 2 - Evaluar aeronave",
          kicker: "Timeline",
          summary:
            "Revisamos validacion comercial y tecnica para sostener mejor la propuesta frente a compradores calificados.",
          highlights: ["Validacion comercial", "Revision tecnica", "Preparacion documental"],
          paragraphs: [
            "La lectura comercial del activo necesita convivir con una revision tecnica seria. Estado general, configuracion, historico, documentacion, situacion operativa y narrativa de mercado deben estar alineados para evitar debilidades innecesarias durante la negociacion.",
            "Esta etapa fortalece la calidad del deal porque permite presentar una oportunidad mejor estructurada y filtrar conversaciones que no tienen viabilidad real.",
          ],
        },
        {
          title: "Step 3 - Ejecutar transaccion",
          kicker: "Timeline",
          summary:
            "Coordinamos negociacion, estructuracion y cierre para mover la operacion con mayor control y menor friccion.",
          highlights: ["Deal execution", "Confidencialidad", "Cierre coordinado"],
          paragraphs: [
            "En la fase de ejecucion es donde mas valor aporta una plataforma con criterio comercial, operativo y documental. La meta no es solo acercar a las partes, sino sostener una ruta clara hacia terminos, revisiones, negociacion y cierre.",
            "Con una estructura correcta, el proceso se vuelve mas profesional para todos los involucrados y transmite la sensacion de una operacion internacional bien dirigida.",
          ],
        },
        {
          title: "Cobertura, tipos de aeronave y alcance de la red",
          kicker: "Data visual",
          summary:
            "Gestionamos oportunidades en distintos segmentos y regiones donde la confianza, la velocidad y la calidad del comprador importan mas.",
          highlights: ["Light Jet", "Midsize", "Cabin Class", "Mexico / LATAM / USA"],
          paragraphs: [
            "La cobertura operativa y comercial no se limita a una sola plaza. La oportunidad puede surgir desde Mexico, proyectarse hacia LATAM o involucrar alcance hacia Estados Unidos, dependiendo del tipo de activo y del perfil del comprador.",
            "Trabajar con una red privada de aviacion permite mover la transaccion con mejor foco sobre tipo de aeronave, tamano del deal y ventana comercial adecuada.",
          ],
        },
        {
          title: "Casos de referencia y oportunidades estructuradas",
          kicker: "Portfolio",
          summary:
            "Incluso sin exponer nombres, una pagina premium debe sugerir experiencia real en operaciones de distinto perfil.",
          highlights: ["Light Jet Acquisition - Mexico", "Corporate Aircraft Sale - LATAM", "Confidential Buyer Search - USA"],
          paragraphs: [
            "Mostrar referencias de operaciones o tipologias de mandato ayuda a transmitir profundidad sin romper confidencialidad. Ese equilibrio es especialmente valioso en aviacion privada, donde la discrecion es parte del servicio.",
            "La pagina gana autoridad cuando habla el lenguaje de operaciones reales: adquisicion, sale-side advisory, buyer qualification y coordinacion de cierre.",
          ],
        },
        {
          title: "Aviation Marketplace (Coming Soon)",
          kicker: "Vision SaaS",
          summary:
            "La siguiente capa de la plataforma puede integrar disponibilidad de activos, solicitudes en tiempo real y onboarding de operadores dentro de un entorno controlado.",
          highlights: ["Aircraft availability", "Real-time requests", "Operator integration"],
          paragraphs: [
            "Esta evolucion posiciona a Sky Group no solo como intermediario, sino como infraestructura aeronautica con una logica mas cercana a plataforma.",
            "Integrar market intelligence, visibilidad de oportunidades y flujos de operator onboarding fortalece la vision de una marca que mueve operaciones de alto valor con tecnologia y criterio comercial.",
          ],
        },
      ],
      ctaTitle: "Listo para comprar, vender o evaluar una aeronave?",
      ctaText:
        "Accede a oportunidades estructuradas, experiencia en aviacion privada, un proceso confidencial y una red de compradores calificados.",
      audience: ["Propietarios de aeronaves", "Compradores calificados", "Procesos confidenciales"],
    },
    en: {
      title: "Sell Your Aircraft",
      seoTitle: "Aircraft Sales & Strategic Advisory | Sky Group Aviation",
      description:
        "Aircraft acquisition, sales, and strategic advisory with global reach, qualified buyers, and a more structured transaction process.",
      heroKicker: "Aircraft sales and strategic advisory",
      heroTitle: "Aircraft Acquisition, Sales & Strategic Advisory",
      heroIntro:
        "We structure, position and execute high-value aviation transactions across Mexico, LATAM and global markets.",
      heroImage: "/images/CompraVenta/Compraventa2.png",
      heroVideo: "/images/Home/home2.mp4",
      heroStats: [
        { value: "+120", label: "Transactions structured across acquisition, sales, and evaluation mandates" },
        { value: "LATAM / USA", label: "Coverage for cross-border reach, buyer access, and regional execution" },
        { value: "Private network", label: "Qualified buyers and aviation relationships built for discretion" },
      ],
      heroHighlights: [
        "+120 Transactions Structured",
        "LATAM / USA Coverage",
        "Private Aviation Network",
      ],
      primaryCtaLabel: "Sell Your Aircraft",
      secondaryCtaLabel: "Request a Flight",
      hideHeroInstantQuote: true,
      hideHeroContact: true,
      sections: [
        {
          title: "Built for Complex Aviation Transactions",
          summary:
            "We go beyond brokerage by combining transaction structuring, technical validation, and strategic execution for high-value aviation deals.",
          highlights: ["Transaction Structuring", "Technical Validation", "Deal Execution"],
          paragraphs: [
            "When an aircraft enters the market, asset perception, timing, and deal quality matter as much as the asking price. The process cannot stop at publishing a listing and waiting for passive inquiries. It needs positioning, market narrative, structured information, and deliberate execution.",
            "That is what lifts the page from generic advisory language into a platform that feels international, controlled, and capable of handling more serious mandates.",
          ],
        },
        {
          title: "Step 1 - Define Strategy",
          kicker: "Timeline",
          summary:
            "Acquisition, sale, or portfolio positioning needs to be defined before the aircraft is pushed into the market.",
          highlights: ["Commercial objective", "Go-to-market strategy", "Portfolio positioning"],
          paragraphs: [
            "The first step is to frame the mandate correctly: sale-side advisory, acquisition support, or a broader portfolio positioning decision. Not every aircraft should be marketed the same way and not every owner needs the same level of exposure.",
            "Clear strategy creates better control over pricing expectations, timing, confidentiality, and outreach quality before the transaction advances.",
          ],
        },
        {
          title: "Step 2 - Evaluate Aircraft",
          kicker: "Timeline",
          summary:
            "Commercial and technical validation strengthen the opportunity before it reaches qualified buyers.",
          highlights: ["Commercial validation", "Technical review", "Documentation readiness"],
          paragraphs: [
            "Serious aircraft transactions need both market logic and technical credibility. Configuration, status, records, documentation, and operational condition all shape how buyers perceive the opportunity.",
            "This stage improves transaction quality because it filters weak conversations and supports a more credible, better-structured market position.",
          ],
        },
        {
          title: "Step 3 - Execute Transaction",
          kicker: "Timeline",
          summary:
            "Negotiation, structuring, and closing should move with more control, stronger discretion, and clearer coordination.",
          highlights: ["Deal execution", "Confidential process", "Coordinated closing"],
          paragraphs: [
            "Execution is where strategic advisory proves its value. The goal is not only to connect parties, but to move the process through negotiation, documentation, review, and closing without losing momentum.",
            "A controlled process gives the transaction a stronger international feel and reinforces confidence for owners, buyers, and counterparties.",
          ],
        },
        {
          title: "Coverage, aircraft types, and network reach",
          kicker: "Data visual",
          summary:
            "The platform can support opportunities across segments and regions where trust, speed, and buyer quality matter most.",
          highlights: ["Light Jet", "Midsize", "Cabin Class", "Mexico / LATAM / USA"],
          paragraphs: [
            "Our reach is not tied to a single city. Aircraft opportunities can start in Mexico, extend through LATAM, or align with buyer access into the United States depending on the asset and mandate.",
            "That network matters because stronger aviation relationships improve the way a deal is positioned, qualified, and executed.",
          ],
        },
        {
          title: "Reference cases and structured opportunities",
          kicker: "Portfolio",
          summary:
            "Even without naming clients, the page should signal real experience through the language of actual transactions.",
          highlights: ["Light Jet Acquisition - Mexico", "Corporate Aircraft Sale - LATAM", "Confidential Buyer Search - USA"],
          paragraphs: [
            "Reference cases help communicate depth without compromising discretion. In private aviation, that balance is part of the premium experience.",
            "The page gains authority when it speaks in terms of acquisition mandates, sale-side processes, buyer qualification, and closing coordination instead of generic consulting language.",
          ],
        },
        {
          title: "Aviation Marketplace (Coming Soon)",
          kicker: "SaaS vision",
          summary:
            "The next layer of the platform can connect aircraft availability, real-time requests, and operator integration inside one controlled environment.",
          highlights: ["Aircraft availability", "Real-time requests", "Operator integration"],
          paragraphs: [
            "This positions Sky Group beyond brokerage and closer to aviation infrastructure with a stronger platform narrative.",
            "Adding market intelligence, operator onboarding, and request flow visibility supports the long-term vision of a premium aviation marketplace.",
          ],
        },
      ],
      ctaTitle: "Ready to Buy, Sell or Evaluate an Aircraft?",
      ctaText:
        "Access structured opportunities and private aviation expertise through a confidential process and a qualified buyers network.",
      audience: ["Aircraft owners", "Qualified buyers", "Confidential mandates"],
    },
  },
  "renta-avion-ejecutivo-personalizado": {
    en: {
      title: "Personalized Executive Aircraft Rental",
      description:
        "Personalized executive aircraft rental in Mexico with options adapted to your route, passengers, and operational needs.",
    },
  },
  "precio-vuelo-privado-por-hora": {
    en: {
      title: "Private Flight Price per Hour in Mexico",
      description:
        "For flights within Mexico, average private flight pricing can range from USD $2,500 to $8,900 per flight hour depending on the selected aircraft model.",
      heroIntro:
        "For flights within Mexico, average private flight pricing can range from USD $2,500 to $8,900 per flight hour depending on the selected aircraft model. This page explains how that range changes according to route, aircraft category, and service level.",
      ctaTitle: "Request a clearer private flight quote",
      ctaText:
        "Share your route and passenger count to receive pricing aligned with the selected aircraft and estimated flight time.",
      audience: ["Price-aware travelers", "Hot leads", "Executive trips"],
    },
  },
  "renta-de-aviones-privados": {
    en: {
      title: "Private Aircraft Rental",
      description:
        "Private aircraft rental with complete service for business or leisure travel, premium support, and a direct path to quote your jet.",
      heroIntro:
        "Private aircraft rental with complete service for business or leisure travel, designed to give each client a stronger, more personalized experience from the first quote.",
      ctaTitle: "Quote your private jet",
      ctaText:
        "Send your route, date, and passenger count to receive a tailored proposal.",
      audience: ["Leisure travel", "Business travel", "Ready-to-quote users"],
    },
  },
  "vuelos-privados-para-reuniones": {
    en: {
      title: "Private Flights for Meetings",
      description:
        "We design private flights around your meetings, with fleet options such as Light Jet and Mid Size Jet for executive schedules that need real flexibility.",
      heroIntro:
        "We design private flights around your meetings. Fleet options such as Light Jet and Mid Size Jet help support executive schedules with stronger timing control and privacy.",
      ctaTitle: "Learn more about our fleet",
      ctaText:
        "Share your itinerary and we will help you choose the right aircraft category for your schedule.",
      audience: ["Executives", "Companies", "Business travel"],
    },
  },
  "como-viajar-en-jet-privado-en-mexico": {
    en: {
      title: "How to Travel by Private Jet in Mexico",
      description:
        "Learn how to travel by private jet in Mexico, what information you need to request a quote, and how to make the most of the experience.",
      heroIntro:
        "An educational article designed for readers who want to understand the private jet experience in Mexico before requesting a quote.",
      sections: [
        {
          title: "A practical guide for first-time private flyers",
          text:
            "This page helps explain the process in a clear way for readers comparing options, asking early questions, or planning a first charter experience.",
        },
        {
          title: "Built to turn interest into a real request",
          text:
            "It can be structured around simple steps, quote requirements, travel expectations, and a clear invitation to speak with the team.",
        },
        {
          title: "Why this page matters",
          text:
            "It answers high-intent questions with clearer language, a stronger sales path, and more relevance for premium travelers looking for private aviation in Mexico.",
        },
      ],
      ctaTitle: "Start planning your private trip",
      ctaText:
        "Talk to the team and receive guidance for your first or next private jet experience in Mexico.",
      audience: ["Content readers", "First-time buyers", "Curious travelers"],
    },
  },
  "diferencias-vuelo-privado-y-comercial": {
    en: {
      title: "Differences Between Private and Commercial Flights",
      description:
        "Understand the main differences between private and commercial flights so you can choose the right option for your trip.",
      heroIntro:
        "A comparison article built for readers evaluating whether private aviation fits their time, privacy, and travel priorities.",
      sections: [
        {
          title: "A comparison with real decision value",
          text:
            "This page helps explain the service difference without relying only on luxury language. It shows practical benefits such as time control, privacy, and flexibility.",
        },
        {
          title: "Useful for travelers still deciding",
          text:
            "It can cover schedules, airport experience, productivity, comfort, and route flexibility to help users make a more informed decision.",
        },
        {
          title: "Why this page matters",
          text:
            "It answers high-intent questions with clearer language, a stronger sales path, and more relevance for premium travelers looking for private aviation in Mexico.",
        },
      ],
      ctaTitle: "Compare and request your proposal",
      ctaText:
        "If private aviation already feels like the right fit, request a personalized proposal for your route and schedule.",
      audience: ["Comparing travelers", "Research stage", "High-intent readers"],
    },
  },
  "mejores-rutas-jet-privado-mexico": {
    en: {
      title: "Best Private Jet Routes in Mexico",
      description:
        "Explore the best private jet routes in Mexico for executive travel, premium getaways, and high-value private mobility.",
      heroIntro:
        "A route-focused article that combines inspiration with useful travel patterns for private aviation clients in Mexico.",
      sections: [
        {
          title: "A strong page for route discovery",
          text:
            "This content can connect readers with the most relevant business and leisure corridors while guiding them toward a real quote.",
        },
        {
          title: "Designed to connect interest with action",
          text:
            "It can present strong destinations and route profiles while naturally moving the visitor toward aircraft options and scheduling support.",
        },
        {
          title: "Why this page matters",
          text:
            "It answers high-intent questions with clearer language, a stronger sales path, and more relevance for premium travelers looking for private aviation in Mexico.",
        },
      ],
      ctaTitle: "Discover your next private route",
      ctaText:
        "Request personalized support to plan your next private flight in Mexico.",
      audience: ["Content readers", "Travel inspiration", "Premium routes"],
    },
  },
  "cuando-conviene-rentar-jet-privado": {
    en: {
      title: "When It Makes Sense to Rent a Private Jet",
      description:
        "Discover when renting a private jet makes sense and in which scenarios it delivers more value than other travel options.",
      heroIntro:
        "A practical article created to answer common objections and help readers decide whether private aviation fits their specific situation.",
      sections: [
        {
          title: "Strong content for answering objections",
          text:
            "This page helps transform uncertainty into clearer reasons to move forward when time, privacy, and flexibility really matter.",
        },
        {
          title: "A practical and commercial angle",
          text:
            "It can explain the situations where private aviation creates real value for business travel, family trips, and premium itineraries.",
        },
        {
          title: "Why this page matters",
          text:
            "It answers high-intent questions with clearer language, a stronger sales path, and more relevance for premium travelers looking for private aviation in Mexico.",
        },
      ],
      ctaTitle: "Evaluate your trip with an advisor",
      ctaText:
        "Share your travel needs and we will help you define whether a private jet is the right option.",
      audience: ["Evaluating clients", "Comparing options", "Practical readers"],
    },
  },
  "private-jet-travel-experience": {
    es: {
      title: "Experiencia de viaje en jet privado en Mexico",
      description:
        "Explora la experiencia de viajar en jet privado en Mexico, desde la planeacion personalizada hasta la comodidad premium y los horarios flexibles.",
      heroIntro:
        "Articulo en espanol pensado para usuarios que quieren entender la experiencia de aviacion privada en Mexico con un enfoque premium y practico.",
      sections: [
        {
          title: "Pensado para viajeros internacionales y premium",
          text:
            "Esta pagina amplia el alcance hacia viajeros que buscan privacidad, comodidad, servicio personalizado y una experiencia mas fluida en aeropuertos.",
        },
        {
          title: "Una narrativa premium con intencion comercial",
          text:
            "Permite destacar flexibilidad, privacidad, atencion personalizada y una experiencia de viaje mas exclusiva en Mexico.",
        },
        {
          title: "Por que esta pagina ayuda a convertir",
          text:
            "Responde dudas frecuentes, trabaja palabras clave con alta intencion comercial y acerca al usuario a una cotizacion real en lugar de dejarlo solo navegando.",
        },
      ],
      ctaTitle: "Solicita tu experiencia de vuelo privado",
      ctaText:
        "Comparte tu itinerario y recibe una propuesta personalizada para viajar en jet privado por Mexico.",
      audience: ["Viajeros internacionales", "Clientes premium", "Usuarios en exploracion"],
    },
  },
  "costo-jet-privado-mexico": {
    en: {
      title: "Cost of a Private Jet in Mexico",
      description:
        "Learn how much a private jet costs in Mexico and which variables change the final quote according to route, aircraft, and timing.",
    },
  },
  "cuanto-cuesta-cdmx-cancun-jet-privado": {
    en: {
      title: "How Much a Private Jet from CDMX to Cancun Costs",
      description:
        "Explore the estimated range for a private jet from Mexico City to Cancun and what shapes the quote on this premium route.",
    },
  },
  "como-comprar-avion-ejecutivo": {
    en: {
      title: "How to Buy an Executive Aircraft",
      description:
        "Learn how to buy an executive aircraft with clearer guidance on budget, mission fit, due diligence, and acquisition support.",
    },
  },
};

const slugifyPathSegment = (value = "") =>
  String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");

const buildLocalizedPath = (page, locale = "es") => {
  const localized = pageTranslations[page.slug]?.[locale];

  if (localized?.path) return localized.path;

  if (localized?.title) {
    const localizedSlug = slugifyPathSegment(localized.title);
    if (localizedSlug) return `/${localizedSlug}`;
  }

  return page.path;
};

export const resolveSeoPageForLocale = (page, locale = "es") => {
  if (!page) return undefined;

  const localized = pageTranslations[page.slug]?.[locale];
  if (!localized) return page;

  const localizedTitle = localized.title || page.title;
  const localizedCategory =
    categoryTranslations[page.category]?.[locale] || page.heroKicker || page.category;
  const localizedAudience = (localized.audience || page.audience || []).map(
    (item) => audienceTranslations[item]?.[locale] || item
  );

  return {
    ...page,
    ...localized,
    path: buildLocalizedPath(page, locale),
    heroKicker: localized.heroKicker || localizedCategory,
    heroTitle: localized.heroTitle || localizedTitle,
    heroIntro:
      localized.heroIntro ||
      page.heroIntroByLocale?.[locale] ||
      page.heroIntro,
    whatsappHref: locale === "en" ? whatsappHrefEn : page.whatsappHref,
    sections:
      page.sectionsByLocale?.[locale] ||
      localized.sections ||
      englishSectionTemplates[page.category] ||
      page.sections,
    ctaTitle:
      localized.ctaTitle ||
      page.ctaByLocale?.[locale]?.title ||
      page.ctaTitle,
    ctaText:
      localized.ctaText ||
      page.ctaByLocale?.[locale]?.text ||
      page.ctaText,
    audience: localizedAudience,
    faqs:
      localized.faqs ||
      page.faqsByLocale?.[locale] ||
      buildFaqs(localizedTitle, { article: "a" }, locale),
  };
};

export const getSeoPageBySlug = (slug) =>
  seoPages.find((page) => page.slug === slug);

export const getSeoPagePathForLocale = (pageOrSlug, locale = "es") => {
  const page =
    typeof pageOrSlug === "string" ? getSeoPageBySlug(pageOrSlug) : pageOrSlug;

  if (!page) return undefined;

  return buildLocalizedPath(page, locale);
};
