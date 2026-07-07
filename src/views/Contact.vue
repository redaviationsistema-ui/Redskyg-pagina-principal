<template>
    <section class="contact-page">
      <section class="contact-hero">
        <div class="hero-backdrop"></div>
        <div class="hero-grid container">
          <div class="hero-copy">
            <span class="eyebrow">{{ content.heroEyebrow }}</span>
            <h1>
              {{ content.heroTitlePrefix }}
              <span>{{ content.heroTitleHighlight }}</span>
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
              <p>
                {{ content.heroStripText }}
              </p>
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
        heroEyebrow: "Private Flights in Mexico",
        heroTitlePrefix: "Quote your next",
        heroTitleHighlight: "private jet charter",
        heroTitleSuffix: "with an expert team.",
        heroText:
          "Private flights in Mexico, private jet charter in Mexico, technical coordination, and operational support under one premium team for fast, high-value decisions.",
        heroStripText:
          "Immediate support for owners, operators, and executive aviation clients.",
        asideLabel: "Flight Operations Window",
        introKicker: "Why clients reach us",
        introTitle: "A premium contact page with more confidence and momentum.",
        introText:
          "We redesigned this experience to feel more aligned with modern private aviation brands: darker cockpit tones, stronger contrast, sharper spacing, and clearer trust signals.",
        benefitsKicker: "Operational advantages",
        benefitsTitle: "Built to look premium and convert better.",
        formKicker: "Request consultation",
        formTitle: "Schedule your aviation brief",
        formText:
          "Share your operation, aircraft, or mission needs and our team will follow up with the right specialist.",
        nameLabel: "Full Name",
        emailLabel: "Email Address",
        serviceLabel: "Service Category",
        servicePlaceholder: "Select Service",
        messageLabel: "Mission Details",
        messagePlaceholder:
          "Tell us about your aircraft, route, operational goal, or advisory request.",
        submitLabel: "Submit Request",
        sendingLabel: "Sending...",
        successLabel: "Consultation request sent successfully.",
        modalTitle: "Message Received",
        modalText:
          "We have received your consultation request. Our executive team will contact you shortly.",
        closeLabel: "Close",
        serverError: "Server error: ",
        genericError: "Error sending request. Please try again.",
      }
    : {
        heroEyebrow: "Vuelos Privados en Mexico",
        heroTitlePrefix: "Cotiza tu siguiente",
        heroTitleHighlight: "private jet charter",
        heroTitleSuffix: "con un equipo experto.",
        heroText:
          "Vuelos privados en Mexico, private jet charter in Mexico, coordinacion tecnica y soporte operativo bajo un mismo equipo premium para decisiones rapidas y de alto valor.",
        heroStripText:
          "Soporte inmediato para propietarios, operadores y clientes de aviacion ejecutiva.",
        asideLabel: "Ventana de operaciones de vuelo",
        introKicker: "Por que nos contactan",
        introTitle: "Una pagina de contacto premium con mas confianza y avance.",
        introText:
          "Redisenamos esta experiencia para alinearla mejor con marcas modernas de aviacion privada: tonos mas sobrios, mayor contraste, mejor jerarquia y senales de confianza mas claras.",
        benefitsKicker: "Ventajas operativas",
        benefitsTitle: "Disenada para verse premium y convertir mejor.",
        formKicker: "Solicitar asesoria",
        formTitle: "Agenda tu brief aeronautico",
        formText:
          "Comparte tu operacion, aeronave o necesidad de mision y nuestro equipo te dara seguimiento con el especialista correcto.",
        nameLabel: "Nombre completo",
        emailLabel: "Correo electronico",
        serviceLabel: "Categoria de servicio",
        servicePlaceholder: "Selecciona un servicio",
        messageLabel: "Detalles de la mision",
        messagePlaceholder:
          "Cuentanos sobre tu aeronave, ruta, objetivo operativo o solicitud de asesoria.",
        submitLabel: "Enviar solicitud",
        sendingLabel: "Enviando...",
        successLabel: "La solicitud de asesoria se envio correctamente.",
        modalTitle: "Mensaje recibido",
        modalText:
          "Hemos recibido tu solicitud de asesoria. Nuestro equipo ejecutivo se pondra en contacto contigo en breve.",
        closeLabel: "Cerrar",
        serverError: "Error del servidor: ",
        genericError: "Error al enviar la solicitud. Intentalo de nuevo.",
      }
);

const serviceOptions = computed(() =>
  locale.value === "en"
    ? [
        "Aircraft Acquisition",
        "Executive Charter",
        "Operational Management",
        "Import & Export",
        "Engine & Technical",
      ]
    : [
        "Adquisicion de aeronaves",
        "Charter ejecutivo",
        "Gestion operativa",
        "Importacion y exportacion",
        "Motores y soporte tecnico",
      ]
);

const highlights = computed(() =>
  locale.value === "en"
    ? [
        { value: "24/7", label: "Executive support coverage" },
        { value: "5", label: "Core service divisions" },
        { value: "1", label: "Single premium contact point" },
      ]
    : [
        { value: "24/7", label: "Cobertura de soporte ejecutivo" },
        { value: "5", label: "Divisiones clave de servicio" },
        { value: "1", label: "Punto premium de contacto" },
      ]
);

const responseFlow = computed(() =>
  locale.value === "en"
    ? [
        {
          step: "01",
          title: "Initial Review",
          description: "We identify the right team based on your mission profile.",
        },
        {
          step: "02",
          title: "Strategic Follow-Up",
          description: "A specialist connects with you to scope aircraft or operations.",
        },
        {
          step: "03",
          title: "Execution Path",
          description: "We define next actions with clarity, timing, and oversight.",
        },
      ]
    : [
        {
          step: "01",
          title: "Revision inicial",
          description: "Identificamos el equipo correcto segun el perfil de tu mision.",
        },
        {
          step: "02",
          title: "Seguimiento estrategico",
          description: "Un especialista se pone en contacto para definir el alcance de la aeronave u operacion.",
        },
        {
          step: "03",
          title: "Ruta de ejecucion",
          description: "Definimos los siguientes pasos con claridad, tiempos y supervision.",
        },
      ]
);

const contactChannels = computed(() =>
  locale.value === "en"
    ? [
        {
          tag: "Direct Email",
          title: "Executive coordination",
          text: "For acquisition, charter, technical supervision, and operator support.",
          link: "Direccion.general@redskyg.com",
          href: "mailto:Direccion.general@redskyg.com",
        },
        {
          tag: "Availability",
          title: "Always within reach",
          text: "Continuous attention for owners, aviation managers, and urgent requests.",
          link: "24/7 Response Window",
          href: "#",
        },
        {
          tag: "Coverage",
          title: "Multi-service approach",
          text: "One page, one form, and one premium entry point for your full operation.",
          link: "Integrated Aviation Support",
          href: "#",
        },
      ]
    : [
        {
          tag: "Correo directo",
          title: "Coordinacion ejecutiva",
          text: "Para adquisicion, charter, supervision tecnica y soporte a operadores.",
          link: "Direccion.general@redskyg.com",
          href: "mailto:Direccion.general@redskyg.com",
        },
        {
          tag: "Disponibilidad",
          title: "Siempre a tu alcance",
          text: "Atencion continua para propietarios, gerentes de aviacion y solicitudes urgentes.",
          link: "Ventana de respuesta 24/7",
          href: "#",
        },
        {
          tag: "Cobertura",
          title: "Enfoque multiservicio",
          text: "Una pagina, un formulario y un punto premium de entrada para toda tu operacion.",
          link: "Soporte aeronautico integrado",
          href: "#",
        },
      ]
);

const benefits = computed(() =>
  locale.value === "en"
    ? [
        {
          index: "01",
          title: "Sharper first impression",
          description:
            "The page now feels closer to luxury aviation brands with stronger hierarchy and atmosphere.",
        },
        {
          index: "02",
          title: "Better content distribution",
          description:
            "Contact information, trust cues, and the form are separated clearly so scanning feels effortless.",
        },
        {
          index: "03",
          title: "More conversion-focused",
          description:
            "The form is supported by context, response steps, and service framing that reduce friction.",
        },
      ]
    : [
        {
          index: "01",
          title: "Primera impresion mas solida",
          description:
            "La pagina ahora se siente mas cercana a marcas de aviacion de lujo, con mejor jerarquia y atmosfera.",
        },
        {
          index: "02",
          title: "Mejor distribucion del contenido",
          description:
            "La informacion de contacto, las senales de confianza y el formulario estan separadas con claridad para facilitar la lectura.",
        },
        {
          index: "03",
          title: "Mas orientada a conversion",
          description:
            "El formulario esta respaldado por contexto, pasos de respuesta y encuadre de servicios que reducen friccion.",
        },
      ]
);

const panelCommitments = computed(() =>
  locale.value === "en"
    ? [
        {
          title: "Fast Routing",
          text: "Your request is directed to the correct aviation division.",
        },
        {
          title: "Private Handling",
          text: "Sensitive operational details remain within our internal team.",
        },
      ]
    : [
        {
          title: "Canalizacion rapida",
          text: "Tu solicitud se dirige a la division aeronautica correcta.",
        },
        {
          title: "Atencion privada",
          text: "Los detalles operativos sensibles permanecen dentro de nuestro equipo interno.",
        },
      ]
);

const trustItems = computed(() =>
  locale.value === "en"
    ? [
        {
          metric: "Mission Ready",
          title: "Aviation-first design",
          text: "Luxury dark surfaces, metallic accents, and clearer visual structure.",
        },
        {
          metric: "Modern UX",
          title: "Cleaner interaction flow",
          text: "Form readability and information pacing are now much stronger on desktop and mobile.",
        },
        {
          metric: "Brand Presence",
          title: "Higher-end visual tone",
          text: "The page now communicates precision, control, and executive positioning.",
        },
      ]
    : [
        {
          metric: "Listo para mision",
          title: "Diseno centrado en aviacion",
          text: "Superficies oscuras, acentos metalicos y una estructura visual mas clara.",
        },
        {
          metric: "UX moderna",
          title: "Flujo de interaccion mas limpio",
          text: "La legibilidad del formulario y el ritmo de la informacion son ahora mas fuertes en desktop y mobile.",
        },
        {
          metric: "Presencia de marca",
          title: "Tono visual de mayor nivel",
          text: "La pagina ahora comunica precision, control y posicionamiento ejecutivo.",
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
    linear-gradient(135deg, rgba(4, 13, 25, 0.94), rgba(4, 13, 25, 0.7)),
    url("/images/Home/home2.jpg") center/cover no-repeat;
  opacity: 0.62;
  transform: scale(1.05);
}

.contact-hero::after {
  content: "";
  position: absolute;
  inset: auto 0 0 0;
  height: 220px;
  background: linear-gradient(180deg, transparent, rgba(6, 16, 29, 0.9));
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
  color: #7bb7ff;
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
  border-color: rgba(123, 183, 255, 0.9);
  transform: translateY(-1px);
  box-shadow: 0 0 0 4px rgba(77, 163, 255, 0.12);
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
  background: linear-gradient(135deg, #d4af37, #f4d97f 55%, #7bb7ff 100%);
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
