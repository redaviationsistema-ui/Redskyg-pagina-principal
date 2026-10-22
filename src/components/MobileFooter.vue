<template>
  <footer class="footer footer--mobile">
    <div class="footer-shell">
      <div class="footer-main">
        <section class="footer-brand">
          <div class="footer-logo"><img src="/images/logoo.png" alt="Sky Group Aviation" /></div>
          <p class="footer-tagline">{{ locale.value === 'en' ? 'Private aviation. Personal attention.' : 'Aviación privada. Atención personal.' }}</p>
          <span class="footer-location">{{ locale.value === 'en' ? 'Toluca, Mexico' : 'Toluca, México' }}</span>
        </section>
        <section class="footer-contact" :aria-label="locale.value === 'en' ? 'Contact' : 'Contacto'">
          <h2>{{ locale.value === 'en' ? 'Let’s talk' : 'Conversemos' }}</h2>
          <a class="footer-email" href="mailto:sales@redskyg.com">sales@redskyg.com</a>
          <a class="footer-phone" href="#" @click.prevent="handlePhone('+525586186576')">+52 558-618-6576</a>
        </section>
        <section class="footer-connect" :aria-label="locale.value === 'en' ? 'Social media and quotes' : 'Redes sociales y cotizaciones'">
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


          <a class="footer-quote" href="https://wa.me/525586186576" target="_blank" rel="noopener noreferrer">{{ locale.value === 'en' ? 'Plan your next flight' : 'Planea tu próximo vuelo' }}<ArrowUpRight :size="17" aria-hidden="true" /></a>
        </section>
      </div>
      <div class="footer-legal">
        <small>{{ footerMeta.copyright }}</small>
        <nav :aria-label="locale.value === 'en' ? 'Legal information' : 'Información legal'">
          <RouterLink :to="toLocalizedRoute('Privacy')">{{ footerMeta.privacy }}</RouterLink>
          <RouterLink :to="toLocalizedRoute('Cookies')">{{ footerMeta.cookies }}</RouterLink>
          <RouterLink :to="toLocalizedRoute('Terms')">{{ footerMeta.terms }}</RouterLink>
        </nav>
      </div>
    </div>
  </footer>
</template>
<script setup>
import { ArrowUpRight } from 'lucide-vue-next';
import { computed } from "vue";
import { useLocale } from "../i18n";

const { locale, toLocalizedRoute } = useLocale();

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

<style scoped>
.footer.footer--mobile { display: none; background: #071323; color: #fff; font-family: var(--font-body); }
.footer-shell { width: min(1280px, calc(100% - 64px)); margin-inline: auto; padding-top: 36px; }
.footer-main { display: grid; grid-template-columns: 1.1fr 1fr 1fr; align-items: center; gap: 40px; padding-bottom: 28px; }
.footer-logo { position: relative; width: 145px; height: 50px; overflow: hidden; }
.footer-logo img { position: absolute; left: 50%; top: 50%; width: 198px; max-width: none; height: 132px; object-fit: contain; transform: translate(-50%, -50%); filter: brightness(0) invert(1); }
.footer-tagline { margin: 10px 0 6px; font-size: 13px; color: #c7d3df; line-height: 1.5; }
.footer-location { color: #8e9eaf; font-size: 12px; }
.footer-contact h2 { margin: 0 0 6px; color: #d4af6a; font: 400 11px var(--font-body); letter-spacing: .14em; text-transform: uppercase; }
.footer-contact a { display: flex; align-items: center; width: fit-content; min-height: 44px; text-decoration: none; }
.footer-email { color: #fff; font-size: 17px; }
.footer-phone { color: #c7d3df; font-size: 13px; }
.footer-social { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
.social-badge { display: flex; align-items: center; justify-content: center; width: 44px; height: 44px; border-radius: 12px; background: rgba(255,255,255,.04); transition: background-color 180ms ease; }
.social-logo { width: 24px; height: 24px; object-fit: contain; filter: grayscale(1); }
.social-badge:hover { background: rgba(212,175,106,.14); }
.social-badge:hover .social-logo { filter: none; }
.footer-quote { display: inline-flex; align-items: center; justify-content: space-between; gap: 18px; min-height: 44px; color: #d4af6a; font-size: 13px; text-decoration: none; }
.footer-legal { display: flex; align-items: center; justify-content: space-between; gap: 12px 24px; padding: 12px 0; border-top: 1px solid rgba(212,175,106,.16); color: #8e9eaf; }
.footer-legal small { font-size: 11px; line-height: 1.5; }
.footer-legal nav { display: flex; flex-wrap: wrap; gap: 0 16px; }
.footer-legal a { display: inline-flex; align-items: center; min-height: 44px; color: #b7c3d0; text-decoration: none; font-size: 11px; }
.footer a:hover { color: #d4af6a; }
.footer a:focus-visible { outline: 2px solid #d4af6a; outline-offset: 3px; }
@media(max-width:900px) { .footer-main { gap: 24px; } .footer-legal { flex-direction: column; align-items: flex-start; gap: 4px; } }
@media(max-width:767px) {
  .footer.footer--mobile { display: block; }
  .footer-shell { width: calc(100% - 40px); padding-top: 24px; }
  .footer-main { grid-template-columns: 1fr; gap: 20px; padding-bottom: 18px; }
  .footer-logo { width: 128px; height: 44px; }
  .footer-logo img { width: 174px; height: 116px; }
  .footer-tagline { margin-top: 6px; }
  .footer-contact { display: grid; grid-template-columns: 1fr; }
  .footer-contact h2 { margin-bottom: 2px; }
  .footer-email { font-size: 16px; }
  .footer-social { margin-bottom: 0; }
  .footer-legal nav { gap: 0 12px; }
  .footer-legal a { font-size: 10px; }
}
@media(prefers-reduced-motion:reduce) { .social-badge { transition: none; } }
</style>
