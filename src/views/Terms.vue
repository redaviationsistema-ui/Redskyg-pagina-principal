<template>
  <section class="terms-page">
    <div class="terms-hero">
      <div class="hero-content">
        <span>{{ content.heroTag }}</span>
        <h1>{{ content.heroTitle }}</h1>
      </div>
    </div>

    <div class="container">
      <div class="terms-card">
        <p class="company-name">{{ content.companyName }}</p>
        <p class="site-name">{{ content.siteLabel }}</p>
        <div class="update">{{ content.updated }}</div>

        <section v-for="section in content.sections" :key="section.title" class="terms-section">
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
        heroTag: "Legal Documentation",
        heroTitle: "Terms and Conditions of Website Use",
        companyName: "RED SKY GROUP, S.A. DE C.V.",
        siteLabel: "Website: redskyg.com",
        updated: "Last updated: August 27, 2026",
        copyright: "© 2026 RED SKY GROUP. All rights reserved.",
        sections: [
          {
            title: "1. Identification of the Website and Owner",
            blocks: [
              {
                type: "paragraph",
                text: "The website redskyg.com is owned and/or operated by RED SKY GROUP, S.A. DE C.V.",
              },
              { type: "paragraph", text: "Email: legal@redskyg.com" },
              { type: "paragraph", text: "Phone: +52 55 8618 6576" },
              {
                type: "paragraph",
                text: "Access, browsing, and use of the website are subject to these Terms and Conditions, the Privacy Notice, the Cookie Policy, and any other policies published by RED SKY GROUP.",
              },
            ],
          },
          {
            title: "2. Acceptance of the Terms",
            blocks: [
              {
                type: "paragraph",
                text: "By accessing, browsing, using, or interacting with the website, the user acknowledges having read and understood these Terms and agrees to be bound by them to the extent legally applicable.",
              },
              {
                type: "paragraph",
                text: "If the user does not agree with these Terms, they must refrain from using the website.",
              },
              {
                type: "paragraph",
                text: "Some services or features may also be subject to specific terms, contracts, quotations, or additional conditions.",
              },
            ],
          },
          {
            title: "3. Nature of the Website",
            blocks: [
              {
                type: "paragraph",
                text: "The website is intended to provide information about RED SKY GROUP, its services, private aviation solutions, aircraft, brokerage and coordination services, and to allow users to request information and quotations.",
              },
              {
                type: "paragraph",
                text: "The information published on the website is for informational and commercial purposes and does not by itself constitute a flight confirmation, reservation, transport contract, irrevocable offer, aircraft availability guarantee, or definitive commitment to provide services.",
              },
              {
                type: "paragraph",
                text: "Any request submitted through the website must be evaluated and, where appropriate, expressly confirmed by RED SKY GROUP.",
              },
            ],
          },
          {
            title: "4. Quotation Requests",
            blocks: [
              {
                type: "paragraph",
                text: "Submitting a request through the website does not guarantee availability, reserve an aircraft, block a date, guarantee a schedule, constitute contractual acceptance, or create any obligation for RED SKY GROUP to provide the requested service.",
              },
              {
                type: "paragraph",
                text: "RED SKY GROUP may request additional information before issuing a quotation.",
              },
              {
                type: "paragraph",
                text: "Any final quotation will be subject to its stated conditions and, where applicable, the execution of the corresponding contract.",
              },
            ],
          },
          {
            title: "5. Aircraft and Service Information",
            blocks: [
              {
                type: "paragraph",
                text: "Characteristics, photographs, specifications, capacities, locations, configurations, schedules, and any other information related to aircraft or services published on the website may vary.",
              },
              {
                type: "paragraph",
                text: "Published information may relate to owned aircraft, managed aircraft, third-party aircraft, or aircraft whose availability is coordinated through operators or providers.",
              },
              {
                type: "paragraph",
                text: "Publishing an aircraft does not mean it is available for a specific date. Availability must be confirmed individually for each operation.",
              },
            ],
          },
          {
            title: "6. Prices",
            blocks: [
              {
                type: "paragraph",
                text: "Prices published on the website, when available, may be subject to availability and may vary depending on date, route, aircraft, season, taxes, airport costs, permits, positioning, and additional services.",
              },
              {
                type: "paragraph",
                text: "The final price will be the one expressly confirmed in the corresponding quotation or contract.",
              },
              {
                type: "paragraph",
                text: "When an operation requires third-party services, related costs may vary according to provider conditions.",
              },
            ],
          },
          {
            title: "7. Errors in Information",
            blocks: [
              {
                type: "paragraph",
                text: "RED SKY GROUP seeks to keep website information updated, but typographical errors, update errors, outdated information, or unintended inconsistencies may exist.",
              },
              {
                type: "paragraph",
                text: "When a relevant error is detected, RED SKY GROUP may correct it and, where necessary, inform the corresponding user.",
              },
              {
                type: "paragraph",
                text: "A material error in a publication does not by itself confirm a transaction or obligate RED SKY GROUP to provide an unconfirmed service.",
              },
            ],
          },
          {
            title: "8. Service Availability",
            blocks: [
              {
                type: "paragraph",
                text: "All services are subject to availability and may depend on aircraft, operator, crew, airport, helipad, permits, slots, maintenance, weather, operational restrictions, regulations, safety, and provider availability.",
              },
              {
                type: "paragraph",
                text: "RED SKY GROUP does not guarantee that any service shown on the website can be contracted for a specific date.",
              },
            ],
          },
          {
            title: "9. Operators and Third Parties",
            blocks: [
              {
                type: "paragraph",
                text: "RED SKY GROUP may coordinate services through authorized air operators, aircraft owners, and specialized providers.",
              },
              {
                type: "paragraph",
                text: "Third-party participation may be necessary for aircraft operation, crew, maintenance, handling, FBO, permits, airport services, ground transport, catering, lodging, concierge, or related services.",
              },
              {
                type: "paragraph",
                text: "Where applicable, physical aircraft operation will be carried out by the legally and operationally responsible operator.",
              },
            ],
          },
          {
            title: "10. Operational Safety",
            blocks: [
              {
                type: "paragraph",
                text: "Operational safety has absolute priority over any commercial consideration.",
              },
              {
                type: "paragraph",
                text: "RED SKY GROUP, the operator, or the crew may modify, delay, reschedule, substitute, or cancel an operation when necessary due to weather, maintenance, safety, airport restrictions, air traffic, regulations, authority instructions, or any other relevant operational circumstance.",
              },
              {
                type: "paragraph",
                text: "No content published on the website should be interpreted as authorization to perform an operation that is unsafe or not legally permissible.",
              },
            ],
          },
          {
            title: "11. Use of Website Information",
            blocks: [
              {
                type: "paragraph",
                text: "Website information may only be used for legitimate and personal or authorized commercial purposes.",
              },
              {
                type: "list",
                items: [
                  "Systematically copying content, extracting databases, reproducing catalogs, or using photographs without authorization is prohibited.",
                  "Unauthorized scraping, introducing malicious code, attempting to breach security, or interfering with website functionality is prohibited.",
                  "Using forms to send false or fraudulent information, using false identities, or carrying out unlawful activities through the website is prohibited.",
                ],
              },
            ],
          },
          {
            title: "12. Intellectual Property",
            blocks: [
              {
                type: "paragraph",
                text: "All website elements, including the RED SKY GROUP name, logos, trademarks, designs, photographs, texts, graphics, images, videos, documents, interfaces, audiovisual content, website structure, and design elements, are owned by RED SKY GROUP or lawfully used under authorization or license.",
              },
              {
                type: "paragraph",
                text: "Their reproduction, distribution, modification, commercial exploitation, or unauthorized use is prohibited.",
              },
            ],
          },
          {
            title: "13. Trademarks",
            blocks: [
              {
                type: "paragraph",
                text: "Trademarks, trade names, logos, and other distinctive signs used on the website may not be used without prior written authorization from their owner.",
              },
              {
                type: "paragraph",
                text: "Access to the website does not grant any license or right of use over RED SKY GROUP trademarks.",
              },
            ],
          },
          {
            title: "14. Aircraft Photographs",
            blocks: [
              {
                type: "paragraph",
                text: "Published photographs may correspond to owned aircraft, managed aircraft, aircraft available through third parties, or illustrative material.",
              },
              {
                type: "paragraph",
                text: "Unless expressly stated otherwise, photographs do not guarantee that the photographed aircraft will be assigned to a specific operation.",
              },
              {
                type: "paragraph",
                text: "The final aircraft must be confirmed in the quotation and/or contractual documentation.",
              },
            ],
          },
          {
            title: "15. Forms",
            blocks: [
              {
                type: "paragraph",
                text: "Users agree to provide truthful, complete, updated, and accurate information.",
              },
              {
                type: "paragraph",
                text: "RED SKY GROUP may reject or suspend a request when false, incomplete, or inconsistent information prevents identity verification or proper request management.",
              },
              {
                type: "paragraph",
                text: "Personal data processing will be carried out in accordance with the Comprehensive Privacy Notice of RED SKY GROUP.",
              },
            ],
          },
          {
            title: "16. Electronic Communications",
            blocks: [
              {
                type: "paragraph",
                text: "When a person uses forms, email, or other electronic means available on the website, RED SKY GROUP may use the provided information to respond to the corresponding request.",
              },
              {
                type: "paragraph",
                text: "Electronic communications may be used to confirm requests, request information, send quotations, coordinate operations, send documentation, and follow up on services.",
              },
            ],
          },
          {
            title: "17. Quotations and Contracts",
            blocks: [
              {
                type: "paragraph",
                text: "When a website request leads to a contract, the legal relationship will be governed by the specific contract, its annexes, the accepted quotation, the particular conditions of the operation, and the applicable booking, payment, cancellation, rescheduling, and refund policy.",
              },
              {
                type: "paragraph",
                text: "These Terms of Use do not replace the specific aviation services agreement.",
              },
            ],
          },
          {
            title: "18. Payments",
            blocks: [
              {
                type: "paragraph",
                text: "Payments related to RED SKY GROUP services must only be made according to the company's official payment instructions.",
              },
              {
                type: "paragraph",
                text: "RED SKY GROUP will not request transfers to personal accounts of employees, representatives, or unauthorized third parties.",
              },
              {
                type: "paragraph",
                text: "The user must verify payment details before making any transfer.",
              },
            ],
          },
          {
            title: "19. Cancellations and Refunds",
            blocks: [
              {
                type: "paragraph",
                text: "Cancellations, rescheduling, and refunds for air services will be governed by the applicable booking, payment, cancellation, rescheduling, and refund policy and by the specific contract.",
              },
              {
                type: "paragraph",
                text: "These Terms do not by themselves create any refund right.",
              },
            ],
          },
          {
            title: "20. No Automatic Credits or Balances",
            blocks: [
              {
                type: "paragraph",
                text: "A payment made for a specific operation does not automatically create a credit balance, general credit, permanent right, or right to apply that amount to future different operations.",
              },
              {
                type: "paragraph",
                text: "Any rescheduling, application of paid amounts, or refund must be made in accordance with contractual documentation and applicable policies.",
              },
            ],
          },
          {
            title: "21. User Conduct",
            blocks: [
              {
                type: "paragraph",
                text: "The user must refrain from using the website to commit crimes, defraud, impersonate identities, unlawfully obtain information, interfere with other users, compromise systems, introduce malware, carry out cyberattacks, send spam, obtain services through false information, or harm the reputation or operation of RED SKY GROUP through deliberately false information.",
              },
              {
                type: "paragraph",
                text: "RED SKY GROUP may take the corresponding legal measures against unlawful conduct.",
              },
            ],
          },
          {
            title: "22. Links to Third-Party Websites",
            blocks: [
              {
                type: "paragraph",
                text: "The website may contain links to third-party pages provided to facilitate access to external information or services.",
              },
              {
                type: "paragraph",
                text: "RED SKY GROUP does not necessarily control the content, policies, privacy practices, security, or availability of those sites.",
              },
              {
                type: "paragraph",
                text: "Access to external sites is the user's responsibility.",
              },
            ],
          },
          {
            title: "23. Social Media",
            blocks: [
              {
                type: "paragraph",
                text: "When RED SKY GROUP provides links to social media platforms, such links are for informational or contact purposes only.",
              },
              {
                type: "paragraph",
                text: "Use of those platforms is subject to the terms and policies of each provider.",
              },
            ],
          },
          {
            title: "24. Website Security",
            blocks: [
              {
                type: "paragraph",
                text: "RED SKY GROUP will implement reasonable measures to maintain the security and operation of the website. However, no system connected to the Internet can be guaranteed to be absolutely secure.",
              },
              {
                type: "paragraph",
                text: "RED SKY GROUP does not guarantee that the website will be permanently free of errors, interruptions, vulnerabilities, attacks, technical failures, or temporary unavailability.",
              },
              {
                type: "paragraph",
                text: "When incidents are detected, RED SKY GROUP may adopt reasonable measures to restore service and protect the corresponding information.",
              },
            ],
          },
          {
            title: "25. Website Availability",
            blocks: [
              {
                type: "paragraph",
                text: "RED SKY GROUP may modify, suspend, limit, or temporarily withdraw certain website functions for maintenance, updates, security, technological changes, operational causes, force majeure, legal requirements, or circumstances beyond its reasonable control.",
              },
            ],
          },
          {
            title: "26. User-Generated Content",
            blocks: [
              {
                type: "paragraph",
                text: "Unless RED SKY GROUP expressly enables a feature for it, users must not upload photographs, documents, comments, or other content to the website.",
              },
              {
                type: "paragraph",
                text: "When such features are enabled, the user will be responsible for ensuring the content is lawful, does not infringe third-party rights, does not contain third-party confidential information, and does not contain malware.",
              },
            ],
          },
          {
            title: "27. Limitation of Liability",
            blocks: [
              {
                type: "paragraph",
                text: "To the maximum extent permitted by applicable law, RED SKY GROUP is not liable for damages derived exclusively from temporary website unavailability, user connection failures, user device failures, external website content, incorrectly provided information by the user, acts of third parties outside RED SKY GROUP's reasonable control, or force majeure events.",
              },
              {
                type: "paragraph",
                text: "This provision does not limit non-waivable rights or attempt to exclude liabilities that cannot be excluded under applicable law.",
              },
            ],
          },
          {
            title: "28. No Guarantee of Commercial Results",
            blocks: [
              {
                type: "paragraph",
                text: "The publication of services, aircraft, or commercial information on the website does not guarantee that the user will obtain a specific aircraft, price, availability on a given date, financing, acquisition, co-ownership transaction, or aircraft management transaction.",
              },
              {
                type: "paragraph",
                text: "Every operation must be documented through the corresponding legal instruments.",
              },
            ],
          },
          {
            title: "29. Purchase, Sale, Leasing, or Co-Ownership Transactions",
            blocks: [
              {
                type: "paragraph",
                text: "The publication of aircraft or information related to purchase, sale, leasing, management, co-ownership, or acquisition of aircraft does not constitute a definitive contractual offer.",
              },
              {
                type: "paragraph",
                text: "Any transaction will be subject to availability, due diligence, inspections, documentation, commercial conditions, party approval, definitive contracts, and regulatory compliance.",
              },
              {
                type: "paragraph",
                text: "No proposal, presentation, quotation, or preliminary exchange by itself creates an obligation to enter into a future transaction unless the parties have expressly signed the corresponding legal instrument.",
              },
            ],
          },
          {
            title: "30. Confidentiality",
            blocks: [
              {
                type: "paragraph",
                text: "Information provided by the user to RED SKY GROUP will be handled in accordance with the applicable Privacy Notice.",
              },
              {
                type: "paragraph",
                text: "Specific confidentiality obligations deriving from a commercial transaction will be subject to the corresponding contract.",
              },
            ],
          },
          {
            title: "31. Protection of Personal Data",
            blocks: [
              {
                type: "paragraph",
                text: "Personal data processing will be carried out according to the Comprehensive Privacy Notice of RED SKY GROUP and, where applicable, the Cookie Policy.",
              },
              {
                type: "paragraph",
                text: "This document does not replace the Privacy Notice.",
              },
            ],
          },
          {
            title: "32. Amendments to the Terms",
            blocks: [
              {
                type: "paragraph",
                text: "RED SKY GROUP may modify these Terms when necessary due to legal or regulatory changes, website modifications, new services, technological changes, or corporate changes.",
              },
              {
                type: "paragraph",
                text: "The current version will be published on the website.",
              },
              {
                type: "paragraph",
                text: "Changes will not retroactively affect previously executed contracts or operations, except where legally required.",
              },
            ],
          },
          {
            title: "33. Partial Invalidity",
            blocks: [
              {
                type: "paragraph",
                text: "If any provision of these Terms is declared invalid, illegal, or unenforceable by a competent authority, that provision will be deemed modified or excluded only to the extent necessary, while the remaining provisions remain in effect.",
              },
            ],
          },
          {
            title: "34. No Waiver",
            blocks: [
              {
                type: "paragraph",
                text: "Failure by RED SKY GROUP to immediately exercise any right does not constitute a waiver of that right.",
              },
              {
                type: "paragraph",
                text: "Partial exercise of a right does not prevent its later exercise.",
              },
            ],
          },
          {
            title: "35. Assignment",
            blocks: [
              {
                type: "paragraph",
                text: "The user may not assign, transfer, or convey rights arising from a contractual relationship with RED SKY GROUP without prior written authorization, where legally required.",
              },
              {
                type: "paragraph",
                text: "RED SKY GROUP may use operators, providers, and third parties to perform services in accordance with applicable contracts.",
              },
            ],
          },
          {
            title: "36. Governing Law",
            blocks: [
              {
                type: "paragraph",
                text: "These Terms are governed by applicable Mexican law, without prejudice to mandatory provisions that may apply to international operations.",
              },
              {
                type: "paragraph",
                text: "Nothing in these Terms seeks to exclude rights or protections that applicable law recognizes as non-waivable.",
              },
            ],
          },
        ],
      }
    : {
        heroTag: "Documentacion legal",
        heroTitle: "Terminos y Condiciones de Uso del Sitio Web",
        companyName: "RED SKY GROUP, S.A. DE C.V.",
        siteLabel: "Sitio web: redskyg.com",
        updated: "Ultima actualizacion: 27 de agosto de 2026",
        copyright: "© 2026 RED SKY GROUP. Todos los derechos reservados.",
        sections: [
          {
            title: "1. Identificacion del sitio y del titular",
            blocks: [
              {
                type: "paragraph",
                text: "El sitio web redskyg.com es propiedad y/o se encuentra operado por RED SKY GROUP, S.A. DE C.V.",
              },
              { type: "paragraph", text: "Correo electronico: legal@redskyg.com" },
              { type: "paragraph", text: "Telefono: +52 55 8618 6576" },
              {
                type: "paragraph",
                text: "El acceso, navegacion y utilizacion del sitio web estaran sujetos a los presentes Terminos y Condiciones, asi como al Aviso de Privacidad, Politica de Cookies y demas politicas publicadas por RED SKY GROUP.",
              },
            ],
          },
          {
            title: "2. Aceptacion de los terminos",
            blocks: [
              {
                type: "paragraph",
                text: "Al acceder, navegar, utilizar o interactuar con el sitio web, la persona usuaria reconoce haber leido y comprendido estos Terminos y Condiciones y acepta sujetarse a ellos en la medida legalmente aplicable.",
              },
              {
                type: "paragraph",
                text: "Si la persona usuaria no esta de acuerdo con estos Terminos, debera abstenerse de utilizar el sitio web.",
              },
              {
                type: "paragraph",
                text: "La utilizacion de determinados servicios o funcionalidades podra estar sujeta, ademas, a terminos particulares, contratos, cotizaciones o condiciones especificas.",
              },
            ],
          },
          {
            title: "3. Naturaleza del sitio web",
            blocks: [
              {
                type: "paragraph",
                text: "El sitio web tiene como finalidad proporcionar informacion sobre RED SKY GROUP, sus servicios, soluciones de aviacion privada, aeronaves, servicios de intermediacion y coordinacion, asi como permitir a las personas usuarias solicitar informacion y cotizaciones.",
              },
              {
                type: "paragraph",
                text: "La informacion publicada en el sitio web tiene caracter informativo y comercial y no constituye, por si misma, una confirmacion de vuelo, reservacion, contrato de transporte, oferta irrevocable, garantia de disponibilidad de aeronave ni compromiso definitivo de prestacion de servicios.",
              },
              {
                type: "paragraph",
                text: "Una solicitud realizada mediante el sitio web debera ser evaluada y, en su caso, confirmada expresamente por RED SKY GROUP.",
              },
            ],
          },
          {
            title: "4. Solicitudes de cotizacion",
            blocks: [
              {
                type: "paragraph",
                text: "El envio de una solicitud mediante el sitio web no garantiza disponibilidad, no reserva una aeronave, no bloquea una fecha, no garantiza un horario, no constituye aceptacion contractual y no genera obligacion de RED SKY GROUP de prestar el servicio solicitado.",
              },
              {
                type: "paragraph",
                text: "RED SKY GROUP podra solicitar informacion adicional antes de emitir una cotizacion.",
              },
              {
                type: "paragraph",
                text: "La cotizacion definitiva estara sujeta a las condiciones indicadas en ella y, cuando corresponda, a la celebracion del contrato respectivo.",
              },
            ],
          },
          {
            title: "5. Informacion sobre aeronaves y servicios",
            blocks: [
              {
                type: "paragraph",
                text: "Las caracteristicas, fotografias, especificaciones, capacidades, ubicaciones, configuraciones, horarios y demas informacion relacionada con aeronaves o servicios publicados en el sitio web podran variar.",
              },
              {
                type: "paragraph",
                text: "La informacion publicada podra corresponder a aeronaves propias, administradas, de terceros o cuya disponibilidad se coordina mediante operadores o proveedores.",
              },
              {
                type: "paragraph",
                text: "La publicacion de una aeronave no significa que esta se encuentre disponible para una fecha determinada. La disponibilidad debera confirmarse individualmente para cada operacion.",
              },
            ],
          },
          {
            title: "6. Precios",
            blocks: [
              {
                type: "paragraph",
                text: "Los precios publicados en el sitio web, cuando existan, podran estar sujetos a disponibilidad, variar dependiendo de la fecha, ruta, aeronave, temporada u otros factores, y estar sujetos a impuestos, costos aeroportuarios, permisos, posicionamiento y servicios adicionales.",
              },
              {
                type: "paragraph",
                text: "El precio definitivo sera el expresamente confirmado en la cotizacion o contrato correspondiente.",
              },
              {
                type: "paragraph",
                text: "Cuando una operacion requiera servicios de terceros, los costos correspondientes podran variar de acuerdo con las condiciones del proveedor.",
              },
            ],
          },
          {
            title: "7. Errores en la informacion",
            blocks: [
              {
                type: "paragraph",
                text: "RED SKY GROUP procura mantener actualizada la informacion publicada en el sitio web. No obstante, pueden existir errores tipograficos, de actualizacion, informacion desactualizada o inconsistencias involuntarias.",
              },
              {
                type: "paragraph",
                text: "Cuando se detecte un error relevante en una informacion publicada, RED SKY GROUP podra corregirlo y, cuando resulte necesario, comunicarlo a la persona usuaria correspondiente.",
              },
              {
                type: "paragraph",
                text: "La existencia de un error material en una publicacion no constituye por si misma una confirmacion de contratacion ni obliga a RED SKY GROUP a prestar un servicio que no haya sido formalmente confirmado.",
              },
            ],
          },
          {
            title: "8. Disponibilidad de servicios",
            blocks: [
              {
                type: "paragraph",
                text: "Todos los servicios estaran sujetos a disponibilidad. Esta podra depender de aeronave, operador, tripulacion, aeropuerto, helipuerto, permisos, slots, mantenimiento, meteorologia, restricciones operativas, regulacion, seguridad y disponibilidad de proveedores.",
              },
              {
                type: "paragraph",
                text: "RED SKY GROUP no garantiza que cualquier servicio mostrado en el sitio web pueda contratarse en una fecha determinada.",
              },
            ],
          },
          {
            title: "9. Operadores y terceros",
            blocks: [
              {
                type: "paragraph",
                text: "RED SKY GROUP podra coordinar servicios mediante operadores aereos autorizados, propietarios de aeronaves y proveedores especializados.",
              },
              {
                type: "paragraph",
                text: "La participacion de terceros podra ser necesaria para operacion de aeronaves, tripulacion, mantenimiento, handling, FBO, permisos, servicios aeroportuarios, transporte terrestre, catering, hospedaje, concierge u otros servicios relacionados.",
              },
              {
                type: "paragraph",
                text: "Cuando corresponda, la operacion fisica de la aeronave sera realizada por el operador que legal y operacionalmente corresponda.",
              },
            ],
          },
          {
            title: "10. Seguridad operacional",
            blocks: [
              {
                type: "paragraph",
                text: "La seguridad operacional tendra prioridad absoluta sobre cualquier consideracion comercial.",
              },
              {
                type: "paragraph",
                text: "RED SKY GROUP, el operador o la tripulacion podran modificar, retrasar, reprogramar, sustituir o cancelar una operacion cuando resulte necesario por condiciones meteorologicas, mantenimiento, seguridad, restricciones aeroportuarias, trafico aereo, regulacion, instrucciones de autoridades o cualquier otra circunstancia operacional relevante.",
              },
              {
                type: "paragraph",
                text: "Ningun contenido publicado en el sitio web debera interpretarse como una autorizacion para realizar una operacion que no resulte segura o legalmente procedente.",
              },
            ],
          },
          {
            title: "11. Uso de la informacion del sitio",
            blocks: [
              {
                type: "paragraph",
                text: "La informacion del sitio web unicamente podra utilizarse para fines legitimos y personales o comerciales autorizados.",
              },
              {
                type: "list",
                items: [
                  "Queda prohibido copiar sistematicamente el contenido, extraer bases de datos, reproducir catalogos o utilizar fotografias sin autorizacion.",
                  "Queda prohibido realizar scraping no autorizado, introducir codigo malicioso, intentar vulnerar la seguridad o interferir con el funcionamiento del sitio.",
                  "Queda prohibido utilizar formularios para enviar informacion falsa o fraudulenta, utilizar identidades falsas o realizar actividades ilicitas mediante el sitio.",
                ],
              },
            ],
          },
          {
            title: "12. Propiedad intelectual",
            blocks: [
              {
                type: "paragraph",
                text: "Todos los elementos del sitio web, incluyendo nombre RED SKY GROUP, logotipos, marcas, disenos, fotografias, textos, graficos, imagenes, videos, documentos, interfaces, contenido audiovisual, estructura del sitio y elementos de diseno, son propiedad de RED SKY GROUP o se utilizan legitimamente bajo autorizacion o licencia.",
              },
              {
                type: "paragraph",
                text: "Queda prohibida su reproduccion, distribucion, modificacion, explotacion comercial o utilizacion no autorizada.",
              },
            ],
          },
          {
            title: "13. Marcas",
            blocks: [
              {
                type: "paragraph",
                text: "Las marcas, nombres comerciales, logotipos y demas signos distintivos utilizados en el sitio web no podran utilizarse sin autorizacion previa y por escrito de su titular.",
              },
              {
                type: "paragraph",
                text: "El acceso al sitio web no concede licencia ni derecho alguno de uso sobre las marcas de RED SKY GROUP.",
              },
            ],
          },
          {
            title: "14. Fotografias de aeronaves",
            blocks: [
              {
                type: "paragraph",
                text: "Las fotografias publicadas podran corresponder a aeronaves propias, administradas, disponibles mediante terceros o utilizadas con fines ilustrativos.",
              },
              {
                type: "paragraph",
                text: "Salvo que se indique expresamente lo contrario, las fotografias no constituyen garantia de que la aeronave fotografiada sera la aeronave asignada a una operacion determinada.",
              },
              {
                type: "paragraph",
                text: "La aeronave definitiva debera confirmarse en la cotizacion y/o documentacion contractual correspondiente.",
              },
            ],
          },
          {
            title: "15. Formularios",
            blocks: [
              {
                type: "paragraph",
                text: "Las personas usuarias se comprometen a proporcionar informacion verdadera, completa, actualizada y exacta.",
              },
              {
                type: "paragraph",
                text: "RED SKY GROUP podra rechazar o suspender una solicitud cuando detecte informacion falsa, incompleta o inconsistente que impida verificar la identidad o gestionar adecuadamente la solicitud.",
              },
              {
                type: "paragraph",
                text: "El tratamiento de los datos personales se realizara conforme al Aviso de Privacidad Integral de RED SKY GROUP.",
              },
            ],
          },
          {
            title: "16. Comunicaciones electronicas",
            blocks: [
              {
                type: "paragraph",
                text: "Cuando una persona utilice formularios, correo electronico u otros medios electronicos disponibles en el sitio web, RED SKY GROUP podra utilizar la informacion proporcionada para responder la solicitud correspondiente.",
              },
              {
                type: "paragraph",
                text: "Las comunicaciones electronicas podran utilizarse para confirmar solicitudes, solicitar informacion, enviar cotizaciones, coordinar operaciones, enviar documentacion y dar seguimiento a servicios.",
              },
            ],
          },
          {
            title: "17. Cotizaciones y contratos",
            blocks: [
              {
                type: "paragraph",
                text: "Cuando una solicitud del sitio web derive en una contratacion, la relacion juridica estara regulada por el contrato especifico, sus anexos, la cotizacion aceptada, las condiciones particulares de la operacion y la politica aplicable de reservaciones, pagos, cancelaciones, reprogramaciones y reembolsos.",
              },
              {
                type: "paragraph",
                text: "Los presentes Terminos de Uso no sustituyen el contrato especifico de prestacion de servicios de aviacion.",
              },
            ],
          },
          {
            title: "18. Pagos",
            blocks: [
              {
                type: "paragraph",
                text: "Los pagos relacionados con servicios de RED SKY GROUP deberan realizarse unicamente conforme a las instrucciones oficiales de pago proporcionadas por la empresa.",
              },
              {
                type: "paragraph",
                text: "RED SKY GROUP no solicitara transferencias a cuentas personales de empleados, representantes o terceros no autorizados.",
              },
              {
                type: "paragraph",
                text: "La persona usuaria debera verificar los datos de pago antes de realizar cualquier transferencia.",
              },
            ],
          },
          {
            title: "19. Cancelaciones y reembolsos",
            blocks: [
              {
                type: "paragraph",
                text: "Las cancelaciones, reprogramaciones y reembolsos de servicios aereos se regiran por la politica general aplicable y por el contrato especifico correspondiente.",
              },
              {
                type: "paragraph",
                text: "Los presentes Terminos no generan por si mismos ningun derecho a reembolso.",
              },
            ],
          },
          {
            title: "20. No existencia de saldos o creditos automaticos",
            blocks: [
              {
                type: "paragraph",
                text: "El pago realizado para una operacion especifica no genera automaticamente un saldo a favor, credito general, derecho permanente o derecho a utilizar dicho importe en operaciones futuras distintas.",
              },
              {
                type: "paragraph",
                text: "Cualquier reprogramacion, aplicacion de cantidades pagadas o devolucion debera realizarse conforme a la documentacion contractual y politicas aplicables.",
              },
            ],
          },
          {
            title: "21. Conducta de la persona usuaria",
            blocks: [
              {
                type: "paragraph",
                text: "La persona usuaria debera abstenerse de utilizar el sitio web para cometer delitos, defraudar, suplantar identidades, obtener informacion de manera ilicita, interferir con otras personas usuarias, vulnerar sistemas, introducir malware, realizar ataques informaticos, enviar spam, obtener servicios mediante informacion falsa o afectar la reputacion o funcionamiento de RED SKY GROUP mediante informacion deliberadamente falsa.",
              },
              {
                type: "paragraph",
                text: "RED SKY GROUP podra tomar las medidas legales correspondientes frente a conductas ilicitas.",
              },
            ],
          },
          {
            title: "22. Enlaces a sitios de terceros",
            blocks: [
              {
                type: "paragraph",
                text: "El sitio web podra contener enlaces a paginas de terceros. Estos enlaces se proporcionan para facilitar el acceso a informacion o servicios externos.",
              },
              {
                type: "paragraph",
                text: "RED SKY GROUP no controla necesariamente el contenido, politicas, practicas de privacidad, seguridad o disponibilidad de dichos sitios.",
              },
              {
                type: "paragraph",
                text: "El acceso a sitios externos sera responsabilidad de la persona usuaria.",
              },
            ],
          },
          {
            title: "23. Redes sociales",
            blocks: [
              {
                type: "paragraph",
                text: "Cuando RED SKY GROUP proporcione enlaces a redes sociales, dichos enlaces tendran unicamente caracter informativo o de contacto.",
              },
              {
                type: "paragraph",
                text: "La utilizacion de dichas plataformas estara sujeta a los terminos y politicas de cada proveedor.",
              },
            ],
          },
          {
            title: "24. Seguridad del sitio",
            blocks: [
              {
                type: "paragraph",
                text: "RED SKY GROUP implementara medidas razonables para mantener la seguridad y funcionamiento del sitio web. Sin embargo, ningun sistema conectado a internet puede garantizarse como absolutamente seguro.",
              },
              {
                type: "paragraph",
                text: "RED SKY GROUP no garantiza que el sitio web este permanentemente libre de errores, interrupciones, vulnerabilidades, ataques, fallas tecnicas o indisponibilidad temporal.",
              },
              {
                type: "paragraph",
                text: "Cuando se detecten incidentes, RED SKY GROUP podra adoptar medidas razonables para restablecer el servicio y proteger la informacion correspondiente.",
              },
            ],
          },
          {
            title: "25. Disponibilidad del sitio",
            blocks: [
              {
                type: "paragraph",
                text: "RED SKY GROUP podra modificar, suspender, limitar o retirar temporalmente determinadas funciones del sitio web por mantenimiento, actualizacion, seguridad, modificaciones tecnologicas, causas operativas, fuerza mayor, requerimientos legales o circunstancias fuera de su control razonable.",
              },
            ],
          },
          {
            title: "26. Contenido generado por personas usuarias",
            blocks: [
              {
                type: "paragraph",
                text: "Salvo que RED SKY GROUP habilite expresamente una funcionalidad para ello, las personas usuarias no deberan cargar fotografias, documentos, comentarios u otros contenidos en el sitio web.",
              },
              {
                type: "paragraph",
                text: "Cuando se habiliten dichas funcionalidades, la persona usuaria sera responsable de que el contenido sea licito, no infrinja derechos de terceros, no contenga informacion confidencial ajena y no contenga malware.",
              },
            ],
          },
          {
            title: "27. Limitacion de responsabilidad",
            blocks: [
              {
                type: "paragraph",
                text: "En la maxima medida permitida por la legislacion aplicable, RED SKY GROUP no sera responsable por danos derivados exclusivamente de indisponibilidad temporal del sitio web, fallas de conexion de la persona usuaria, fallas de su dispositivo, contenido de sitios externos, informacion proporcionada incorrectamente por la persona usuaria, actos de terceros fuera del control razonable de RED SKY GROUP o acontecimientos de fuerza mayor.",
              },
              {
                type: "paragraph",
                text: "Esta disposicion no limita derechos que legalmente sean irrenunciables ni pretende excluir responsabilidades que no puedan excluirse conforme a la legislacion aplicable.",
              },
            ],
          },
          {
            title: "28. Ausencia de garantias sobre resultados comerciales",
            blocks: [
              {
                type: "paragraph",
                text: "La publicacion de servicios, aeronaves o informacion comercial en el sitio web no constituye garantia de que la persona usuaria obtendra una aeronave determinada, un precio determinado, disponibilidad en determinada fecha, financiamiento, una adquisicion, una operacion de copropiedad o una operacion de administracion aeronautica.",
              },
              {
                type: "paragraph",
                text: "Toda operacion debera documentarse mediante los instrumentos juridicos correspondientes.",
              },
            ],
          },
          {
            title: "29. Operaciones de compra, venta, leasing o copropiedad",
            blocks: [
              {
                type: "paragraph",
                text: "La publicacion de aeronaves o informacion relativa a compra, venta, leasing, administracion, copropiedad o adquisicion de aeronaves no constituye una oferta contractual definitiva.",
              },
              {
                type: "paragraph",
                text: "Cualquier operacion estara sujeta a disponibilidad, due diligence, inspecciones, documentacion, condiciones comerciales, aprobacion de las partes, contratos definitivos y cumplimiento regulatorio.",
              },
              {
                type: "paragraph",
                text: "Ninguna propuesta, presentacion, cotizacion o intercambio preliminar constituye por si mismo una obligacion de celebrar una operacion futura, salvo que las partes hayan suscrito expresamente el instrumento juridico correspondiente.",
              },
            ],
          },
          {
            title: "30. Confidencialidad",
            blocks: [
              {
                type: "paragraph",
                text: "La informacion que la persona usuaria proporcione a RED SKY GROUP sera tratada conforme al Aviso de Privacidad aplicable.",
              },
              {
                type: "paragraph",
                text: "Las obligaciones especificas de confidencialidad que deriven de una operacion comercial estaran sujetas al contrato correspondiente.",
              },
            ],
          },
          {
            title: "31. Proteccion de datos personales",
            blocks: [
              {
                type: "paragraph",
                text: "El tratamiento de datos personales se realizara conforme al Aviso de Privacidad Integral de RED SKY GROUP y, cuando corresponda, a la Politica de Cookies.",
              },
              {
                type: "paragraph",
                text: "El presente documento no sustituye el Aviso de Privacidad.",
              },
            ],
          },
          {
            title: "32. Modificaciones a los terminos",
            blocks: [
              {
                type: "paragraph",
                text: "RED SKY GROUP podra modificar los presentes Terminos cuando resulte necesario debido a cambios legales, regulatorios, modificaciones del sitio, incorporacion de nuevos servicios, cambios tecnologicos o modificaciones corporativas.",
              },
              {
                type: "paragraph",
                text: "La version vigente sera publicada en el sitio web.",
              },
              {
                type: "paragraph",
                text: "Las modificaciones no afectaran retroactivamente contratos u operaciones previamente celebrados, salvo cuando legalmente proceda.",
              },
            ],
          },
          {
            title: "33. Nulidad parcial",
            blocks: [
              {
                type: "paragraph",
                text: "Si alguna disposicion de estos Terminos fuese declarada invalida, ilegal o inaplicable por autoridad competente, dicha disposicion se tendra por modificada o excluida unicamente en la medida necesaria, permaneciendo vigentes las demas disposiciones.",
              },
            ],
          },
          {
            title: "34. No renuncia",
            blocks: [
              {
                type: "paragraph",
                text: "La falta de ejercicio inmediato de algun derecho por parte de RED SKY GROUP no constituira renuncia a dicho derecho.",
              },
              {
                type: "paragraph",
                text: "El ejercicio parcial de un derecho no impedira su ejercicio posterior.",
              },
            ],
          },
          {
            title: "35. Cesion",
            blocks: [
              {
                type: "paragraph",
                text: "La persona usuaria no podra ceder, transferir o transmitir los derechos derivados de una relacion contractual con RED SKY GROUP sin autorizacion previa y por escrito, cuando dicha autorizacion sea legalmente necesaria.",
              },
              {
                type: "paragraph",
                text: "RED SKY GROUP podra utilizar operadores, proveedores y terceros para ejecutar los servicios conforme a los contratos aplicables.",
              },
            ],
          },
          {
            title: "36. Legislacion aplicable",
            blocks: [
              {
                type: "paragraph",
                text: "Los presentes Terminos se regiran por la legislacion mexicana aplicable, sin perjuicio de las disposiciones imperativas que resulten aplicables a operaciones internacionales.",
              },
              {
                type: "paragraph",
                text: "Nada de lo establecido en estos Terminos pretende excluir derechos o protecciones que la legislacion aplicable reconozca de manera irrenunciable.",
              },
            ],
          },
        ],
      }
);
</script>

<style scoped>
.terms-page {
  background: #0f1720;
  color: #e5e7eb;
}

.terms-hero {
  position: relative;
  min-height: 68vh;
  background:
    linear-gradient(135deg, rgba(10, 18, 30, 0.9), rgba(18, 34, 56, 0.7)),
    url("https://images.pexels.com/photos/46148/aircraft-jet-landing-cloud-46148.jpeg?auto=compress&cs=tinysrgb&w=1600");
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.terms-hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at top, rgba(200, 164, 93, 0.16), transparent 38%),
    linear-gradient(180deg, rgba(8, 14, 24, 0.1), rgba(8, 14, 24, 0.52));
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: #fff;
}

.hero-content span {
  color: #c8a45d;
  font-size: 0.78rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
}

.hero-content h1 {
  margin-top: 1rem;
  font-size: clamp(2.2rem, 4vw, 3.8rem);
  line-height: 1.08;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 80px 20px;
}

.terms-card {
  background: linear-gradient(180deg, rgba(19, 28, 38, 0.98), rgba(14, 22, 31, 0.98));
  border: 1px solid rgba(200, 164, 93, 0.14);
  border-radius: 18px;
  padding: 50px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.42);
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
  margin-top: 0.65rem;
  opacity: 0.82;
}

.update {
  margin-top: 1rem;
  color: rgba(229, 231, 235, 0.74);
}

.terms-section + .terms-section {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(148, 163, 184, 0.12);
}

.terms-card h2 {
  margin: 0 0 1rem;
  color: #fff;
  font-size: 1.3rem;
}

.terms-card p {
  margin: 0 0 0.95rem;
  line-height: 1.78;
  opacity: 0.9;
}

.terms-card ul {
  margin: 0 0 1rem 1.2rem;
  padding: 0;
}

.terms-card li {
  margin-bottom: 0.7rem;
  line-height: 1.72;
  opacity: 0.9;
}

.terms-card h5 {
  margin: 3rem 0 0;
  color: rgba(229, 231, 235, 0.7);
  font-weight: 500;
}

@media (max-width: 767px) {
  .terms-hero {
    min-height: 52vh;
    padding: 0 20px;
  }

  .terms-card {
    padding: 32px 22px;
    border-radius: 14px;
  }

  .terms-card h2 {
    font-size: 1.12rem;
  }
}
</style>
