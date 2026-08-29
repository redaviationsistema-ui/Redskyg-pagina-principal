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
          "Key answers on executive aviation services.",
        text:
          "Review common questions before requesting private flights, aircraft advisory or specialized operational support.",
      }
    : {
        eyebrow: "Preguntas frecuentes",
        title:
          "Respuestas clave sobre servicios de aviación ejecutiva.",
        text:
          "Revise dudas frecuentes antes de solicitar vuelos privados, asesoría de aeronaves o soporte operativo especializado.",
      }
);

const faqs = computed(() =>
  locale.value === "en"
    ? [
        {
          question: "How do I request a private flight quote?",
          answer:
            "Share your departure and destination airports, travel dates, passenger count, baggage profile and any schedule flexibility. The more precise the request, the faster the operations team can evaluate availability and respond.",
        },
        {
          question: "Do you only handle charter flights?",
          answer:
            "No. Sky Group also supports aircraft acquisitions and sales, operational management, pre-purchase advisory, avionics, engine coordination and import-export services.",
        },
        {
          question: "Can you support flights outside Mexico?",
          answer:
            "Yes. We support domestic and international aviation requirements depending on aircraft availability, route profile, permits and regulatory conditions.",
        },
        {
          question: "Do you help owners who already have an aircraft?",
          answer:
            "Yes. Aircraft owners can request management support, technical coordination, compliance oversight and specialized advisory for operations and asset protection.",
        },
        {
          question: "What is the difference between co-ownership and fractional ownership?",
          answer:
            "Co-ownership typically involves a smaller group sharing one aircraft directly, while fractional ownership is a more structured model with defined shares, hours, and management frameworks.",
        },
        {
          question: "Can you assist with technical review before buying an aircraft?",
          answer:
            "Yes. Pre-purchase advisory includes technical inspection coordination, maintenance record review, valuation support and risk analysis before closing.",
        },
      ]
    : [
        {
          question: "¿Cómo solicito una cotización de vuelo privado?",
          answer:
            "Comparta aeropuertos de salida y destino, fechas de viaje, número de pasajeros, perfil de equipaje y cualquier flexibilidad de horario. Mientras más precisa sea la solicitud, más rápido podremos evaluar disponibilidad y respuesta.",
        },
        {
          question: "¿Solo manejan vuelos charter?",
          answer:
            "No. Sky Group también apoya compra y venta de aeronaves, gestión operativa, asesoría precompra, aviónica, coordinación de motores e importación y exportación.",
        },
        {
          question: "¿Pueden apoyar vuelos fuera de México?",
          answer:
            "Sí. Atendemos requerimientos aeronáuticos nacionales e internacionales según disponibilidad de aeronave, perfil de ruta, permisos y condiciones regulatorias.",
        },
        {
          question: "¿Ayudan a propietarios que ya tienen aeronave?",
          answer:
            "Sí. Los propietarios pueden solicitar soporte de administración, coordinación técnica, supervisión de cumplimiento y asesoría especializada para la operación y protección del activo.",
        },
        {
          question: "¿Cuál es la diferencia entre copropiedad y propiedad fraccional?",
          answer:
            "La copropiedad normalmente implica un grupo pequeño que comparte directamente una aeronave, mientras que la propiedad fraccional es un modelo más estructurado con participaciones, horas y esquemas de administración definidos.",
        },
        {
          question: "¿Pueden ayudar con la revisión técnica antes de comprar una aeronave?",
          answer:
            "Sí. La asesoría precompra incluye coordinación de inspección técnica, revisión de historiales de mantenimiento, apoyo de valuación y análisis de riesgo antes del cierre.",
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
