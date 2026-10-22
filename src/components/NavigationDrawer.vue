<template>
  <Teleport to="body">
    <dialog ref="dialog" id="sky-navigation" class="navigation-dialog" :aria-label="title" @cancel.prevent="requestClose" @click="onOutsideClick">
      <Transition name="drawer" @after-leave="finishClose">
        <aside v-if="visible" class="navigation-drawer">
          <div class="drawer-heading">
            <div class="drawer-brand"><slot name="brand" /></div>
            <button ref="closeButton" type="button" class="drawer-close" :aria-label="closeLabel" @click="requestClose"><X :size="23" :stroke-width="1.5" aria-hidden="true" /></button>
          </div>
          <div class="drawer-content"><slot /></div>
          <div class="drawer-footer"><slot name="footer" /></div>
        </aside>
      </Transition>
    </dialog>
  </Teleport>
</template>
<script setup>
import { nextTick, onBeforeUnmount, ref, watch } from 'vue';
import { X } from 'lucide-vue-next';
const props = defineProps({ modelValue: Boolean, title: { type: String, required: true }, closeLabel: { type: String, required: true } });
const emit = defineEmits(['update:modelValue']);
const dialog = ref(null);
const visible = ref(false);
const closeButton = ref(null);
let previousFocus;
let previousOverflow;
let previousPadding;
function requestClose() { emit('update:modelValue', false); }
function onOutsideClick(event) { if (event.target === dialog.value) requestClose(); }
function restoreBody() {
  if (previousOverflow === undefined) return;
  document.body.style.overflow = previousOverflow;
  document.body.style.paddingRight = previousPadding;
  previousOverflow = undefined;
}
function finishClose() {
  if (props.modelValue) return;
  dialog.value?.close();
  restoreBody();
  if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
}
watch(() => props.modelValue, async open => {
  if (!open) { visible.value = false; return; }
  previousFocus = document.activeElement;
  if (previousOverflow === undefined) {
    previousOverflow = document.body.style.overflow;
    previousPadding = document.body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbar > 0) document.body.style.paddingRight = `${parseFloat(getComputedStyle(document.body).paddingRight) + scrollbar}px`;
    document.body.style.overflow = 'hidden';
  }
  await nextTick();
  if (!props.modelValue) { finishClose(); return; }
  if (!dialog.value.open) dialog.value.showModal();
  visible.value = true;
  await nextTick();
  closeButton.value?.focus({ preventScroll: true });
});
onBeforeUnmount(() => { dialog.value?.close(); restoreBody(); });
</script>
<style scoped>
.navigation-dialog { position: fixed; inset: 0; width: 100%; max-width: none; height: 100dvh; max-height: none; margin: 0; padding: 0; border: 0; background: transparent; color: #fff; overflow: hidden; }
.navigation-dialog::backdrop { background: rgba(2,8,16,.64); }
.navigation-drawer { display: flex; flex-direction: column; width: 400px; max-width: 90vw; height: 100dvh; overflow-y: auto; overscroll-behavior: contain; background: linear-gradient(180deg,#071323 0%,#123354 65%,#244e78 100%); padding: max(24px,env(safe-area-inset-top)) 24px max(28px,env(safe-area-inset-bottom)); }
.drawer-heading { position: relative; flex-shrink: 0; padding-bottom: 24px; border-bottom: 1px solid rgba(212,175,106,.28); }
.drawer-brand { padding-right: 38px; }
.drawer-close { position: absolute; top: 0; right: -8px; display: flex; align-items: center; justify-content: center; width: 44px; height: 44px; border: 0; background: transparent; color: #fff; cursor: pointer; }
.drawer-close:hover { color: #d4af6a; }
.drawer-close:focus-visible { outline: 2px solid #d4af6a; outline-offset: 2px; }
.drawer-content { padding-block: 24px; }
.drawer-footer { margin-top: auto; padding-top: 24px; border-top: 1px solid rgba(212,175,106,.22); }
.drawer-enter-active, .drawer-leave-active { transition: transform 300ms cubic-bezier(.22,1,.36,1); }
.drawer-enter-from, .drawer-leave-to { transform: translateX(-100%); }
@media(max-width:1024px) { .navigation-drawer { width: 360px; } }
@media(max-width:767px) { .navigation-drawer { width: 88vw; max-width: 360px; padding-inline: 20px; } }
@media(prefers-reduced-motion:reduce) { .drawer-enter-active, .drawer-leave-active { transition: none; } }
</style>
