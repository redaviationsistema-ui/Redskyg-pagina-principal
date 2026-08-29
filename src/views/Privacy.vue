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
        <p class="company-name">{{ content.companyName }}</p>
        <div class="update">{{ content.updated }}</div>

        <section v-for="section in content.sections" :key="section.title" class="privacy-section">
          <h2>{{ section.title }}</h2>

          <template v-for="(block, index) in section.blocks" :key="`${section.title}-${index}`">
            <p v-if="block.type === 'paragraph'">{{ block.text }}</p>
            <ul v-else-if="block.type === 'list'">
              <li v-for="item in block.items" :key="item">{{ item }}</li>
            </ul>
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
        heroTag: "Legal Information",
        heroTitle: "Comprehensive Privacy Notice",
        companyName: "RED SKY GROUP, S.A. DE C.V.",
        updated: "Last updated: August 27, 2026",
        copyright: "© 2026 RED SKY GROUP. All rights reserved.",
        sections: [
          {
            title: "Identity and Address of the Data Controller",
            blocks: [
              {
                type: "paragraph",
                text: 'In compliance with applicable Mexican data protection law, RED SKY GROUP, S.A. DE C.V. (hereinafter, "RED SKY GROUP") acts as the data controller for the personal data collected through this website and in connection with the aviation services it coordinates.',
              },
              { type: "paragraph", text: "Privacy and ARCO rights email: legal@redskyg.com" },
              { type: "paragraph", text: "Phone: +52 55 8618 6576" },
            ],
          },
          {
            title: "Personal Data That May Be Collected",
            blocks: [
              {
                type: "paragraph",
                text: "Depending on the requested service and the relationship with RED SKY GROUP, the following categories of personal data may be collected:",
              },
              {
                type: "list",
                items: [
                  "Identification data: full name, date of birth when necessary, nationality, sex or gender when necessary, signature, official identification, identification number, information contained in official documents, photograph contained in identification documents, and data needed to verify identity.",
                  "Contact data: address, email, phone number, mobile number, and emergency contact data when necessary for the operation.",
                  "Aviation service data: passenger names, itinerary information, origin and destination airports, flight dates and times, reservation information, migration and travel information, passport data, visas and travel permits when needed, baggage information, information related to pets or service animals, and special passenger requirements.",
                ],
              },
              {
                type: "paragraph",
                text: "RED SKY GROUP will seek to limit requested information to what is appropriate, relevant, and necessary for the corresponding purposes.",
              },
            ],
          },
          {
            title: "Financial and Asset Data",
            blocks: [
              {
                type: "paragraph",
                text: "For contracting, invoicing, payment, and commercial compliance purposes, RED SKY GROUP may collect financial or asset-related data such as billing information, tax ID, tax certificate, banking data necessary to identify payments or make refunds, proof of payment, and information required for financial reconciliations.",
              },
              {
                type: "paragraph",
                text: "RED SKY GROUP will not request banking information through informal channels or ask for transfers to personal accounts of employees, representatives, intermediaries, or unauthorized third parties.",
              },
            ],
          },
          {
            title: "Sensitive Personal Data",
            blocks: [
              {
                type: "paragraph",
                text: "RED SKY GROUP will seek not to collect sensitive personal data unless strictly necessary for a legitimate, specific, and determined purpose related to service delivery or legal compliance.",
              },
              {
                type: "paragraph",
                text: "When sensitive data is required, RED SKY GROUP will observe applicable legal duties and obtain the required consent when necessary.",
              },
            ],
          },
          {
            title: "Primary Purposes of Processing",
            blocks: [
              {
                type: "list",
                items: [
                  "Respond to information requests, quotations, and service inquiries.",
                  "Prepare contracts, formalize operations, verify information, and administer commercial relationships.",
                  "Coordinate flights, itineraries, aircraft, passengers, crew, airports, helipads, FBOs, permits, and third-party services.",
                  "Comply with operational safety, airport, authority, and procedural requirements.",
                  "Handle invoicing, collections, reconciliations, refunds where applicable, accounting, audits, and tax compliance.",
                  "Comply with legal and regulatory obligations and respond to competent authorities.",
                ],
              },
            ],
          },
          {
            title: "Secondary Purposes of Processing",
            blocks: [
              {
                type: "paragraph",
                text: "RED SKY GROUP may also use personal data for commercial information, promotions, news, new services, invitations, satisfaction surveys, customer experience evaluations, and marketing communications.",
              },
              {
                type: "paragraph",
                text: "The data subject may object to these secondary purposes through the contact channels described in this notice.",
              },
            ],
          },
          {
            title: "Transfers of Personal Data",
            blocks: [
              {
                type: "paragraph",
                text: "To fulfill the purposes described in this notice, RED SKY GROUP may transfer personal data to third parties involved in the operation, including operators, aircraft owners, charter companies, helicopter providers, crew, handling companies, FBOs, airports, helipads, aviation, migration, customs, tax, judicial, or administrative authorities, and providers of ground transport, lodging, catering, concierge, security, and technological services.",
              },
              {
                type: "paragraph",
                text: "Transfers will be limited to the information necessary for the corresponding purpose and carried out under applicable law.",
              },
            ],
          },
          {
            title: "ARCO Rights and Contact",
            blocks: [
              {
                type: "paragraph",
                text: "The data subject may exercise rights of access, rectification, cancellation, and objection through: Email: legal@redskyg.com",
              },
              {
                type: "paragraph",
                text: "Requests must include the data subject's name, means to receive a response, proof of identity, the right to be exercised, and a clear description of the requested action.",
              },
            ],
          },
          {
            title: "Changes to This Notice",
            blocks: [
              {
                type: "paragraph",
                text: "RED SKY GROUP may update this Privacy Notice due to legal, regulatory, corporate, operational, or technological changes.",
              },
              {
                type: "paragraph",
                text: "Privacy Notice URL: ________________________________________________________________",
              },
            ],
          },
        ],
      }
    : {
        heroTag: "Informacion legal",
        heroTitle: "Aviso de Privacidad Integral",
        companyName: "RED SKY GROUP, S.A. DE C.V.",
        updated: "Fecha de ultima actualizacion: 27 de agosto de 2026",
        copyright: "© 2026 RED SKY GROUP. Todos los derechos reservados.",
        sections: [
          {
            title: "I. Identidad y domicilio del responsable",
            blocks: [
              {
                type: "paragraph",
                text: 'En cumplimiento de la Ley Federal de Proteccion de Datos Personales en Posesion de los Particulares y demas disposiciones aplicables, RED SKY GROUP, S.A. DE C.V. (en adelante, "RED SKY GROUP"), en su caracter de responsable del tratamiento de los datos personales, informa a las personas titulares la forma en que recaba, utiliza, conserva, protege y, en su caso, comunica sus datos personales.',
              },
              {
                type: "paragraph",
                text: "Correo electronico para asuntos de privacidad y ejercicio de derechos ARCO: legal@redskyg.com",
              },
              { type: "paragraph", text: "Telefono: +52 55 8618 6576" },
            ],
          },
          {
            title: "II. Datos personales que podran ser recabados",
            blocks: [
              {
                type: "paragraph",
                text: "Dependiendo de la naturaleza de la relacion con RED SKY GROUP y del servicio solicitado, podremos recabar las siguientes categorias de datos personales:",
              },
              {
                type: "list",
                items: [
                  "A. Datos de identificacion: nombre completo; fecha de nacimiento, cuando resulte necesaria; nacionalidad; sexo o genero, cuando resulte necesario; firma; identificacion oficial; numero de identificacion; informacion contenida en documentos oficiales; fotografia contenida en documentos de identificacion; y datos necesarios para verificar la identidad.",
                  "B. Datos de contacto: domicilio; correo electronico; numero telefonico; numero de telefono movil; y datos de contacto de emergencia, cuando sean necesarios para la operacion.",
                  "C. Datos relacionados con la prestacion de servicios de aviacion: nombre de pasajeros; informacion de itinerario; aeropuertos de origen y destino; fechas y horarios de vuelo; informacion necesaria para reservas; informacion migratoria y/o de viaje; informacion de pasaporte; visas y permisos de viaje, cuando resulten necesarios; informacion relacionada con equipaje; informacion relacionada con mascotas o animales de servicio; y requerimientos especiales del pasajero.",
                ],
              },
              {
                type: "paragraph",
                text: "RED SKY GROUP procurara limitar la informacion solicitada a aquella que resulte adecuada, relevante y necesaria para las finalidades correspondientes.",
              },
            ],
          },
          {
            title: "III. Datos financieros y patrimoniales",
            blocks: [
              {
                type: "paragraph",
                text: "Para efectos de contratacion, facturacion, pagos y cumplimiento de obligaciones derivadas de una relacion comercial, RED SKY GROUP podra recabar datos financieros o patrimoniales, incluyendo, segun corresponda: informacion de facturacion; RFC; constancia de situacion fiscal; datos bancarios necesarios para identificar pagos o realizar reembolsos; comprobantes de pago; informacion relacionada con facturacion; informacion necesaria para conciliaciones financieras; e informacion relacionada con operaciones comerciales.",
              },
              {
                type: "paragraph",
                text: "El tratamiento de datos financieros o patrimoniales se realizara de conformidad con las disposiciones legales aplicables y, cuando corresponda, con el consentimiento expreso de la persona titular.",
              },
              {
                type: "paragraph",
                text: "RED SKY GROUP no solicitara datos bancarios mediante canales informales ni requerira transferencias a cuentas personales de empleados, representantes, intermediarios o terceros no autorizados.",
              },
            ],
          },
          {
            title: "IV. Datos personales sensibles",
            blocks: [
              {
                type: "paragraph",
                text: "RED SKY GROUP procurara no recabar datos personales sensibles, salvo que resulten estrictamente necesarios para una finalidad legitima, concreta y determinada relacionada con la prestacion de los servicios o con el cumplimiento de obligaciones legales.",
              },
              {
                type: "paragraph",
                text: "En determinadas operaciones podria resultar necesario conocer informacion relacionada con estado de salud, requerimientos medicos, condiciones que puedan afectar la seguridad o viabilidad del transporte y necesidades especiales de asistencia.",
              },
              {
                type: "paragraph",
                text: "Cuando se requiera el tratamiento de datos personales sensibles, RED SKY GROUP observara las obligaciones legales aplicables y recabara el consentimiento correspondiente cuando sea exigible.",
              },
              {
                type: "paragraph",
                text: "RED SKY GROUP no solicitara informacion medica o sensible cuando esta no resulte necesaria para la finalidad correspondiente.",
              },
            ],
          },
          {
            title: "V. Datos de terceros y pasajeros",
            blocks: [
              {
                type: "paragraph",
                text: "Cuando el Cliente proporcione a RED SKY GROUP datos personales correspondientes a pasajeros, representantes, acompanantes, familiares, empleados u otras personas, el Cliente manifiesta que cuenta con facultades suficientes para proporcionar dichos datos y que, cuando resulte necesario, ha informado a las personas correspondientes sobre el tratamiento de sus datos.",
              },
              {
                type: "paragraph",
                text: "El Cliente debera procurar que la informacion proporcionada sea exacta, completa, actualizada y pertinente para la finalidad para la cual se proporciona.",
              },
            ],
          },
          {
            title: "VI. Finalidades primarias",
            blocks: [
              {
                type: "paragraph",
                text: "Los datos personales podran ser tratados para las siguientes finalidades necesarias para la relacion juridica, contractual, comercial u operativa con RED SKY GROUP:",
              },
              {
                type: "list",
                items: [
                  "1. Atender solicitudes de informacion, responder consultas, contactar al Cliente, preparar cotizaciones y analizar solicitudes de servicio.",
                  "2. Preparar contratos, formalizar operaciones, verificar informacion, gestionar aceptaciones y firmas y administrar relaciones comerciales.",
                  "3. Coordinar vuelos, itinerarios, aeronaves, pasajeros, tripulacion, aeropuertos, helipuertos, FBOs, permisos y servicios de terceros.",
                  "4. Verificar informacion y cumplir requisitos relacionados con seguridad operacional, requisitos aeroportuarios, autoridades y procedimientos aplicables.",
                  "5. Realizar facturacion, cobranza, conciliaciones, registro de pagos, reembolsos cuando procedan, contabilidad, auditoria y cumplimiento fiscal.",
                  "6. Cumplir obligaciones legales y regulatorias, atender requerimientos de autoridades competentes, ejercer derechos, defender intereses juridicos y atender controversias o reclamaciones.",
                ],
              },
            ],
          },
          {
            title: "VII. Finalidades secundarias",
            blocks: [
              {
                type: "paragraph",
                text: "Adicionalmente, RED SKY GROUP podra utilizar determinados datos personales para finalidades que no resulten indispensables para la relacion juridica principal, incluyendo: envio de informacion comercial; promociones; noticias; nuevos servicios; invitaciones; comunicaciones comerciales; encuestas de satisfaccion; evaluacion de experiencia del cliente; y marketing y publicidad.",
              },
              {
                type: "paragraph",
                text: "La persona titular podra manifestar su negativa al tratamiento de sus datos para estas finalidades secundarias mediante los mecanismos establecidos en el presente Aviso.",
              },
              {
                type: "paragraph",
                text: "La negativa a recibir comunicaciones comerciales no afectara la relacion contractual ni la prestacion de los servicios contratados, cuando los datos sean necesarios para dichas finalidades primarias.",
              },
            ],
          },
          {
            title: "VIII. Negativa para finalidades secundarias",
            blocks: [
              {
                type: "paragraph",
                text: "La persona titular podra manifestar su negativa al tratamiento de sus datos personales para finalidades secundarias mediante solicitud enviada a:",
              },
              { type: "paragraph", text: "Correo electronico: legal@redskyg.com" },
              {
                type: "paragraph",
                text: "La solicitud debera indicar nombre del titular, correo electronico para recibir respuesta y la finalidad respecto de la cual desea manifestar su negativa.",
              },
            ],
          },
          {
            title: "IX. Transferencias de datos personales",
            blocks: [
              {
                type: "paragraph",
                text: "Para cumplir las finalidades descritas en este Aviso, RED SKY GROUP podra comunicar determinados datos personales a terceros cuando ello resulte necesario para la prestacion de los servicios, cumplimiento de obligaciones legales o ejecucion de la relacion juridica.",
              },
              {
                type: "paragraph",
                text: "Dependiendo de la operacion, los destinatarios podran incluir operadores aereos; propietarios de aeronaves; companias de fletamento; proveedores de helicopteros; tripulaciones; empresas de handling; FBOs; aeropuertos; helipuertos; autoridades aeronauticas; autoridades migratorias; autoridades aduaneras; autoridades fiscales; autoridades judiciales o administrativas; proveedores de transporte terrestre, hospedaje, catering, concierge, seguridad y servicios tecnologicos; y demas terceros que resulten necesarios para ejecutar la operacion.",
              },
              {
                type: "paragraph",
                text: "RED SKY GROUP limitara las transferencias a la informacion necesaria para la finalidad correspondiente y observara las disposiciones legales aplicables.",
              },
            ],
          },
          {
            title: "X. Transferencias internacionales",
            blocks: [
              {
                type: "paragraph",
                text: "Debido a la naturaleza internacional de las operaciones de aviacion privada, determinados datos personales podran ser comunicados a personas fisicas o morales ubicadas fuera del territorio mexicano cuando ello sea necesario para realizar un vuelo internacional, gestionar pasajeros, cumplir requisitos migratorios, aeroportuarios o regulatorios, coordinar operadores, obtener permisos, cumplir requisitos de autoridades extranjeras o contratar servicios necesarios para la operacion.",
              },
              {
                type: "paragraph",
                text: "RED SKY GROUP procurara que dichas comunicaciones se limiten a la informacion necesaria para cumplir la finalidad correspondiente y se realizaran conforme a las disposiciones legales aplicables.",
              },
            ],
          },
          {
            title: "XI. Personas encargadas del tratamiento",
            blocks: [
              {
                type: "paragraph",
                text: "RED SKY GROUP podra contratar personas fisicas o morales que traten datos personales por cuenta de RED SKY GROUP para prestar servicios administrativos, tecnologicos, contables, juridicos, aeronauticos, comerciales o de soporte.",
              },
              {
                type: "paragraph",
                text: "Cuando corresponda, dichos terceros deberan tratar los datos unicamente conforme a las instrucciones y finalidades autorizadas por RED SKY GROUP y adoptar medidas de proteccion adecuadas.",
              },
            ],
          },
          {
            title: "XII. Conservacion de los datos personales",
            blocks: [
              {
                type: "paragraph",
                text: "RED SKY GROUP conservara los datos personales durante el tiempo que resulte necesario para cumplir las finalidades para las cuales fueron recabados, mantener la relacion contractual, cumplir obligaciones legales, fiscales y contables, atender reclamaciones, ejercer o defender derechos, cumplir obligaciones regulatorias y determinar posibles responsabilidades.",
              },
              {
                type: "paragraph",
                text: "Una vez que los datos dejen de ser necesarios para las finalidades correspondientes, RED SKY GROUP procedera a su supresion, bloqueo o conservacion cuando exista una obligacion legal o una causa legitima para ello.",
              },
            ],
          },
          {
            title: "XIII. Medidas de seguridad",
            blocks: [
              {
                type: "paragraph",
                text: "RED SKY GROUP implementara medidas administrativas, tecnicas y fisicas razonables para proteger los datos personales contra dano, perdida, alteracion, destruccion, acceso no autorizado, tratamiento no autorizado y divulgacion indebida.",
              },
              {
                type: "paragraph",
                text: "El acceso a los datos estara limitado a aquellas personas que necesiten conocerlos para cumplir sus funciones.",
              },
              {
                type: "paragraph",
                text: "RED SKY GROUP procurara implementar controles de acceso, mecanismos de autenticacion, medidas de confidencialidad y procedimientos internos destinados a reducir riesgos asociados con el tratamiento de informacion personal.",
              },
            ],
          },
          {
            title: "XIV. Confidencialidad",
            blocks: [
              {
                type: "paragraph",
                text: "Las personas que intervengan en cualquier etapa del tratamiento de datos personales estaran sujetas a obligaciones de confidencialidad respecto de la informacion a la que tengan acceso con motivo de sus funciones.",
              },
              {
                type: "paragraph",
                text: "La informacion unicamente podra utilizarse para las finalidades autorizadas y dentro del ambito de las funciones correspondientes.",
              },
            ],
          },
          {
            title: "XV. Derechos ARCO",
            blocks: [
              {
                type: "paragraph",
                text: "La persona titular podra ejercer respecto de sus datos personales los derechos de Acceso, Rectificacion, Cancelacion y Oposicion (derechos ARCO).",
              },
              {
                type: "list",
                items: [
                  "Acceso: conocer que datos personales conserva RED SKY GROUP y para que finalidades son utilizados.",
                  "Rectificacion: solicitar la correccion o actualizacion de datos personales inexactos, incompletos o desactualizados.",
                  "Cancelacion: solicitar la eliminacion de sus datos personales cuando considere que su tratamiento no se realiza conforme a la legislacion aplicable.",
                  "Oposicion: oponerse al tratamiento de sus datos personales en los casos legalmente procedentes.",
                ],
              },
            ],
          },
          {
            title: "XVI. Procedimiento para ejercer derechos ARCO",
            blocks: [
              { type: "paragraph", text: "La persona titular debera presentar una solicitud mediante:" },
              { type: "paragraph", text: "Correo electronico: legal@redskyg.com" },
              {
                type: "paragraph",
                text: "La solicitud debera contener, como minimo: nombre del titular; medio para recibir la respuesta; documentos que acrediten su identidad; en su caso, documentos que acrediten la representacion legal; descripcion clara y precisa de los datos respecto de los cuales desea ejercer el derecho; derecho ARCO que pretende ejercer; y cualquier informacion que facilite la localizacion de los datos.",
              },
              {
                type: "paragraph",
                text: "Cuando se trate de cancelacion, debera senalar las razones por las cuales solicita la eliminacion. Cuando se trate de oposicion, debera senalar las causas legitimas o situacion especifica que motiva la solicitud, en los terminos legalmente aplicables.",
              },
            ],
          },
          {
            title: "XVII. Revocacion del consentimiento",
            blocks: [
              {
                type: "paragraph",
                text: "Cuando el tratamiento de datos se encuentre basado en el consentimiento de la persona titular, esta podra solicitar su revocacion mediante solicitud dirigida a:",
              },
              { type: "paragraph", text: "Correo electronico: legal@redskyg.com" },
              {
                type: "paragraph",
                text: "La revocacion del consentimiento no tendra efectos retroactivos y podra estar limitada cuando RED SKY GROUP deba continuar tratando los datos para cumplir obligaciones legales, contractuales o alguna de las excepciones previstas por la legislacion aplicable.",
              },
            ],
          },
          {
            title: "XVIII. Limitacion del uso o divulgacion",
            blocks: [
              {
                type: "paragraph",
                text: "La persona titular podra solicitar que RED SKY GROUP limite el uso o divulgacion de sus datos personales, particularmente respecto de finalidades secundarias.",
              },
              { type: "paragraph", text: "La solicitud podra enviarse a:" },
              { type: "paragraph", text: "Correo electronico: legal@redskyg.com" },
              {
                type: "paragraph",
                text: "RED SKY GROUP analizara la solicitud y, cuando corresponda, implementara las medidas necesarias para limitar el tratamiento solicitado.",
              },
            ],
          },
          {
            title: "XIX. Datos recabados a traves del sitio web",
            blocks: [
              {
                type: "paragraph",
                text: "Cuando una persona visite el sitio web de RED SKY GROUP o utilice sus formularios electronicos, podran recabarse datos como nombre, correo electronico, telefono, empresa, ciudad o pais, informacion proporcionada voluntariamente en el formulario e informacion relacionada con la solicitud de servicio.",
              },
              {
                type: "paragraph",
                text: "Asimismo, el sitio podra utilizar tecnologias de recopilacion automatica de informacion, incluyendo cookies y tecnologias similares. El tratamiento especifico de estas tecnologias se regula en la Politica de Cookies de RED SKY GROUP.",
              },
            ],
          },
          {
            title: "XX. Formularios de solicitud de vuelo",
            blocks: [
              {
                type: "paragraph",
                text: "Cuando una persona utilice un formulario para solicitar una cotizacion o vuelo, RED SKY GROUP podra utilizar la informacion proporcionada para analizar la solicitud, verificar disponibilidad, preparar una cotizacion, contactar al solicitante, coordinar aeronaves, coordinar operadores, solicitar informacion adicional y preparar documentacion contractual.",
              },
              { type: "paragraph", text: "El envio de un formulario no constituye por si mismo una contratacion ni una confirmacion de vuelo." },
            ],
          },
          {
            title: "XXI. Datos de pasajeros",
            blocks: [
              {
                type: "paragraph",
                text: "Cuando el Cliente proporcione datos de pasajeros para la realizacion de un vuelo, RED SKY GROUP podra tratar dichos datos exclusivamente en la medida necesaria para gestionar la operacion correspondiente.",
              },
              {
                type: "paragraph",
                text: "Cuando resulte necesario, dichos datos podran comunicarse a operadores, aeropuertos, autoridades, proveedores aeronauticos y demas terceros involucrados en la operacion.",
              },
            ],
          },
          {
            title: "XXII. Informacion de menores",
            blocks: [
              {
                type: "paragraph",
                text: "RED SKY GROUP podra tratar datos personales de menores de edad unicamente cuando resulte necesario para la prestacion de un servicio y mediante la intervencion de quien ejerza legalmente la patria potestad, tutela o representacion correspondiente, de acuerdo con las disposiciones aplicables.",
              },
            ],
          },
          {
            title: "XXIII. Actualizaciones del aviso",
            blocks: [
              {
                type: "paragraph",
                text: "RED SKY GROUP podra modificar o actualizar el presente Aviso de Privacidad cuando resulte necesario por cambios legales, regulatorios, corporativos, incorporacion de nuevos servicios, modificacion de procesos, modificacion de tecnologias o modificacion de las finalidades del tratamiento.",
              },
              { type: "paragraph", text: "La version actualizada sera publicada en:" },
              { type: "paragraph", text: "URL del Aviso de Privacidad: ________________________________________________________________" },
              { type: "paragraph", text: "La fecha de ultima actualizacion aparecera al inicio del documento." },
            ],
          },
          {
            title: "XXIV. Contacto en materia de privacidad",
            blocks: [
              {
                type: "paragraph",
                text: "Para cualquier duda, comentario, solicitud, ejercicio de derechos ARCO, revocacion de consentimiento o limitacion del uso de datos personales:",
              },
              { type: "paragraph", text: "RED SKY GROUP, S.A. DE C.V." },
              { type: "paragraph", text: "Correo electronico: legal@redskyg.com" },
              { type: "paragraph", text: "Telefono: +52 55 8618 6576" },
            ],
          },
          {
            title: "XXV. Consentimiento",
            blocks: [
              {
                type: "paragraph",
                text: "Al proporcionar voluntariamente sus datos personales a RED SKY GROUP, la persona titular reconoce haber tenido acceso al presente Aviso de Privacidad y conocer las caracteristicas principales del tratamiento de sus datos personales.",
              },
              {
                type: "paragraph",
                text: "Cuando la legislacion aplicable requiera consentimiento expreso, RED SKY GROUP solicitara dicho consentimiento mediante el mecanismo correspondiente.",
              },
              {
                type: "paragraph",
                text: "Tratandose de datos financieros o patrimoniales, se observaran los requisitos legales aplicables al consentimiento expreso. En el caso de datos sensibles, se observaran los requisitos reforzados establecidos por la legislacion aplicable.",
              },
            ],
          },
          {
            title: "Aviso de privacidad simplificado para la pagina web",
            blocks: [
              {
                type: "paragraph",
                text: "RED SKY GROUP, S.A. DE C.V., con domicilio en ________________________________________________________________, es responsable del tratamiento de los datos personales que usted proporcione a traves de este formulario.",
              },
              {
                type: "paragraph",
                text: "Sus datos seran utilizados principalmente para atender su solicitud, proporcionar informacion sobre nuestros servicios, preparar cotizaciones y, en su caso, gestionar y formalizar servicios de aviacion privada.",
              },
              {
                type: "paragraph",
                text: "Para conocer las finalidades secundarias, los datos personales que podremos tratar, las transferencias que podran realizarse, los mecanismos para ejercer sus derechos ARCO, asi como los demas terminos aplicables al tratamiento de sus datos personales, consulte nuestro Aviso de Privacidad Integral en:",
              },
              { type: "paragraph", text: "________________________________________________________________" },
              {
                type: "paragraph",
                text: "Para manifestar su negativa al tratamiento de sus datos para finalidades secundarias o ejercer sus derechos ARCO, puede comunicarse a:",
              },
              { type: "paragraph", text: "________________________________________________________________" },
            ],
          },
        ],
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
  background:
    linear-gradient(90deg, rgba(5, 13, 23, 0.68) 0%, rgba(5, 13, 23, 0.48) 34%, rgba(5, 13, 23, 0.2) 62%, rgba(5, 13, 23, 0.38) 100%),
    linear-gradient(180deg, rgba(5, 13, 23, 0.08), rgba(5, 13, 23, 0.28));
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

.company-name {
  margin: 0;
  color: #c8a45d;
  font-size: 0.95rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.privacy-section + .privacy-section {
  margin-top: 2.2rem;
}

.privacy-card h2 {
  margin-top: 0;
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
  line-height: 1.7;
}

.privacy-card h5 {
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

@media (max-width: 768px) {
  .privacy-card {
    padding: 30px;
  }

  .hero-content h1 {
    font-size: 28px;
  }
}
</style>
