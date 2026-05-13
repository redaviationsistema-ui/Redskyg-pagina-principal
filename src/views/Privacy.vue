<template>
  <section class="privacy-page">
    <div class="privacy-hero">
      <div class="hero-content">
        <span>{{ content.heroTag }}</span>
        <h1>{{ content.heroTitle }}</h1>
      </div>
    </div>

    <div class="container">
      <div class="privacy-card">
        <h2>{{ content.sections.controller.title }}</h2>
        <p>{{ content.sections.controller.body[0] }}</p>
        <p>{{ content.sections.controller.body[1] }}</p>

        <h2>{{ content.sections.categories.title }}</h2>
        <p>{{ content.sections.categories.intro }}</p>
        <ul>
          <li v-for="item in content.sections.categories.items" :key="item">{{ item }}</li>
        </ul>
        <p>{{ content.sections.categories.outro }}</p>

        <h2>{{ content.sections.purposes.title }}</h2>
        <p>{{ content.sections.purposes.intro }}</p>
        <ul>
          <li v-for="item in content.sections.purposes.items" :key="item">{{ item }}</li>
        </ul>

        <h2>{{ content.sections.legalBasis.title }}</h2>
        <p>{{ content.sections.legalBasis.body }}</p>

        <h2>{{ content.sections.transfers.title }}</h2>
        <p>{{ content.sections.transfers.body[0] }}</p>
        <p>{{ content.sections.transfers.body[1] }}</p>
        <p>{{ content.sections.transfers.intro }}</p>
        <ul>
          <li v-for="item in content.sections.transfers.items" :key="item">{{ item }}</li>
        </ul>

        <h2>{{ content.sections.rights.title }}</h2>
        <p>{{ content.sections.rights.body }}</p>

        <h2>{{ content.sections.authority.title }}</h2>
        <p>{{ content.sections.authority.body }}</p>

        <h2>{{ content.sections.law.title }}</h2>
        <p>{{ content.sections.law.body }}</p>

        <h2>{{ content.sections.changes.title }}</h2>
        <p>{{ content.sections.changes.body[0] }}</p>
        <p>{{ content.sections.changes.body[1] }}</p>

        <div class="update">{{ content.updated }}</div>
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
        heroTitle: "Privacy Notice for Passengers",
        updated: "Last updated: March 2026",
        copyright: "© 2026 REDSKYG. All rights reserved.",
        sections: {
          controller: {
            title: "Identity of the Data Controller",
            body: [
              'RED SKY GROUP LLC (hereinafter, "RED SKY GROUP"), a limited liability company duly organized under the laws of the United States of America, acts as the data controller with respect to the personal data collected through this website and in connection with the coordination and management of aviation-related services.',
              "RED SKY GROUP operates internationally and coordinates services that may take place in different jurisdictions, including Mexico. This Privacy Notice is issued in accordance with applicable data protection laws, particularly where services, flights, or passengers are connected to Mexican territory.",
            ],
          },
          categories: {
            title: "Categories of Personal Data Processed",
            intro:
              "To fulfill the purposes described in this Privacy Notice, RED SKY GROUP may collect and process the following categories of personal data:",
            items: [
              "Identification data;",
              "Contact information;",
              "Billing and financial data;",
              "Information contained in passports, visas, and other travel or immigration documents required for domestic or international flights.",
            ],
            outro: "RED SKY GROUP does not intentionally collect or process sensitive personal data.",
          },
          purposes: {
            title: "Primary Purposes of Processing",
            intro: "Personal data will be processed for the following primary purposes:",
            items: [
              "To coordinate, arrange, manage, and/or facilitate aviation services, air transportation, and related services;",
              "To determine the appropriate entity responsible for providing and, where applicable, billing the contracted services, depending on the place of purchase and execution of the flight;",
              "To manage billing, payment, and collection processes in compliance with applicable fiscal and legal requirements;",
              "To carry out the operational, administrative, and logistical management of flights;",
              "To verify that passengers hold the documentation required for domestic and international travel;",
              "To allow access to aircraft and airport facilities;",
              "To respond to requests or requirements from competent national or international authorities;",
              "To manage flight logs, customs, and immigration reports;",
              "To maintain communications and notifications related to flights;",
              "To prevent, detect, and mitigate potential fraud;",
              "To comply with applicable legal, regulatory, and aviation-related obligations.",
            ],
          },
          legalBasis: {
            title: "Legal Basis for Processing",
            body:
              "RED SKY GROUP processes personal data based on the data subject's express consent, which is deemed granted when personal information is provided for the purpose of contracting services, making payments, or traveling on aircraft coordinated or managed by RED SKY GROUP.",
          },
          transfers: {
            title: "Transfers of Personal Data",
            body: [
              "RED SKY GROUP LLC may share personal data, without requiring additional consent from the data subject, with independent third parties with whom it maintains commercial or collaborative relationships, including RED AVIATION COMPANY S.A. DE C.V., solely when necessary for the coordination, provision, or billing of the contracted services.",
              "In such cases, each entity shall be responsible for the processing of the personal data under its control, in accordance with applicable legislation and the purposes of the legal relationship it maintains with the data subject.",
            ],
            intro: "Personal data may also be transferred to:",
            items: [
              "Service providers supporting aviation, administrative, technological, or financial operations, subject to confidentiality obligations;",
              "National or international governmental authorities, including aviation, airport, customs, immigration, and tax authorities, where legally required.",
            ],
          },
          rights: {
            title: "Data Subject Rights",
            body:
              "Depending on the applicable jurisdiction, data subjects may exercise their rights of access, rectification, cancellation, objection, or equivalent rights recognized under applicable data protection laws. Requests may be submitted through the contact channels designated by RED SKY GROUP.",
          },
          authority: {
            title: "Data Protection Authority",
            body:
              "Where applicable, data subjects may contact the Mexican data protection authority, the National Institute for Transparency, Access to Information and Protection of Personal Data (INAI), if they consider their data protection rights have been violated.",
          },
          law: {
            title: "Applicable Law",
            body:
              "This Privacy Notice is governed by the Mexican Federal Law on the Protection of Personal Data Held by Private Parties, without prejudice to the application of other legal provisions that may be applicable, considering the international nature of RED SKY GROUP's operations.",
          },
          changes: {
            title: "Changes to this Privacy Notice",
            body: [
              "RED SKY GROUP reserves the right to amend or update this Privacy Notice at any time due to legislative changes, internal policies, new service requirements, or market practices.",
              "This Privacy Notice and any updates will be made available through RED SKY GROUP's official channels.",
            ],
          },
        },
      }
    : {
        heroTag: "Documentacion legal",
        heroTitle: "Aviso de Privacidad para Pasajeros",
        updated: "Ultima actualizacion: marzo 2026",
        copyright: "© 2026 REDSKYG. Todos los derechos reservados.",
        sections: {
          controller: {
            title: "Identidad del Responsable",
            body: [
              'RED SKY GROUP LLC (en lo sucesivo, "RED SKY GROUP"), sociedad de responsabilidad limitada debidamente constituida conforme a las leyes de los Estados Unidos de America, actua como responsable del tratamiento respecto de los datos personales recabados a traves de este sitio web y en relacion con la coordinacion y gestion de servicios aeronauticos.',
              "RED SKY GROUP opera internacionalmente y coordina servicios que pueden llevarse a cabo en distintas jurisdicciones, incluyendo Mexico. Este Aviso de Privacidad se emite de conformidad con la normativa aplicable en materia de proteccion de datos, particularmente cuando los servicios, vuelos o pasajeros se relacionan con territorio mexicano.",
            ],
          },
          categories: {
            title: "Categorias de Datos Personales Tratados",
            intro:
              "Para cumplir con las finalidades descritas en este Aviso de Privacidad, RED SKY GROUP puede recabar y tratar las siguientes categorias de datos personales:",
            items: [
              "Datos de identificacion;",
              "Datos de contacto;",
              "Datos de facturacion y financieros;",
              "Informacion contenida en pasaportes, visas y otros documentos de viaje o migratorios requeridos para vuelos nacionales o internacionales.",
            ],
            outro: "RED SKY GROUP no recaba ni trata intencionalmente datos personales sensibles.",
          },
          purposes: {
            title: "Finalidades Primarias del Tratamiento",
            intro: "Los datos personales seran tratados para las siguientes finalidades primarias:",
            items: [
              "Coordinar, organizar, administrar y/o facilitar servicios aeronauticos, transporte aereo y servicios relacionados;",
              "Determinar la entidad responsable de prestar y, en su caso, facturar los servicios contratados, segun el lugar de compra y de ejecucion del vuelo;",
              "Gestionar procesos de facturacion, pago y cobranza en cumplimiento de obligaciones fiscales y legales aplicables;",
              "Realizar la gestion operativa, administrativa y logistica de los vuelos;",
              "Verificar que los pasajeros cuenten con la documentacion requerida para viajes nacionales e internacionales;",
              "Permitir el acceso a aeronaves e instalaciones aeroportuarias;",
              "Atender solicitudes o requerimientos de autoridades nacionales o internacionales competentes;",
              "Administrar bitacoras de vuelo, reportes aduanales y migratorios;",
              "Mantener comunicaciones y notificaciones relacionadas con los vuelos;",
              "Prevenir, detectar y mitigar posibles fraudes;",
              "Cumplir con obligaciones legales, regulatorias y aeronauticas aplicables.",
            ],
          },
          legalBasis: {
            title: "Base Legal del Tratamiento",
            body:
              "RED SKY GROUP trata los datos personales con base en el consentimiento expreso del titular, el cual se entendera otorgado cuando proporcione informacion personal con el fin de contratar servicios, realizar pagos o viajar en aeronaves coordinadas o administradas por RED SKY GROUP.",
          },
          transfers: {
            title: "Transferencias de Datos Personales",
            body: [
              "RED SKY GROUP LLC podra compartir datos personales, sin requerir consentimiento adicional del titular, con terceros independientes con quienes mantenga relaciones comerciales o de colaboracion, incluyendo RED AVIATION COMPANY S.A. DE C.V., exclusivamente cuando ello sea necesario para la coordinacion, prestacion o facturacion de los servicios contratados.",
              "En esos casos, cada entidad sera responsable del tratamiento de los datos personales bajo su control, conforme a la legislacion aplicable y a las finalidades de la relacion juridica que mantenga con el titular.",
            ],
            intro: "Los datos personales tambien podran transferirse a:",
            items: [
              "Proveedores de servicios que apoyen operaciones aeronauticas, administrativas, tecnologicas o financieras, sujetos a obligaciones de confidencialidad;",
              "Autoridades gubernamentales nacionales o internacionales, incluidas autoridades aeronauticas, aeroportuarias, aduanales, migratorias y fiscales, cuando exista requerimiento legal.",
            ],
          },
          rights: {
            title: "Derechos del Titular",
            body:
              "Dependiendo de la jurisdiccion aplicable, los titulares podran ejercer sus derechos de acceso, rectificacion, cancelacion, oposicion o sus equivalentes reconocidos por la normativa de proteccion de datos aplicable. Las solicitudes podran presentarse a traves de los canales de contacto designados por RED SKY GROUP.",
          },
          authority: {
            title: "Autoridad de Proteccion de Datos",
            body:
              "Cuando resulte aplicable, los titulares podran acudir ante la autoridad mexicana de proteccion de datos, el Instituto Nacional de Transparencia, Acceso a la Informacion y Proteccion de Datos Personales (INAI), si consideran que sus derechos han sido vulnerados.",
          },
          law: {
            title: "Ley Aplicable",
            body:
              "Este Aviso de Privacidad se rige por la Ley Federal de Proteccion de Datos Personales en Posesion de los Particulares en Mexico, sin perjuicio de la aplicacion de otras disposiciones legales que pudieran resultar aplicables, considerando la naturaleza internacional de las operaciones de RED SKY GROUP.",
          },
          changes: {
            title: "Cambios a este Aviso de Privacidad",
            body: [
              "RED SKY GROUP se reserva el derecho de modificar o actualizar este Aviso de Privacidad en cualquier momento derivado de cambios legislativos, politicas internas, nuevos requerimientos de servicio o practicas del mercado.",
              "Este Aviso de Privacidad y sus actualizaciones estaran disponibles a traves de los canales oficiales de RED SKY GROUP.",
            ],
          },
        },
      }
);
</script>

<style scoped>
.privacy-page {
  background: #0f1720;
  color: #e5e7eb;
}

.privacy-hero {
  position: relative;
  height: 74vh;
  background-image: url("https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1600");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.privacy-hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(5, 10, 20, 0.85),
    rgba(5, 10, 20, 0.95)
  );
  z-index: 0;
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
  max-width: 1000px;
  margin: auto;
  padding: 80px 20px;
}

.privacy-card {
  background: #131c26;
  padding: 50px;
  border-radius: 12px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
}

.privacy-card h2 {
  margin-top: 40px;
  margin-bottom: 15px;
  font-size: 22px;
  color: #ffffff;
}

.privacy-card p {
  margin-bottom: 15px;
  line-height: 1.8;
  opacity: 0.9;
}

.privacy-card ul {
  margin-left: 20px;
  margin-bottom: 20px;
}

.privacy-card li {
  margin-bottom: 8px;
}

.privacy-card h5 {
  text-align: center;
  margin-top: 1rem;
  opacity: 0.75;
}

.update {
  margin-top: 50px;
  font-size: 14px;
  opacity: 0.6;
  text-align: center;
}

@media (max-width: 768px) {
  .privacy-card {
    padding: 30px;
  }

  .hero-content h1 {
    font-size: 28px;
  }
}
</style>
