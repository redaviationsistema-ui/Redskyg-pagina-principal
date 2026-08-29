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
        <section class="footer-brand footer-column">
          <div class="footer-logo">
            <img src="/images/logoo.png" alt="Sky Group logo" class="footer-logo-mark" />
          </div>

          <p class="brand-text">
            {{ locale.value === "en" ? "Sky Group coordinates private flights, aircraft transactions, operational support, and technical follow-up for owners, operators, and executive aviation clients." : "Sky Group coordina vuelos privados, transacciones de aeronaves, soporte operativo y seguimiento técnico para propietarios, operadores y clientes de aviación ejecutiva." }}
          </p>

          <div class="brand-meta">
            <span>{{ locale.value === "en" ? "Private Charter" : "Vuelos privados" }}</span>
            <span>{{ locale.value === "en" ? "Operational Support" : "Soporte operativo" }}</span>
            <span>{{ locale.value === "en" ? "Technical Follow-Up" : "Seguimiento técnico" }}</span>
          </div>

          <small class="footer-legal">
            {{ footerMeta.copyright }}
            <RouterLink :to="toLocalizedRoute('Privacy')" class="footer-link">{{ footerMeta.privacy }}</RouterLink>
            <RouterLink :to="toLocalizedRoute('Cookies')" class="footer-link">{{ footerMeta.cookies }}</RouterLink>
            <RouterLink :to="toLocalizedRoute('Terms')" class="footer-link">{{ footerMeta.terms }}</RouterLink>
          </small>
        </section>

        <section class="footer-office footer-column">
          <div class="section-heading">
            <span>{{ locale.value === "en" ? "Head Office" : "Oficina principal" }}</span>
            <h4>{{ locale.value === "en" ? "Toluca, State of Mexico" : "Toluca, Estado de México" }}</h4>
          </div>

          <p class="office-address">
            {{ locale.value === "en" ? "San Nicolas Tolentino, Toluca de Lerdo, State of Mexico, Mexico" : "San Nicolás Tolentino, Toluca de Lerdo, Estado de México, México" }}
          </p>

          <div class="office-grid">
            <div class="detail-group">
              <h5>{{ locale.value === "en" ? "Client Service" : "Atención a clientes" }}</h5>

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

        <section class="footer-connect footer-column">
          <div class="section-heading">
            <span>{{ locale.value === "en" ? "Connect With Us" : "Conecte con nosotros" }}</span>
            <h4>{{ locale.value === "en" ? "Follow our aviation channels" : "Siga nuestros canales aeronáuticos" }}</h4>
          </div>

          <p class="connect-text">
            {{ locale.value === "en" ? "Follow charter availability, aircraft opportunities, and aviation updates from our commercial and operational team." : "Consulte disponibilidad de charter, oportunidades de aeronaves y actualizaciones de nuestro equipo comercial y operativo." }}
          </p>

          <div class="footer-social">
            <a
              href="https://www.facebook.com/RedAviationJets"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              class="social-badge social-badge-facebook"
            >
              <img src="/images/social/facebook.svg" alt="" class="social-logo" />
            </a>
            <a
              href="https://www.instagram.com/skygroup_llc/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              class="social-badge social-badge-instagram"
            >
              <img src="/images/social/instagram.svg" alt="" class="social-logo" />
            </a>
            <a
              href="https://wa.me/525586186576"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              class="social-badge social-badge-whatsapp"
            >
              <img src="/images/social/whatsapp.svg" alt="" class="social-logo" />
            </a>
            <a
              href="https://www.tiktok.com/@redaviationcompany"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              class="social-badge social-badge-tiktok"
            >
              <img src="/images/social/tiktok.svg" alt="" class="social-logo" />
            </a>
          </div>

          <div class="connect-cta">
            <a
              href="https://redskyg.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{{ locale.value === "en" ? "Main Website" : "Sitio principal" }}</span>
              <strong aria-hidden="true">-></strong>
            </a>
            <a
              href="https://redskyg.com/landing"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{{ locale.value === "en" ? "Quotes" : "Cotizaciones" }}</span>
              <strong aria-hidden="true">-></strong>
            </a>
            <a
              href="mailto:sales@redskyg.com"
            >
              <span>sales@redskyg.com</span>
              <strong aria-hidden="true">-></strong>
            </a>
            <a
              href="https://wa.me/525586186576"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{{ locale.value === "en" ? "Get a Quote" : "Cotizar ahora" }}</span>
              <strong aria-hidden="true">-></strong>
            </a>
          </div>
        </section>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from "vue";
import { useLocale } from "../i18n";

const { locale, toLocalizedRoute } = useLocale();

const promoContent = computed(() =>
  locale.value === "en"
    ? {
        kicker: "Executive Aviation Support",
        title:
          "One point of contact. Complete coordination.",
        text:
          "Private flights, aircraft transactions, operational support and technical follow-up coordinated through one dedicated team.",
        primaryCta: "Request Coordination",
        secondaryCta: "Speak on WhatsApp",
      }
    : {
        kicker: "Soporte de aviación ejecutiva",
        title:
          "Un solo punto de contacto. Coordinación integral.",
        text:
          "Vuelos privados, transacciones de aeronaves, soporte operativo y seguimiento técnico coordinados por un equipo dedicado.",
        primaryCta: "Solicitar coordinación",
        secondaryCta: "Hablar por WhatsApp",
      }
);

const footerMeta = computed(() =>
  locale.value === "en"
    ? {
        copyright: "© 2026 RED SKY GROUP. All rights reserved.",
        privacy: "Privacy Policy",
        cookies: "Cookie Policy",
        terms: "Terms & Conditions",
      }
    : {
        copyright: "© 2026 RED SKY GROUP. Todos los derechos reservados.",
        privacy: "Aviso de privacidad",
        cookies: "Política de cookies",
        terms: "Términos y condiciones",
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
  font-family: var(--font-body);
}

.footer-overlay {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2.75rem 2.4rem 1.4rem;
}

.footer-promo {
  display: grid;
  grid-template-columns: 1.3fr auto;
  gap: 1.4rem;
  align-items: center;
  margin-bottom: 1.45rem;
  padding: 1.45rem 1.7rem;
  border-radius: 24px;
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
  color: #d8b26e;
}

.footer-promo-copy h3 {
  max-width: 760px;
  margin: 0.65rem 0 0.55rem;
  font-size: 1.7rem;
  line-height: 1.2;
}

.footer-promo-copy p,
.brand-text,
.office-address,
.connect-text,
.detail-group p {
  color: #cfd6df;
  line-height: 1.55;
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
  min-height: 46px;
  padding: 0.78rem 1.15rem;
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
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}

.footer-column {
  height: 100%;
  min-height: 420px;
  padding: 1.55rem 1.4rem 1.35rem;
}

.footer-column + .footer-column {
  border-left: 1px solid rgba(255, 255, 255, 0.07);
}

.footer-logo {
  display: flex;
  align-items: center;
}

.footer-logo-mark {
  width: 126px;
  max-width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
  filter: brightness(0) invert(1);
}

.brand-meta {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin: 1rem 0 0.8rem;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}

.brand-meta span {
  padding: 0.75rem 0;
  color: rgba(255, 255, 255, 0.82);
  font-size: 0.78rem;
  text-align: center;
}

.brand-meta span + span {
  border-left: 1px solid rgba(255, 255, 255, 0.07);
}

.footer-legal {
  display: block;
  margin-top: 0.85rem;
  font-size: 0.78rem;
  color: #94a3b8;
}

.footer-link {
  margin-left: 0.35rem;
  color: #d8b26e;
  text-decoration: none;
}

.section-heading h4 {
  margin-top: 0.55rem;
  font-size: 1.1rem;
}

.office-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 1.1rem;
  padding-top: 0.9rem;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}

.detail-group h5 {
  margin-bottom: 0.6rem;
  color: rgba(255, 255, 255, 0.82);
}

.detail-group p {
  margin: 0.45rem 0;
}

.detail-group a,
.connect-cta a {
  color: white;
  text-decoration: none;
}

.detail-group:last-child {
  padding-left: 1rem;
  border-left: 1px solid rgba(255, 255, 255, 0.07);
}

.footer-social {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  margin: 1rem 0 0.9rem;
  padding-bottom: 0.9rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}

.social-badge {
  width: 68px;
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  border: none;
  box-shadow:
    0 14px 28px rgba(0, 0, 0, 0.18),
    0 22px 30px rgba(5, 10, 18, 0.12);
  transition: transform 0.25s ease, box-shadow 0.25s ease, filter 0.25s ease;
}

.social-badge-instagram {
  background:
    radial-gradient(circle at 82% 18%, rgba(255, 243, 170, 0.95) 0%, rgba(255, 243, 170, 0.1) 17%, transparent 18%),
    radial-gradient(circle at 18% 100%, #ffd86d 0%, #ffd86d 20%, transparent 21%),
    linear-gradient(135deg, #4d6cff 0%, #a332d5 38%, #f93b76 68%, #ff8c39 84%, #ffd34f 100%);
}

.social-badge-facebook {
  background: linear-gradient(180deg, #44b1ff 0%, #1d8cff 40%, #1e63ff 100%);
}

.social-badge-whatsapp {
  background: linear-gradient(180deg, #42f35f 0%, #23de46 48%, #1dc63d 100%);
}

.social-badge-tiktok {
  background: linear-gradient(180deg, #050607 0%, #090a0d 100%);
}

.footer-social a:hover {
  transform: translateY(-3px);
  box-shadow:
    0 18px 34px rgba(0, 0, 0, 0.22),
    0 24px 34px rgba(5, 10, 18, 0.14);
  filter: saturate(1.04) brightness(1.03);
}

.social-icon {
  width: 40px;
  height: 40px;
  color: white;
  stroke: white;
  stroke-width: 2;
}

.social-logo {
  width: 68px;
  height: 68px;
  display: block;
  object-fit: contain;
}

.connect-cta {
  display: grid;
  gap: 0;
}

.connect-cta a {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  min-height: 46px;
  padding: 0.72rem 0;
  border-radius: 0;
  background: transparent;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  transition: color 0.25s ease, transform 0.25s ease;
  font-weight: 600;
}

.connect-cta a::after {
  content: "->";
  color: rgba(143, 202, 255, 0.8);
  font-size: 0.85rem;
  letter-spacing: 0;
}

.connect-cta a:last-child {
  color: #d8b26e;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}

.connect-cta a:hover {
  color: #d8b26e;
  transform: translateX(3px);
}

.connect-cta a strong {
  color: #d8b26e;
  font-size: 0.95rem;
  font-weight: 700;
}

@media (max-width: 1100px) {
  .footer-promo,
  .footer-bottom,
  .office-grid {
    grid-template-columns: 1fr;
  }

  .footer-column {
    min-height: auto;
  }

  .footer-column + .footer-column {
    border-left: none;
    border-top: 1px solid rgba(255, 255, 255, 0.07);
  }

  .footer-promo-actions {
    justify-content: flex-start;
  }
}

@media (max-width: 768px) {
  .footer-overlay {
    padding: 2.25rem 1rem 1.3rem;
  }

  .footer-promo,
  .footer-column {
    padding: 1.2rem;
  }

  .footer-promo-copy h3 {
    font-size: 1.4rem;
  }

  .footer-logo {
    font-size: 1.55rem;
  }

  .brand-meta {
    grid-template-columns: 1fr;
  }

  .brand-meta span + span,
  .detail-group:last-child {
    border-left: none;
  }

  .brand-meta span + span,
  .detail-group:last-child {
    border-top: 1px solid rgba(255, 255, 255, 0.07);
  }

  .detail-group:last-child {
    padding-left: 0;
    padding-top: 1rem;
  }
}
</style>
