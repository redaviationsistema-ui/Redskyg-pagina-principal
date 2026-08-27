<template>
    <section class="faq-page">
      <section class="faq-hero">
        <div class="container">
          <span class="eyebrow">{{ content.eyebrow }}</span>
          <h1>{{ content.title }}</h1>
          <p>{{ content.text }}</p>
        </div>
      </section>

      <section class="section">
        <div class="container faq-grid">
          <article v-for="item in faqs" :key="item.question" class="faq-card">
            <h2>{{ item.question }}</h2>
            <p>{{ item.answer }}</p>
          </article>
        </div>
      </section>
    </section>
</template>

<script setup>
import { computed } from "vue";
import { useLocale } from "../i18n";

const { locale } = useLocale();

const content = computed(() =>
  locale.value === "en"
    ? {
        eyebrow: "Aviation FAQ",
        title:
          "Key answers on private charter and aviation services.",
        text:
          "This page helps resolve common questions before requesting a quote, hiring a charter, or moving forward with an aviation service.",
      }
    : {
        eyebrow: "Preguntas frecuentes",
        title:
          "Respuestas clave sobre charter privado y servicios aeronauticos.",
        text:
          "Esta pagina ayuda a resolver dudas frecuentes antes de solicitar una cotizacion, contratar un charter o avanzar con un servicio aeronautico.",
      }
);

const faqs = computed(() =>
  locale.value === "en"
    ? [
        {
          question: "How do I request a private flight quote?",
          answer:
            "Share your departure and destination airports, travel dates, passenger count, and any schedule flexibility. The more complete the request, the faster the operations team can respond.",
        },
        {
          question: "Do you only handle charter flights?",
          answer:
            "No. Sky Group also supports aircraft acquisition and sales, operational management, pre-purchase advisory, avionics, engine coordination, and import-export services.",
        },
        {
          question: "Can you support flights outside Mexico?",
          answer:
            "Yes. The company supports both domestic and international aviation needs depending on aircraft availability, route profile, permits, and regulatory requirements.",
        },
        {
          question: "Do you help owners who already have an aircraft?",
          answer:
            "Yes. Aircraft owners can request management support, technical coordination, compliance oversight, and specialized advisory for operations and asset protection.",
        },
        {
          question: "What is the difference between co-ownership and fractional ownership?",
          answer:
            "Co-ownership typically involves a smaller group sharing one aircraft directly, while fractional ownership is a more structured model with defined shares, hours, and management frameworks.",
        },
        {
          question: "Can you assist with technical review before buying an aircraft?",
          answer:
            "Yes. Pre-purchase advisory includes technical inspection coordination, maintenance record review, valuation support, and risk analysis before closing.",
        },
      ]
    : [
        {
          question: "Como solicito una cotizacion de vuelo privado?",
          answer:
            "Comparte aeropuertos de salida y destino, fechas de viaje, numero de pasajeros y cualquier flexibilidad de horario. Mientras mas completa sea la solicitud, mas rapido puede responder el equipo de operaciones.",
        },
        {
          question: "Solo manejan vuelos charter?",
          answer:
            "No. Sky Group tambien apoya compra y venta de aeronaves, gestion operativa, asesoria precompra, avionica, coordinacion de motores e importacion y exportacion.",
        },
        {
          question: "Pueden apoyar vuelos fuera de Mexico?",
          answer:
            "Si. La empresa atiende necesidades aeronauticas nacionales e internacionales segun disponibilidad de aeronave, perfil de ruta, permisos y requerimientos regulatorios.",
        },
        {
          question: "Ayudan a propietarios que ya tienen aeronave?",
          answer:
            "Si. Los propietarios pueden solicitar soporte de administracion, coordinacion tecnica, supervision de cumplimiento y asesoria especializada para operacion y proteccion del activo.",
        },
        {
          question: "Cual es la diferencia entre copropiedad y propiedad fraccional?",
          answer:
            "La copropiedad normalmente implica un grupo pequeno que comparte directamente una aeronave, mientras la propiedad fraccional es un modelo mas estructurado con participaciones, horas y esquemas de administracion definidos.",
        },
        {
          question: "Pueden ayudar con la revision tecnica antes de comprar una aeronave?",
          answer:
            "Si. La asesoria precompra incluye coordinacion de inspeccion tecnica, revision de historiales de mantenimiento, apoyo de valuacion y analisis de riesgo antes del cierre.",
        },
      ]
);
</script>

<style scoped>
.faq-page {
  background: linear-gradient(180deg, #071320 0%, #0b1220 100%);
  color: white;
  min-height: 100vh;
}

.faq-hero {
  padding: 11rem 0 4rem;
  text-align: center;
}

.eyebrow {
  color: #d8b26e;
  letter-spacing: 0.24em;
  font-size: 0.76rem;
  text-transform: uppercase;
}

.faq-hero h1 {
  max-width: 900px;
  margin: 1rem auto;
  font-size: clamp(2.2rem, 4vw, 4rem);
}

.faq-hero p,
.faq-card p {
  color: rgba(255, 255, 255, 0.76);
  line-height: 1.8;
}

.faq-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.faq-card {
  padding: 1.6rem;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.faq-card h2 {
  margin-bottom: 0.8rem;
  font-size: 1.3rem;
}

@media (max-width: 900px) {
  .faq-grid {
    grid-template-columns: 1fr;
  }
}
</style>
