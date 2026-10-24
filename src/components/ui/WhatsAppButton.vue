<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { MessageCircle, X } from 'lucide-vue-next'
import { siteConfig } from '../../config/site'

const isTooltipVisible = ref(false)
const tooltipDismissed = ref(false)

onMounted(() => {
  // Show tooltip after 4 seconds of browsing
  setTimeout(() => {
    if (!tooltipDismissed.value) {
      isTooltipVisible.value = true
    }
  }, 4000)
})

const dismissTooltip = () => {
  isTooltipVisible.value = false
  tooltipDismissed.value = true
}
</script>

<template>
  <div class="fixed bottom-6 right-5 sm:right-6 z-40 flex flex-col items-end gap-2 pointer-events-auto">
    <!-- Popover Teaser Tooltip -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-2 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-2 scale-95"
    >
      <div 
        v-if="isTooltipVisible"
        class="bg-white rounded-2xl p-4 shadow-float border border-brand-border text-brand-charcoal max-w-[260px] relative animate-in fade-in"
      >
        <button 
          type="button"
          class="absolute top-2 right-2 w-5 h-5 rounded-full hover:bg-brand-mint text-brand-muted hover:text-brand-charcoal flex items-center justify-center transition-colors"
          @click="dismissTooltip"
          aria-label="Dismiss message"
        >
          <X class="w-3 h-3" />
        </button>

        <div class="flex items-center gap-2 mb-1.5">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span class="text-xs font-bold text-brand-teal-deep">OneCare Aesthetix</span>
        </div>
        <p class="text-xs text-brand-muted leading-relaxed">
          Need quick consultation advice or slot availability in Kothrud? Message us directly!
        </p>
      </div>
    </transition>

    <!-- Main Floating WhatsApp Button -->
    <a 
      :href="siteConfig.contact.whatsappLink"
      target="_blank"
      rel="noopener noreferrer"
      class="group relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-float hover:shadow-glow hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-300"
      aria-label="Chat with OneCare on WhatsApp (+91 98348 91463)"
      title="Chat with OneCare on WhatsApp"
    >
      <!-- Subdued Ping Aura -->
      <span class="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-20 group-hover:animate-ping"></span>

      <!-- WhatsApp SVG Icon -->
      <svg 
        class="w-7 h-7 fill-current transition-transform duration-300 group-hover:scale-110" 
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.299.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.2.662.591 1.221.774 1.394.86.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824z"/>
      </svg>
    </a>
  </div>
</template>
