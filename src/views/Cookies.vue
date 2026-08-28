<template>
  <section class="cookies-page">
    <div class="cookies-hero">
      <div class="hero-content">
        <span>{{ content.heroTag }}</span>
        <h1>{{ content.heroTitle }}</h1>
      </div>
    </div>

    <div class="container">
      <div class="cookies-card">
        <p class="company-name">{{ content.companyName }}</p>
        <p class="site-name">{{ content.siteLabel }}</p>
        <div class="update">{{ content.updated }}</div>

        <section v-for="section in content.sections" :key="section.title" class="cookies-section">
          <h2>{{ section.title }}</h2>

          <template v-for="(block, index) in section.blocks" :key="`${section.title}-${index}`">
            <p v-if="block.type === 'paragraph'">{{ block.text }}</p>

            <ul v-else-if="block.type === 'list'">
              <li v-for="item in block.items" :key="item">{{ item }}</li>
            </ul>

            <div v-else-if="block.type === 'cookie-table'" class="cookie-table">
              <div class="cookie-table__head">
                <span v-for="column in block.columns" :key="column">{{ column }}</span>
              </div>
              <div v-for="row in block.rows" :key="row.name" class="cookie-table__row">
                <span>{{ row.name }}</span>
                <span>{{ row.provider }}</span>
                <span>{{ row.type }}</span>
                <span>{{ row.purpose }}</span>
                <span>{{ row.domain }}</span>
                <span>{{ row.duration }}</span>
              </div>
            </div>
          </template>
        </section>

        <h5>{{ content.copyright }}</h5>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useLocale } from "../i18n";

const { locale } = useLocale();

const content = computed(() =>
  locale.value === "en"
    ? {
        heroTag: "Legal Documentation",
        heroTitle: "Cookie Policy",
        companyName: "RED SKY GROUP, S.A. DE C.V.",
        siteLabel: "Website: redskyg.com",
        updated: "Last updated: August 27, 2026",
        copyright: "© 2026 RED SKY GROUP. All rights reserved.",
        sections: [
          {
            title: "1. Purpose",
            blocks: [
              {
                type: "paragraph",
                text: "This Cookie Policy informs users of the website redskyg.com about the use of cookies and similar technologies that may be used while browsing the site.",
              },
              {
                type: "paragraph",
                text: "This Policy forms part of RED SKY GROUP's privacy framework and should be read together with the Comprehensive Privacy Notice available on the website.",
              },
            ],
          },
          {
            title: "2. What Are Cookies?",
            blocks: [
              {
                type: "paragraph",
                text: "Cookies are small data files that a website may store in a user's browser or device when visiting a page.",
              },
              {
                type: "paragraph",
                text: "Cookies can help recognize technical aspects of browsing, preserve session information, and generate usage statistics about the website.",
              },
              {
                type: "paragraph",
                text: "The cookies currently identified on redskyg.com include analytical, measurement, and technical session cookies, including cookies associated with Google Analytics / Google Analytics 4 and site protection or session mechanisms.",
              },
            ],
          },
          {
            title: "3. Cookies Currently Identified",
            blocks: [
              {
                type: "paragraph",
                text: "According to the technical review available for the website, the following cookies are currently identified:",
              },
              {
                type: "cookie-table",
                columns: ["Cookie", "Provider", "Type", "Purpose", "Domain", "Approximate Duration"],
                rows: [
                  {
                    name: "_cfuvid",
                    provider: "Cloudflare",
                    type: "Technical / security",
                    purpose: "Help identify trusted traffic and protect site availability.",
                    domain: ".redskyg.com",
                    duration: "Session / temporary",
                  },
                  {
                    name: "_ga",
                    provider: "Google Analytics / Google Analytics 4",
                    type: "Analytics / measurement",
                    purpose: "Distinguish users and generate navigation statistics.",
                    domain: ".redskyg.com",
                    duration: "Up to 2 years",
                  },
                  {
                    name: "_ga_N2HHEGEWVE",
                    provider: "Google Analytics / Google Analytics 4",
                    type: "Analytics / measurement",
                    purpose: "Maintain session-related information and measure interaction with the site.",
                    domain: ".redskyg.com",
                    duration: "Up to 2 years",
                  },
                  {
                    name: "_ga_NHH22YJXPR",
                    provider: "Google Analytics / Google Analytics 4",
                    type: "Analytics / measurement",
                    purpose: "Maintain session-related information and support site measurement configuration.",
                    domain: ".redskyg.com",
                    duration: "Up to 2 years",
                  },
                  {
                    name: "_gcl_au",
                    provider: "Google",
                    type: "Measurement / advertising support",
                    purpose: "Support conversion-related measurement where Google tools are configured.",
                    domain: ".redskyg.com",
                    duration: "Up to 3 months",
                  },
                  {
                    name: "red_aviation_session",
                    provider: "Website",
                    type: "Technical / session",
                    purpose: "Preserve the current session and support technical site functionality.",
                    domain: ".redskyg.com",
                    duration: "Session / temporary",
                  },
                ],
              },
            ],
          },
          {
            title: "4. Purpose of the Cookies",
            blocks: [
              {
                type: "paragraph",
                text: "The currently identified cookies mainly serve analytical, measurement, technical, and session purposes.",
              },
              {
                type: "paragraph",
                text: "Their use allows RED SKY GROUP to obtain statistical and technical information about website performance, such as visits, interaction with pages, general navigation behavior, session duration, site performance, viewed content, and aggregated usage metrics.",
              },
              {
                type: "paragraph",
                text: "This information helps RED SKY GROUP evaluate the website and improve its content, structure, security, and browsing experience.",
              },
            ],
          },
          {
            title: "5. Google Analytics",
            blocks: [
              {
                type: "paragraph",
                text: "The website currently uses Google Analytics / Google Analytics 4 as a measurement tool.",
              },
              {
                type: "paragraph",
                text: "Google Analytics is a Google analytics service that provides statistical information on how users interact with a website.",
              },
              {
                type: "paragraph",
                text: "Its use implies the processing of certain technical and browsing information according to the configuration implemented on the site and the terms applicable to Google services.",
              },
            ],
          },
          {
            title: "6. Advertising Cookies",
            blocks: [
              {
                type: "paragraph",
                text: "Based on the current technical information used to prepare this Policy, no advertising or marketing cookies have been declared beyond measurement-related tools currently identified on the website.",
              },
              {
                type: "paragraph",
                text: "If RED SKY GROUP later incorporates advertising, remarketing, social media, tracking pixels, or similar tools, this Policy will be updated before or at the time of implementation, as applicable.",
              },
            ],
          },
          {
            title: "7. Necessary Cookies",
            blocks: [
              {
                type: "paragraph",
                text: "In addition to analytical cookies, the technical operation of the website may require certain technological mechanisms necessary to provide services correctly.",
              },
              {
                type: "paragraph",
                text: "This Policy identifies the cookies currently detected and communicated by the technical manager of the website. If additional technical cookies are incorporated later, they should be documented and added to this Policy.",
              },
            ],
          },
          {
            title: "8. Management and Disabling of Cookies",
            blocks: [
              {
                type: "paragraph",
                text: "Users may configure their browser to accept, reject, or delete cookies. Available options depend on the browser and device used.",
              },
              {
                type: "paragraph",
                text: "Disabling certain cookies may affect some features or characteristics of the website.",
              },
            ],
          },
          {
            title: "9. Changes to the Cookies Used",
            blocks: [
              {
                type: "paragraph",
                text: "RED SKY GROUP may modify the technological tools used on its website.",
              },
              {
                type: "paragraph",
                text: "If new categories of cookies or technologies are incorporated and materially affect information processing, RED SKY GROUP will update this Policy.",
              },
            ],
          },
          {
            title: "10. Relationship with the Privacy Notice",
            blocks: [
              {
                type: "paragraph",
                text: "This Cookie Policy complements the Comprehensive Privacy Notice of RED SKY GROUP, S.A. DE C.V.",
              },
              {
                type: "paragraph",
                text: "Comprehensive Privacy Notice: ________________________________________________________________",
              },
            ],
          },
          {
            title: "11. Contact",
            blocks: [
              {
                type: "paragraph",
                text: "For any questions related to this Cookie Policy or the processing of information derived from the use of the website:",
              },
              { type: "paragraph", text: "RED SKY GROUP, S.A. DE C.V." },
              { type: "paragraph", text: "Email: legal@redskyg.com" },
              { type: "paragraph", text: "Phone: +52 55 8618 6576" },
            ],
          },
          {
            title: "12. Acceptance",
            blocks: [
              {
                type: "paragraph",
                text: "By continuing to browse the website, the user may use the available functions according to the cookie settings of their browser and any management tools that RED SKY GROUP may implement.",
              },
              {
                type: "paragraph",
                text: "The use of the website is also subject to the Terms and Conditions and the Privacy Notice published on the site.",
              },
            ],
          },
        ],
      }
    : {
        heroTag: "Documentacion legal",
        heroTitle: "Politica de Cookies",
        companyName: "RED SKY GROUP, S.A. DE C.V.",
        siteLabel: "Sitio web: redskyg.com",
        updated: "Fecha de ultima actualizacion: 27 de agosto de 2026",
        copyright: "© 2026 RED SKY GROUP. Todos los derechos reservados.",
        sections: [
          {
            title: "1. Objeto",
            blocks: [
              {
                type: "paragraph",
                text: "La presente Politica de Cookies tiene por objeto informar a las personas usuarias del sitio web redskyg.com sobre el uso de cookies y tecnologias similares que pueden utilizarse durante su navegacion.",
              },
              {
                type: "paragraph",
                text: "Esta Politica forma parte de las politicas de privacidad de RED SKY GROUP, S.A. DE C.V. y debera interpretarse conjuntamente con el Aviso de Privacidad Integral disponible en el sitio web.",
              },
            ],
          },
          {
            title: "2. Que son las cookies?",
            blocks: [
              {
                type: "paragraph",
                text: "Las cookies son pequenos archivos de informacion que un sitio web puede almacenar en el navegador o dispositivo de una persona usuaria cuando esta visita una pagina.",
              },
              {
                type: "paragraph",
                text: "Las cookies permiten, entre otras funciones, reconocer determinadas caracteristicas tecnicas de la navegacion, mantener informacion relacionada con una sesion y obtener estadisticas sobre la utilizacion del sitio.",
              },
              {
                type: "paragraph",
                text: "Las cookies actualmente identificadas en redskyg.com incluyen cookies analiticas, de medicion, tecnicas y de sesion, incluyendo cookies asociadas con Google Analytics / Google Analytics 4 y mecanismos de proteccion o sesion del propio sitio.",
              },
            ],
          },
          {
            title: "3. Cookies utilizadas actualmente",
            blocks: [
              {
                type: "paragraph",
                text: "De acuerdo con la revision tecnica disponible para el sitio web, actualmente se encuentran identificadas las siguientes cookies:",
              },
              {
                type: "cookie-table",
                columns: ["Cookie", "Proveedor", "Tipo", "Finalidad", "Dominio", "Duracion aproximada"],
                rows: [
                  {
                    name: "_cfuvid",
                    provider: "Cloudflare",
                    type: "Tecnica / seguridad",
                    purpose: "Ayudar a identificar trafico confiable y proteger la disponibilidad del sitio.",
                    domain: ".redskyg.com",
                    duration: "Sesion / temporal",
                  },
                  {
                    name: "_ga",
                    provider: "Google Analytics / Google Analytics 4",
                    type: "Analitica / medicion",
                    purpose: "Distinguir usuarios y generar estadisticas de navegacion.",
                    domain: ".redskyg.com",
                    duration: "Hasta 2 anos",
                  },
                  {
                    name: "_ga_N2HHEGEWVE",
                    provider: "Google Analytics / Google Analytics 4",
                    type: "Analitica / medicion",
                    purpose: "Mantener informacion relacionada con la sesion y medir la interaccion con el sitio.",
                    domain: ".redskyg.com",
                    duration: "Hasta 2 anos",
                  },
                  {
                    name: "_ga_NHH22YJXPR",
                    provider: "Google Analytics / Google Analytics 4",
                    type: "Analitica / medicion",
                    purpose: "Mantener informacion relacionada con la sesion y apoyar la configuracion de medicion del sitio.",
                    domain: ".redskyg.com",
                    duration: "Hasta 2 anos",
                  },
                  {
                    name: "_gcl_au",
                    provider: "Google",
                    type: "Medicion / soporte publicitario",
                    purpose: "Apoyar medicion relacionada con conversiones cuando existan herramientas de Google configuradas.",
                    domain: ".redskyg.com",
                    duration: "Hasta 3 meses",
                  },
                  {
                    name: "red_aviation_session",
                    provider: "Sitio web",
                    type: "Tecnica / sesion",
                    purpose: "Conservar la sesion actual y apoyar el funcionamiento tecnico del sitio.",
                    domain: ".redskyg.com",
                    duration: "Sesion / temporal",
                  },
                ],
              },
            ],
          },
          {
            title: "4. Finalidad de las cookies",
            blocks: [
              {
                type: "paragraph",
                text: "Las cookies actualmente identificadas en el sitio tienen principalmente una finalidad analitica, de medicion, tecnica y de sesion.",
              },
              {
                type: "paragraph",
                text: "Su utilizacion permite a RED SKY GROUP obtener informacion estadistica y tecnica sobre el funcionamiento y utilizacion del sitio, por ejemplo: numero de visitas; interaccion con las paginas; comportamiento general de navegacion; duracion de las sesiones; rendimiento del sitio; contenido consultado; y metricas agregadas de utilizacion.",
              },
              {
                type: "paragraph",
                text: "Esta informacion permite a RED SKY GROUP evaluar el funcionamiento del sitio web y mejorar su contenido, estructura, seguridad y experiencia de navegacion.",
              },
            ],
          },
          {
            title: "5. Google Analytics",
            blocks: [
              {
                type: "paragraph",
                text: "El sitio web utiliza actualmente Google Analytics / Google Analytics 4 como herramienta de medicion.",
              },
              {
                type: "paragraph",
                text: "Google Analytics es un servicio de analisis proporcionado por Google que permite obtener informacion estadistica sobre la interaccion de las personas usuarias con un sitio web.",
              },
              {
                type: "paragraph",
                text: "La utilizacion de Google Analytics implica el tratamiento de determinada informacion tecnica y de navegacion conforme a la configuracion implementada en el sitio y a las condiciones aplicables al servicio de Google.",
              },
            ],
          },
          {
            title: "6. RED SKY GROUP utiliza cookies de publicidad?",
            blocks: [
              {
                type: "paragraph",
                text: "Actualmente, de acuerdo con la informacion tecnica utilizada para la elaboracion de esta Politica, no se han declarado cookies de publicidad o marketing distintas de las herramientas de medicion actualmente identificadas en el sitio web.",
              },
              {
                type: "paragraph",
                text: "En caso de que RED SKY GROUP incorpore posteriormente herramientas de publicidad, remarketing, redes sociales, pixeles de seguimiento u otras tecnologias similares, esta Politica sera actualizada antes o al momento de su implementacion, segun corresponda.",
              },
            ],
          },
          {
            title: "7. Cookies necesarias",
            blocks: [
              {
                type: "paragraph",
                text: "Ademas de las cookies analiticas identificadas, el funcionamiento tecnico del sitio podria requerir determinados mecanismos tecnologicos necesarios para proporcionar correctamente determinados servicios.",
              },
              {
                type: "paragraph",
                text: "La presente Politica identifica las cookies actualmente detectadas y comunicadas por el responsable tecnico del sitio. Si posteriormente se incorporan cookies tecnicas adicionales, deberan documentarse y actualizarse en esta Politica.",
              },
            ],
          },
          {
            title: "8. Gestion y desactivacion de cookies",
            blocks: [
              {
                type: "paragraph",
                text: "La persona usuaria puede configurar su navegador para aceptar, rechazar o eliminar cookies. Las opciones disponibles dependeran del navegador y dispositivo utilizados.",
              },
              {
                type: "paragraph",
                text: "La desactivacion de determinadas cookies puede afectar algunas funciones o caracteristicas del sitio web.",
              },
            ],
          },
          {
            title: "9. Cambios en las cookies utilizadas",
            blocks: [
              {
                type: "paragraph",
                text: "RED SKY GROUP podra modificar las herramientas tecnologicas utilizadas en su sitio web.",
              },
              {
                type: "paragraph",
                text: "En caso de incorporar nuevas categorias de cookies o tecnologias que impliquen modificaciones relevantes en el tratamiento de informacion, RED SKY GROUP actualizara la presente Politica.",
              },
            ],
          },
          {
            title: "10. Relacion con el aviso de privacidad",
            blocks: [
              {
                type: "paragraph",
                text: "La presente Politica de Cookies complementa el Aviso de Privacidad Integral de RED SKY GROUP, S.A. DE C.V.",
              },
              {
                type: "paragraph",
                text: "Aviso de Privacidad Integral: ________________________________________________________________",
              },
            ],
          },
          {
            title: "11. Contacto",
            blocks: [
              {
                type: "paragraph",
                text: "Para cualquier duda relacionada con esta Politica de Cookies o con el tratamiento de informacion derivado del uso del sitio web:",
              },
              { type: "paragraph", text: "RED SKY GROUP, S.A. DE C.V." },
              { type: "paragraph", text: "Correo electronico: legal@redskyg.com" },
              { type: "paragraph", text: "Telefono: +52 55 8618 6576" },
            ],
          },
          {
            title: "12. Aceptacion",
            blocks: [
              {
                type: "paragraph",
                text: "Al continuar navegando en el sitio web, la persona usuaria podra utilizar las funciones disponibles conforme a la configuracion de cookies de su navegador y a las herramientas de gestion que, en su caso, sean implementadas por RED SKY GROUP.",
              },
              {
                type: "paragraph",
                text: "La utilizacion del sitio web se encuentra ademas sujeta a los Terminos y Condiciones y al Aviso de Privacidad publicados en el sitio.",
              },
            ],
          },
        ],
      }
);
</script>

<style scoped>
.cookies-page {
  background: #0f1720;
  color: #e5e7eb;
}

.cookies-hero {
  position: relative;
  height: 72vh;
  background-image: url("https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1600");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.cookies-hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(5, 13, 23, 0.68) 0%, rgba(5, 13, 23, 0.48) 34%, rgba(5, 13, 23, 0.2) 62%, rgba(5, 13, 23, 0.38) 100%),
    linear-gradient(180deg, rgba(5, 13, 23, 0.08), rgba(5, 13, 23, 0.28));
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: white;
}

.hero-content span {
  letter-spacing: 3px;
  font-size: 12px;
  color: #c8a45d;
  text-transform: uppercase;
}

.hero-content h1 {
  font-size: 36px;
  margin-top: 15px;
}

.container {
  max-width: 1100px;
  margin: auto;
  padding: 80px 20px;
}

.cookies-card {
  background: #131c26;
  padding: 50px;
  border-radius: 12px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
}

.company-name,
.site-name {
  margin: 0;
}

.company-name {
  color: #c8a45d;
  font-size: 0.95rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.site-name {
  margin-top: 0.6rem;
  opacity: 0.8;
}

.cookies-section + .cookies-section {
  margin-top: 2.2rem;
}

.cookies-card h2 {
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 22px;
  color: #ffffff;
}

.cookies-card p {
  margin-bottom: 15px;
  line-height: 1.8;
  opacity: 0.9;
}

.cookies-card ul {
  margin-left: 20px;
  margin-bottom: 20px;
}

.cookies-card li {
  margin-bottom: 8px;
  line-height: 1.7;
}

.cookie-table {
  margin-top: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  overflow: hidden;
}

.cookie-table__head,
.cookie-table__row {
  display: grid;
  grid-template-columns: 1.1fr 1.2fr 1fr 1.8fr 1fr 1fr;
  gap: 1rem;
  padding: 1rem 1.1rem;
}

.cookie-table__head {
  background: rgba(200, 164, 93, 0.14);
  color: #f3deb0;
  font-size: 0.8rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.cookie-table__row {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.cookies-card h5 {
  text-align: center;
  margin-top: 2rem;
  opacity: 0.75;
}

.update {
  margin-top: 0.85rem;
  margin-bottom: 2rem;
  font-size: 14px;
  opacity: 0.6;
}

@media (max-width: 900px) {
  .cookie-table__head,
  .cookie-table__row {
    grid-template-columns: 1fr;
  }

  .cookie-table__head {
    display: none;
  }

  .cookie-table__row span {
    display: block;
  }
}

@media (max-width: 768px) {
  .cookies-card {
    padding: 30px;
  }

  .hero-content h1 {
    font-size: 28px;
  }
}
</style>
