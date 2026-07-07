<template>
  <footer class="footer">
    <div class="footer-overlay">
      <section class="footer-promo">
        <div class="footer-promo-copy">
          <span class="footer-kicker">{{ promoContent.kicker }}</span>
          <h3>{{ promoContent.title }}</h3>
          <p>
            {{ promoContent.text }}
          </p>
        </div>

        <div class="footer-promo-actions">
          <a class="promo-btn primary" href="mailto:sales@redskyg.com">{{ promoContent.primaryCta }}</a>
          <a
            class="promo-btn secondary"
            href="https://wa.me/525586186576"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ promoContent.secondaryCta }}
          </a>
        </div>
      </section>

      <div class="footer-bottom">
        <section class="footer-brand card-shell">
          <div class="footer-logo">
            <span class="footer-logo-icon">S</span>
            <span>Sky Group</span>
          </div>

          <p class="brand-text">
            {{ locale.value === "en" ? "Sky Group is a private aviation company with more than two decades of experience in aircraft sales, executive charter, operational management, and technical support for high-value aviation clients." : "Sky Group es una empresa de aviacion privada con mas de dos decadas de experiencia en compra y venta de aeronaves, charter ejecutivo, administracion operativa y soporte tecnico para clientes de alto valor." }}
          </p>

          <div class="brand-meta">
            <span>{{ locale.value === "en" ? "Private Aviation" : "Aviacion privada" }}</span>
            <span>{{ locale.value === "en" ? "Operational Management" : "Administracion operativa" }}</span>
            <span>{{ locale.value === "en" ? "Technical Services" : "Servicios tecnicos" }}</span>
          </div>

          <small>
            © 2026 REDSKYG. All rights reserved.
            <RouterLink :to="toLocalizedRoute('Privacy')" class="footer-link">{{ footerMeta.privacy }}</RouterLink>
          </small>
        </section>

        <section class="footer-office card-shell">
          <div class="section-heading">
            <span>{{ locale.value === "en" ? "Head Office" : "Oficina principal" }}</span>
            <h4>{{ locale.value === "en" ? "Toluca, State of Mexico" : "Toluca, Estado de Mexico" }}</h4>
          </div>

          <p class="office-address">
            {{ locale.value === "en" ? "San Nicolas Tolentino, Toluca de Lerdo, State of Mexico, Mexico" : "San Nicolas Tolentino, Toluca de Lerdo, Estado de Mexico, Mexico" }}
          </p>

          <div class="office-grid">
            <div class="detail-group">
              <h5>{{ locale.value === "en" ? "Customer Service" : "Atencion a clientes" }}</h5>

              <p>
                <a href="#" @click.prevent="handlePhone('+527221126671')">
                  +52 722-112-6671
                </a>
              </p>
              <p>
                <a href="#" @click.prevent="handlePhone('+525586186576')">
                  +52 558-618-6576
                </a>
              </p>
              <p>
                <a href="#" @click.prevent="handlePhone('+13054646394')">
                  +1 (305) 464-6394
                </a>
              </p>
            </div>

            <div class="detail-group">
              <h5>{{ locale.value === "en" ? "Email" : "Correo" }}</h5>

              <p><a href="mailto:sales@redskyg.com">sales@redskyg.com</a></p>
              <p><a href="mailto:ventas@redskyg.com">ventas@redskyg.com</a></p>
            </div>
          </div>
        </section>

        <section class="footer-connect card-shell">
          <div class="section-heading">
            <span>{{ locale.value === "en" ? "Connect With Us" : "Conecta con nosotros" }}</span>
            <h4>{{ locale.value === "en" ? "Stay close to Sky Group" : "Mantente cerca de Sky Group" }}</h4>
          </div>

          <p class="connect-text">
            {{ locale.value === "en" ? "Follow our channels for aviation updates, charter availability, aircraft opportunities, and corporate news." : "Sigue nuestros canales para novedades de aviacion, disponibilidad de charter, oportunidades de aeronaves y noticias corporativas." }}
          </p>

          <div class="footer-social">
            <a
              href="https://www.linkedin.com/company/red-aviation-corp/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin class="social-icon" />
            </a>
            <a
              href="https://www.instagram.com/skygroup_llc/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Instagram class="social-icon" />
            </a>
            <a
              href="https://www.tiktok.com/@redaviationcompany"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              class="social-text-link"
            >
              <span>TikTok</span>
            </a>
            <a
              href="https://www.facebook.com/RedAviationJets"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <Facebook class="social-icon" />
            </a>
          </div>

          <div class="connect-cta">
            <a
              href="https://redskyg.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ locale.value === "en" ? "Main Website" : "Nuestra Web" }}
            </a>
            <a
              href="https://redskyg.com/landing"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ locale.value === "en" ? "Quotes" : "Cotizaciones" }}
            </a>
            <a href="mailto:sales@redskyg.com">sales@redskyg.com</a>
            <a
              href="https://wa.me/525586186576"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ locale.value === "en" ? "Get a Quote" : "Cotizar ahora" }}
            </a>
          </div>
        </section>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from "vue";
import { Linkedin, Instagram, Facebook } from "lucide-vue-next";
import { useLocale } from "../i18n";

const { locale, toLocalizedRoute } = useLocale();

const promoContent = computed(() =>
  locale.value === "en"
    ? {
        kicker: "Executive Aviation Group",
        title:
          "Private aviation with strategic execution, technical oversight, and specialized support.",
        text:
          "Aircraft sales, charter, operations management, and technical services in one professional team.",
        primaryCta: "Request Consultation",
        secondaryCta: "Contact on WhatsApp",
      }
    : {
        kicker: "Grupo de aviacion privada",
        title:
          "Aviacion privada con ejecucion estrategica, supervision tecnica y atencion especializada.",
        text:
          "Compra y venta de aeronaves, charter, gestion operativa y servicios tecnicos en un solo equipo.",
        primaryCta: "Solicitar asesoria",
        secondaryCta: "Hablar por WhatsApp",
      }
);

const footerMeta = computed(() =>
  locale.value === "en"
    ? {
        copyright: "© 2026 REDSKYG. All rights reserved.",
        privacy: "Privacy Policy",
      }
    : {
        copyright: "© 2026 REDSKYG. Todos los derechos reservados.",
        privacy: "Aviso de privacidad",
      }
);

const handlePhone = (number) => {
  const isMobile =
    /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
      navigator.userAgent,
    );

  if (isMobile) {
    window.location.href = `tel:${number}`;
  } else {
    window.open(`https://wa.me/${number.replace("+", "")}`, "_blank");
  }
};
</script>

<style>
.footer {
  background:
    radial-gradient(circle at top left, rgba(63, 169, 245, 0.08), transparent 28%),
    linear-gradient(180deg, #071524 0%, #06111d 100%);
  color: #fff;
  font-family: "Segoe UI", Arial, sans-serif;
}

.footer-overlay {
  max-width: 1400px;
  margin: 0 auto;
  padding: 4rem 3rem 3rem;
}

.footer-promo {
  display: grid;
  grid-template-columns: 1.3fr auto;
  gap: 2rem;
  align-items: center;
  margin-bottom: 2.25rem;
  padding: 2rem 2.2rem;
  border-radius: 28px;
  background: linear-gradient(135deg, rgba(11, 29, 49, 0.96), rgba(16, 43, 71, 0.92));
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.22);
}

.footer-kicker,
.section-heading span,
.detail-group h5 {
  display: inline-block;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  font-size: 0.72rem;
}

.footer-kicker,
.section-heading span {
  color: #8fcaff;
}

.footer-promo-copy h3 {
  max-width: 760px;
  margin: 0.9rem 0 0.8rem;
  font-size: 2rem;
  line-height: 1.2;
}

.footer-promo-copy p,
.brand-text,
.office-address,
.connect-text,
.detail-group p {
  color: #cfd6df;
  line-height: 1.75;
}

.footer-promo-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  justify-content: flex-end;
}

.promo-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  padding: 0.9rem 1.35rem;
  border-radius: 999px;
  text-decoration: none;
  transition: all 0.25s ease;
  white-space: nowrap;
}

.promo-btn.primary {
  background: linear-gradient(135deg, #d4af37, #f1d88a);
  color: #08111d;
  font-weight: 700;
}

.promo-btn.secondary {
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(255, 255, 255, 0.04);
}

.promo-btn:hover {
  transform: translateY(-3px);
}

.footer-bottom {
  display: grid;
  grid-template-columns: 1.05fr 1fr 0.95fr;
  gap: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.card-shell {
  height: 100%;
  padding: 1.85rem 1.85rem 2rem;
  background: transparent;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}

.card-shell:first-child {
  padding-left: 0;
}

.card-shell:last-child {
  padding-right: 0;
  border-right: 0;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-size: 1.8rem;
  font-weight: 600;
}

.footer-logo-icon {
  color: #3fa9f5;
}

.brand-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0;
  margin: 1.4rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.brand-meta span {
  padding: 0.75rem 1rem 0.75rem 0;
  margin-right: 1rem;
  color: rgba(255, 255, 255, 0.82);
  font-size: 0.78rem;
  border-right: 1px solid rgba(255, 255, 255, 0.08);
}

.brand-meta span:last-child {
  border-right: 0;
}

.footer-brand small {
  display: block;
  margin-top: 1.2rem;
  font-size: 0.78rem;
  color: #94a3b8;
}

.footer-link {
  margin-left: 0.35rem;
  color: #8fcaff;
  text-decoration: none;
}

.section-heading h4 {
  margin-top: 0.8rem;
  font-size: 1.45rem;
}

.office-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  margin-top: 1.6rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.detail-group {
  padding: 1.15rem 1.2rem 1.15rem 0;
}

.detail-group + .detail-group {
  padding-left: 1.2rem;
  border-left: 1px solid rgba(255, 255, 255, 0.08);
}

.detail-group h5 {
  margin-bottom: 0.9rem;
  color: rgba(255, 255, 255, 0.82);
}

.detail-group a,
.connect-cta a {
  color: white;
  text-decoration: none;
}

.footer-social {
  display: flex;
  gap: 0.9rem;
  margin: 1.5rem 0 1.8rem;
  padding: 1rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.footer-social a {
  width: 46px;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(255, 255, 255, 0.03);
  transition: all 0.25s ease;
}

.social-text-link {
  width: auto;
  padding: 0 1rem;
  border-radius: 999px;
  color: white;
  text-decoration: none;
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.footer-social a:hover {
  transform: translateY(-3px);
  border-color: rgba(212, 175, 55, 0.4);
  background: rgba(212, 175, 55, 0.12);
}

.social-icon {
  width: 18px;
  height: 18px;
  color: white;
  stroke: white;
}

.connect-cta {
  display: grid;
  gap: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.connect-cta a {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  min-height: 48px;
  padding: 0.95rem 0;
  background: transparent;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.25s ease;
}

.connect-cta a::after {
  content: "->";
  color: rgba(143, 202, 255, 0.8);
  font-size: 0.85rem;
  letter-spacing: 0;
}

.connect-cta a:last-child {
  border-bottom: 0;
  color: #8fcaff;
  font-weight: 700;
}

.connect-cta a:hover {
  color: #8fcaff;
  transform: translateX(6px);
}

@media (max-width: 1100px) {
  .footer-promo,
  .footer-bottom,
  .office-grid {
    grid-template-columns: 1fr;
  }

  .card-shell,
  .card-shell:first-child,
  .card-shell:last-child {
    padding: 1.6rem 0;
    border-right: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .card-shell:last-child {
    border-bottom: 0;
  }

  .detail-group,
  .detail-group + .detail-group {
    padding: 1rem 0;
    border-left: 0;
  }

  .detail-group + .detail-group {
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }

  .footer-promo-actions {
    justify-content: flex-start;
  }
}

@media (max-width: 768px) {
  .footer-overlay {
    padding: 3rem 1.2rem 2.4rem;
  }

  .footer-promo {
    padding: 1.45rem;
  }

  .footer-promo-copy h3 {
    font-size: 1.55rem;
  }

  .footer-logo {
    font-size: 1.55rem;
  }
}
</style>
