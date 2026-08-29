<template>
    <section class="contact-page">
      <section class="contact-hero">
        <div class="hero-backdrop"></div>
        <div class="hero-grid container">
          <div class="hero-copy">
            <span class="eyebrow">{{ content.heroEyebrow }}</span>
            <h1>
              {{ content.heroTitlePrefix }}
              <span>{{ content.heroTitleAccent }}</span>
              {{ content.heroTitleSuffix }}
            </h1>
            <p class="hero-text">
              {{ content.heroText }}
            </p>

            <div class="hero-highlights">
              <article
                v-for="highlight in highlights"
                :key="highlight.label"
                class="highlight-stat"
              >
                <strong>{{ highlight.value }}</strong>
                <span>{{ highlight.label }}</span>
              </article>
            </div>

            <div class="hero-strip">
              <div class="strip-line"></div>
              <p>{{ content.heroStripText }}</p>
            </div>
          </div>

          <div class="hero-aside response-panel">
            <p class="aside-label">{{ content.asideLabel }}</p>
            <div class="aside-grid">
              <article v-for="item in responseFlow" :key="item.title">
                <span>{{ item.step }}</span>
                <h3>{{ item.title }}</h3>
                <p>{{ item.description }}</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section class="contact-content container">
        <div class="content-grid">
          <div class="contact-info">
            <div class="section-block intro-panel">
              <span class="section-kicker">{{ content.introKicker }}</span>
              <h2>{{ content.introTitle }}</h2>
              <p>{{ content.introText }}</p>
            </div>

            <div class="section-block contact-directory">
              <article
                v-for="channel in contactChannels"
                :key="channel.title"
                class="directory-item"
              >
                <span>{{ channel.tag }}</span>
                <h3>{{ channel.title }}</h3>
                <p>{{ channel.text }}</p>
                <a :href="channel.href">{{ channel.link }}</a>
              </article>
            </div>

            <div class="section-block benefits-panel">
              <div class="benefits-header">
                <span class="section-kicker">{{ content.benefitsKicker }}</span>
                <h2>{{ content.benefitsTitle }}</h2>
              </div>

              <div class="benefits-list">
                <article
                  v-for="benefit in benefits"
                  :key="benefit.title"
                  class="benefit-item"
                >
                  <div class="benefit-index">{{ benefit.index }}</div>
                  <div>
                    <h3>{{ benefit.title }}</h3>
                    <p>{{ benefit.description }}</p>
                  </div>
                </article>
              </div>
            </div>
          </div>

          <div class="contact-panel">
            <div class="panel-shell">
              <div class="panel-heading">
                <span class="section-kicker">{{ content.formKicker }}</span>
                <h2>{{ content.formTitle }}</h2>
                <p>{{ content.formText }}</p>
              </div>

              <form class="contact-form" @submit.prevent="submitForm">
                <div class="input-group">
                  <label for="name">{{ content.nameLabel }}</label>
                  <input id="name" type="text" v-model="form.name" required />
                </div>

                <div class="input-group">
                  <label for="email">{{ content.emailLabel }}</label>
                  <input
                    id="email"
                    type="email"
                    v-model="form.email"
                    required
                  />
                </div>

                <div class="input-group">
                  <label for="service">{{ content.serviceLabel }}</label>
                  <select id="service" v-model="form.service" required>
                    <option disabled value="">{{ content.servicePlaceholder }}</option>
                    <option
                      v-for="option in serviceOptions"
                      :key="option"
                      :value="option"
                    >
                      {{ option }}
                    </option>
                  </select>
                </div>

                <div class="input-group">
                  <label for="message">{{ content.messageLabel }}</label>
                  <textarea
                    id="message"
                    rows="5"
                    v-model="form.message"
                    :placeholder="content.messagePlaceholder"
                    required
                  ></textarea>
                </div>

                <button class="btn-submit" :disabled="loading">
                  <span v-if="!loading">{{ content.submitLabel }}</span>
                  <span v-else>{{ content.sendingLabel }}</span>
                </button>

                <p v-if="success" class="success-msg">
                  {{ content.successLabel }}
                </p>

                <p v-if="errorMsg" class="error-msg">
                  {{ errorMsg }}
                </p>
              </form>

              <div class="panel-footer">
                <div
                  v-for="commitment in panelCommitments"
                  :key="commitment.title"
                  class="panel-foot-item"
                >
                  <strong>{{ commitment.title }}</strong>
                  <span>{{ commitment.text }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="trust-band">
        <div class="container trust-grid">
          <article v-for="item in trustItems" :key="item.title">
            <span>{{ item.metric }}</span>
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
          </article>
        </div>
      </section>
    </section>

    <transition name="fade">
      <div v-if="showModal" class="success-overlay" @click="showModal = false">
        <div class="success-modal" @click.stop>
          <div class="checkmark">OK</div>
          <h2>{{ content.modalTitle }}</h2>
          <p>{{ content.modalText }}</p>
          <button class="close-modal" @click="showModal = false">{{ content.closeLabel }}</button>
        </div>
      </div>
    </transition>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import axios from "axios";
import { useLocale } from "../i18n";

const { locale } = useLocale();

const content = computed(() =>
  locale.value === "en"
    ? {
        heroEyebrow: "Contact Sky Group",
        heroTitlePrefix: "Coordinate your next",
        heroTitleAccent: "aviation requirement",
        heroTitleSuffix: "with the right team.",
        heroText:
          "Use this channel for private flights, aircraft transactions, components sourcing, operational coordination and specialized aviation support.",
        heroStripText:
          "Direct support for owners, operators, flight departments and executive aviation clients.",
        asideLabel: "Operations Response Flow",
        introKicker: "Why clients reach us",
        introTitle: "Commercial and operational contact for executive aviation.",
        introText:
          "Share your mission profile, aircraft requirement or technical request and we will route it to the right commercial, operational or technical team.",
        benefitsKicker: "Operational advantages",
        benefitsTitle: "Built for clearer aviation coordination.",
        formKicker: "Request coordination",
        formTitle: "Submit your aviation brief",
        formText:
          "Share the route, aircraft, technical scope or transaction requirement and our team will coordinate the follow-up through the right point of contact.",
        nameLabel: "Full Name",
        emailLabel: "Email Address",
        serviceLabel: "Service Category",
        servicePlaceholder: "Select Service",
        messageLabel: "Mission Details",
        messagePlaceholder:
          "Tell us about your aircraft, route, operational objective or coordination requirement.",
        submitLabel: "Submit Request",
        sendingLabel: "Sending...",
        successLabel: "Coordination request sent successfully.",
        modalTitle: "Message Received",
        modalText:
          "We have received your request. The appropriate aviation team will contact you shortly.",
        closeLabel: "Close",
        serverError: "Server error: ",
        genericError: "Error sending request. Please try again.",
      }
    : {
        heroEyebrow: "Contactar a Sky Group",
        heroTitlePrefix: "Coordina tu siguiente",
        heroTitleAccent: "requerimiento aeronáutico",
        heroTitleSuffix: "con el equipo correcto.",
        heroText:
          "Utilice este canal para vuelos privados, transacciones de aeronaves, suministro de componentes, coordinación operativa y soporte aeronáutico especializado.",
        heroStripText:
          "Atención directa para propietarios, operadores, departamentos de vuelo y clientes de aviación ejecutiva.",
        asideLabel: "Ruta de atención operativa",
        introKicker: "Por que nos contactan",
        introTitle: "Contacto comercial y operativo para aviacion ejecutiva.",
        introText:
          "Comparta su requerimiento de vuelo, aeronave o soporte técnico y lo canalizaremos con el equipo comercial, operativo o técnico correspondiente.",
        benefitsKicker: "Ventajas operativas",
        benefitsTitle: "Pensada para una coordinación aeronáutica más clara.",
        formKicker: "Solicitar coordinacion",
        formTitle: "Comparta su requerimiento aeronáutico",
        formText:
          "Comparta la ruta, aeronave, alcance técnico o requerimiento transaccional y nuestro equipo coordinará el seguimiento a través del punto de contacto adecuado.",
        nameLabel: "Nombre completo",
        emailLabel: "Correo electrónico",
        serviceLabel: "Categoría de servicio",
        servicePlaceholder: "Selecciona un servicio",
        messageLabel: "Detalles de la misión",
        messagePlaceholder:
          "Comparta información sobre su aeronave, ruta, objetivo operativo o requerimiento de coordinación.",
        submitLabel: "Enviar solicitud",
        sendingLabel: "Enviando...",
        successLabel: "La solicitud de coordinación se envió correctamente.",
        modalTitle: "Mensaje recibido",
        modalText:
          "Hemos recibido su solicitud. El equipo aeronáutico correspondiente se pondrá en contacto en breve.",
        closeLabel: "Cerrar",
        serverError: "Error del servidor: ",
        genericError: "Error al enviar la solicitud. Inténtelo de nuevo.",
      }
);

const serviceOptions = computed(() =>
  locale.value === "en"
    ? [
        "Aircraft Acquisition",
        "Private Charter",
        "Flight Operations",
        "Import & Export",
        "Parts & Technical Support",
      ]
    : [
        "Adquisición de aeronaves",
        "Vuelos privados",
        "Operaciones de vuelo",
        "Importación y exportación",
        "Componentes y soporte técnico",
      ]
);

const highlights = computed(() =>
  locale.value === "en"
    ? [
        { value: "24/7", label: "Operational response window" },
        { value: "5", label: "Core service divisions" },
        { value: "1", label: "Dedicated aviation contact point" },
      ]
    : [
        { value: "24/7", label: "Ventana de respuesta operativa" },
        { value: "5", label: "Divisiones clave de servicio" },
        { value: "1", label: "Punto único de contacto aeronáutico" },
      ]
);

const responseFlow = computed(() =>
  locale.value === "en"
    ? [
        {
          step: "01",
          title: "Initial Review",
          description: "We identify the right team based on your mission profile, aircraft need or technical scope.",
        },
        {
          step: "02",
          title: "Specialist Routing",
          description: "The request is assigned to the right charter, transaction, components or technical support team.",
        },
        {
          step: "03",
          title: "Execution Path",
          description: "We define the next action, timing, and operational follow-up.",
        },
      ]
    : [
        {
          step: "01",
          title: "Revisión inicial",
          description: "Identificamos el equipo correcto según el perfil de su misión, necesidad de aeronave o alcance técnico.",
        },
        {
          step: "02",
          title: "Canalizacion especializada",
          description: "La solicitud se asigna al equipo correcto de charter, transacciones, componentes o soporte técnico.",
        },
        {
          step: "03",
          title: "Ruta de ejecución",
          description: "Definimos el siguiente paso, los tiempos y el seguimiento operativo.",
        },
      ]
);

const contactChannels = computed(() =>
  locale.value === "en"
    ? [
        {
          tag: "Direct Email",
          title: "Commercial coordination",
          text: "For private charter, aircraft transactions, technical review, and operator support.",
          link: "Direccion.general@redskyg.com",
          href: "mailto:Direccion.general@redskyg.com",
        },
        {
          tag: "Availability",
          title: "Response window",
          text: "Continuous attention for owners, operators, flight departments, and urgent requirements.",
          link: "24/7 Response Window",
          href: "#",
        },
        {
          tag: "Coverage",
          title: "Aviation scope",
          text: "One contact channel for charter, sourcing, technical support, and operational coordination.",
          link: "Executive Aviation Support",
          href: "#",
        },
      ]
    : [
        {
          tag: "Correo directo",
          title: "Coordinación comercial",
          text: "Para vuelos privados, transacciones de aeronaves, revisión técnica y soporte a operadores.",
          link: "Direccion.general@redskyg.com",
          href: "mailto:Direccion.general@redskyg.com",
        },
        {
          tag: "Disponibilidad",
          title: "Ventana de respuesta",
          text: "Atención continua para propietarios, operadores, departamentos de vuelo y requerimientos urgentes.",
          link: "Ventana de respuesta 24/7",
          href: "#",
        },
        {
          tag: "Cobertura",
          title: "Alcance aeronáutico",
          text: "Un canal de contacto para charter, localización de aeronaves, soporte técnico y coordinación operativa.",
          link: "Soporte de aviación ejecutiva",
          href: "#",
        },
      ]
);

const benefits = computed(() =>
  locale.value === "en"
    ? [
        {
          index: "01",
          title: "Single aviation entry point",
          description:
            "One channel routes the request to charter, transactions, technical support, or flight operations.",
        },
        {
          index: "02",
          title: "Faster internal routing",
          description:
            "The team can review mission scope and assign the right specialist with less delay.",
        },
        {
          index: "03",
          title: "Operational clarity",
          description:
            "The client shares the requirement once and receives a clearer next step.",
        },
      ]
    : [
        {
          index: "01",
          title: "Un solo canal aeronáutico",
          description:
            "Un mismo canal dirige la solicitud a charter, transacciones, soporte técnico u operaciones de vuelo.",
        },
        {
          index: "02",
          title: "Canalización más ágil",
          description:
            "El equipo revisa el alcance de la misión y asigna al especialista correcto con menos demora.",
        },
        {
          index: "03",
          title: "Claridad operativa",
          description:
            "El cliente comparte el requerimiento una sola vez y recibe un siguiente paso más claro.",
        },
      ]
);

const panelCommitments = computed(() =>
  locale.value === "en"
    ? [
        {
          title: "Fast Routing",
          text: "Your request is directed to the right charter, transaction, or technical support team.",
        },
        {
          title: "Confidential Handling",
          text: "Sensitive commercial and operational details remain within our internal team.",
        },
      ]
    : [
        {
          title: "Canalización rápida",
          text: "Su solicitud se dirige al equipo correcto de charter, transacciones o soporte técnico.",
        },
        {
          title: "Atención confidencial",
          text: "Los detalles comerciales y operativos sensibles permanecen dentro de nuestro equipo interno.",
        },
      ]
);

const trustItems = computed(() =>
  locale.value === "en"
    ? [
        {
          metric: "24/7",
          title: "Operational response",
          text: "Requests can be reviewed quickly when timing, availability, or technical scope matter.",
        },
        {
          metric: "Multi-Service",
          title: "Cross-functional support",
          text: "Commercial, technical, and operational teams can work from the same requirement.",
        },
        {
          metric: "Direct",
          title: "Single contact path",
          text: "Clients avoid fragmented follow-up across multiple aviation providers or departments.",
        },
      ]
    : [
        {
          metric: "24/7",
          title: "Respuesta operativa",
          text: "Las solicitudes pueden revisarse con rapidez cuando importan los tiempos, la disponibilidad o el alcance técnico.",
        },
        {
          metric: "Multiservicio",
          title: "Soporte transversal",
          text: "Los equipos comercial, técnico y operativo pueden trabajar desde un mismo requerimiento.",
        },
        {
          metric: "Directo",
          title: "Ruta única de contacto",
          text: "El cliente evita seguimientos fragmentados entre varios proveedores o departamentos aeronáuticos.",
        },
      ]
);

const form = reactive({
  name: "",
  email: "",
  service: "",
  message: "",
});

const loading = ref(false);
const success = ref(false);
const errorMsg = ref("");
const showModal = ref(false);

const submitForm = async () => {
  loading.value = true;
  errorMsg.value = "";
  success.value = false;

  try {
    const response = await axios.post("https://redskyg.com/send-contact.php", {
      ...form,
    });

    if (response.data.success) {
      success.value = true;
      showModal.value = true;

      form.name = "";
      form.email = "";
      form.service = "";
      form.message = "";

      setTimeout(() => {
        showModal.value = false;
      }, 4000);
    } else {
      errorMsg.value = content.value.serverError + response.data.error;
    }
  } catch (error) {
    errorMsg.value = content.value.genericError;
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.contact-page {
  background:
    radial-gradient(circle at top left, rgba(77, 163, 255, 0.16), transparent 26%),
    radial-gradient(circle at top right, rgba(212, 175, 55, 0.12), transparent 24%),
    linear-gradient(180deg, #06101d 0%, #091728 45%, #0b1220 100%);
  color: white;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
}

.contact-hero {
  position: relative;
  padding: 10rem 0 4rem;
  overflow: hidden;
}

.hero-backdrop {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(5, 13, 23, 0.68) 0%, rgba(5, 13, 23, 0.48) 34%, rgba(5, 13, 23, 0.2) 62%, rgba(5, 13, 23, 0.38) 100%),
    linear-gradient(180deg, rgba(5, 13, 23, 0.08), rgba(5, 13, 23, 0.28)),
    url("/images/contacto/MM1.jpg") center/cover no-repeat;
  opacity: 1;
  transform: scale(1.05);
}

.contact-hero::after {
  content: "";
  position: absolute;
  inset: auto 0 0 0;
  height: 220px;
  background: linear-gradient(180deg, transparent, rgba(5, 13, 23, 0.22));
}

.hero-grid {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(320px, 0.8fr);
  gap: 2rem;
  align-items: end;
}

.hero-copy h1 {
  max-width: 760px;
  font-size: clamp(3rem, 6vw, 5.6rem);
  line-height: 0.95;
  margin: 1rem 0 1.5rem;
}

.hero-copy h1 span {
  display: inline-block;
  color: #d4af37;
  text-shadow: 0 10px 30px rgba(212, 175, 55, 0.12);
}

.eyebrow,
.section-kicker,
.aside-label {
  display: inline-block;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  font-size: 0.72rem;
}

.eyebrow,
.section-kicker {
  color: #d8b26e;
}

.hero-text {
  max-width: 620px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.05rem;
  line-height: 1.8;
}

.hero-highlights {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  max-width: 720px;
  margin-top: 2rem;
}

.highlight-stat {
  position: relative;
  padding: 0 1.2rem 0 0;
  border-right: 1px solid rgba(255, 255, 255, 0.14);
}

.highlight-stat:last-child {
  border-right: 0;
}

.highlight-stat strong {
  display: block;
  font-size: 1.8rem;
  color: white;
}

.highlight-stat span {
  display: block;
  margin-top: 0.35rem;
  color: rgba(255, 255, 255, 0.64);
  font-size: 0.9rem;
}

.hero-strip {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
}

.strip-line {
  width: 90px;
  height: 1px;
  background: linear-gradient(90deg, #d4af37, transparent);
}

.hero-strip p {
  color: rgba(255, 255, 255, 0.7);
}

.response-panel {
  padding: 0.4rem 0 0.4rem 2rem;
  border-left: 1px solid rgba(212, 175, 55, 0.34);
}

.aside-label {
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 1.2rem;
}

.aside-grid {
  display: grid;
  gap: 0;
}

.aside-grid article {
  position: relative;
  padding: 0 0 1.5rem 2rem;
  border-left: 1px solid rgba(255, 255, 255, 0.16);
}

.aside-grid article::before {
  content: "";
  position: absolute;
  left: -5px;
  top: 0.1rem;
  width: 9px;
  height: 9px;
  border-radius: 999px;
  background: #d4af37;
  box-shadow: 0 0 0 6px rgba(212, 175, 55, 0.12);
}

.aside-grid article:last-child {
  padding-bottom: 0;
  border-left-color: transparent;
}

.aside-grid span {
  color: #d4af37;
  letter-spacing: 0.22em;
  font-size: 0.7rem;
}

.aside-grid h3 {
  margin: 0.65rem 0;
  font-size: 1.1rem;
}

.aside-grid p {
  color: rgba(255, 255, 255, 0.66);
  line-height: 1.7;
}

.contact-content {
  position: relative;
  z-index: 2;
  padding-bottom: 4rem;
}

.content-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(340px, 460px);
  gap: 2rem;
  align-items: start;
}

.contact-info,
.contact-panel {
  display: grid;
  gap: 1.5rem;
}

.section-block {
  border-radius: 28px;
}

.intro-panel {
  padding: 0 0 1.8rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.intro-panel h2,
.benefits-header h2,
.panel-heading h2 {
  font-size: clamp(1.8rem, 3.4vw, 2.8rem);
  margin: 0.8rem 0 1rem;
}

.intro-panel p,
.panel-heading p {
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.8;
}

.contact-directory {
  display: grid;
  gap: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.directory-item {
  display: grid;
  grid-template-columns: 170px minmax(0, 1fr) minmax(180px, 0.55fr);
  gap: 1.5rem;
  align-items: baseline;
  padding: 1.35rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.directory-item:last-child {
  border-bottom: 0;
}

.directory-item span {
  color: #7bb7ff;
  font-size: 0.75rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.directory-item h3 {
  margin: 0;
  font-size: 1.2rem;
}

.directory-item p {
  margin: 0;
  color: rgba(255, 255, 255, 0.66);
  line-height: 1.7;
}

.directory-item a {
  justify-self: end;
  color: #d4af37;
  text-decoration: none;
  text-align: right;
  overflow-wrap: anywhere;
}

.benefits-panel {
  padding: 2rem 0 0;
}

.benefits-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.2rem;
  margin-top: 1.5rem;
}

.benefit-item {
  display: block;
  padding-top: 1.1rem;
  border-top: 2px solid rgba(212, 175, 55, 0.55);
}

.benefit-index {
  color: #d4af37;
  font-weight: 700;
  letter-spacing: 0.18em;
  font-size: 0.78rem;
}

.benefit-item h3 {
  margin: 0.8rem 0 0.45rem;
}

.benefit-item p {
  color: rgba(255, 255, 255, 0.68);
  line-height: 1.7;
}

.panel-shell {
  position: sticky;
  top: 110px;
  padding: 2rem;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(18px);
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.22);
}

.contact-form {
  margin-top: 1.75rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.15rem;
}

.input-group label {
  margin-bottom: 0.55rem;
  color: rgba(255, 255, 255, 0.62);
  font-size: 0.74rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

input,
select,
textarea {
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1rem 1.05rem;
  color: white;
  font-family: inherit;
  transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
}

input::placeholder,
textarea::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: rgba(216, 178, 110, 0.9);
  transform: translateY(-1px);
  box-shadow: 0 0 0 4px rgba(216, 178, 110, 0.12);
}

select option {
  background: #0b1220;
  color: white;
}

.btn-submit,
.close-modal {
  width: 100%;
  border: none;
  border-radius: 999px;
  padding: 1rem 1.4rem;
  color: #08111d;
  cursor: pointer;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  background: linear-gradient(135deg, #d4af37, #f4d97f 55%, #d8b26e 100%);
  transition: transform 0.25s ease, box-shadow 0.25s ease, opacity 0.25s ease;
}

.btn-submit:hover,
.close-modal:hover {
  transform: translateY(-3px);
  box-shadow: 0 18px 45px rgba(212, 175, 55, 0.24);
}

.btn-submit:disabled {
  opacity: 0.7;
  cursor: wait;
}

.success-msg,
.error-msg {
  margin-top: 1rem;
  font-size: 0.92rem;
}

.success-msg {
  color: #87ffb0;
}

.error-msg {
  color: #ff8f8f;
}

.panel-footer {
  display: grid;
  gap: 0;
  margin-top: 1.6rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.panel-foot-item {
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.panel-foot-item:last-child {
  border-bottom: 0;
}

.panel-foot-item strong {
  display: block;
  margin-bottom: 0.35rem;
}

.panel-foot-item span {
  color: rgba(255, 255, 255, 0.64);
  font-size: 0.92rem;
  line-height: 1.6;
}

.trust-band {
  padding: 1rem 0 5rem;
}

.trust-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.trust-grid article {
  padding: 1.5rem 1.5rem 1.5rem 0;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}

.trust-grid article + article {
  padding-left: 1.5rem;
}

.trust-grid article:last-child {
  border-right: 0;
}

.trust-grid span {
  color: #d4af37;
  font-size: 0.76rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.trust-grid h3 {
  margin: 0.8rem 0 0.6rem;
}

.trust-grid p {
  color: rgba(255, 255, 255, 0.66);
  line-height: 1.7;
}

.success-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(3, 10, 18, 0.84);
  backdrop-filter: blur(12px);
  z-index: 9999;
}

.success-modal {
  width: min(92vw, 420px);
  padding: 2rem;
  border-radius: 28px;
  text-align: center;
  background: linear-gradient(180deg, #0b1627, #08111d);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.4);
  animation: scaleIn 0.25s ease;
}

.checkmark {
  width: 72px;
  height: 72px;
  margin: 0 auto 1.2rem;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: #08111d;
  font-weight: 800;
  background: linear-gradient(135deg, #d4af37, #87ffb0);
}

.success-modal h2 {
  margin-bottom: 0.8rem;
}

.success-modal p {
  color: rgba(255, 255, 255, 0.74);
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.96);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

@media (max-width: 1100px) {
  .hero-grid,
  .content-grid,
  .trust-grid {
    grid-template-columns: 1fr;
  }

  .hero-highlights,
  .benefits-list {
    grid-template-columns: 1fr 1fr;
  }

  .response-panel {
    padding: 2rem 0 0;
    border-left: 0;
    border-top: 1px solid rgba(212, 175, 55, 0.34);
  }

  .directory-item {
    grid-template-columns: 150px minmax(0, 1fr);
  }

  .directory-item a {
    grid-column: 2;
    justify-self: start;
    text-align: left;
  }

  .panel-shell {
    position: relative;
    top: auto;
  }

  .trust-grid article,
  .trust-grid article + article {
    padding: 1.4rem 0;
    border-right: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .trust-grid article:last-child {
    border-bottom: 0;
  }
}

@media (max-width: 720px) {
  .contact-hero {
    padding-top: 8.5rem;
  }

  .container {
    padding: 0 1.2rem;
  }

  .hero-highlights,
  .benefits-list {
    grid-template-columns: 1fr;
  }

  .highlight-stat {
    padding: 0 0 1rem;
    border-right: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.14);
  }

  .highlight-stat:last-child {
    border-bottom: 0;
  }

  .directory-item {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }

  .directory-item a {
    grid-column: auto;
  }

  .benefit-index {
    display: block;
  }

  .panel-shell,
  .intro-panel,
  .benefits-panel {
    padding: 1.4rem;
  }

  .intro-panel,
  .benefits-panel {
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.03);
  }
}
</style>
