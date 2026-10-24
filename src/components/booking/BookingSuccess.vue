<script setup lang="ts">
import { onMounted } from 'vue'
import confetti from 'canvas-confetti'
import { CheckCircle2, MessageCircle, Calendar, RefreshCw, ArrowRight } from 'lucide-vue-next'
import { siteConfig } from '../../config/site'
import type { AppointmentPayload } from '../../services/bookingService'

const props = defineProps<{
  submission: AppointmentPayload | null
  whatsAppUrl: string
}>()

const emit = defineEmits<{
  (e: 'book-another'): void
}>()

onMounted(() => {
  // Fire celebratory aesthetic confetti
  try {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#72B2AB', '#245D59', '#C89B3C', '#EAF5F2']
    })
  } catch (e) {
    // Graceful fallback
  }
})
</script>

<template>
  <div class="bg-white rounded-3xl p-8 sm:p-10 border border-brand-border shadow-card text-center max-w-xl mx-auto animate-in fade-in zoom-in-95 duration-300">
    <div class="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-soft">
      <CheckCircle2 class="w-9 h-9" />
    </div>

    <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-mint text-brand-teal-dark text-xs font-semibold mb-3">
      Request Recorded Successfully
    </div>

    <h3 class="text-2xl sm:text-3xl font-extrabold text-brand-charcoal tracking-tight mb-3">
      Thank You, {{ submission?.fullName || 'Patient' }}!
    </h3>

    <p class="text-sm text-brand-muted leading-relaxed mb-6">
      We have received your consultation request for <strong>{{ submission?.treatment }}</strong> on <strong>{{ submission?.preferredDate }}</strong> ({{ submission?.preferredTime }}). Our reception desk at Geetai Sankul, Kothrud will review schedule availability and contact you shortly.
    </p>

    <!-- Appointment Summary Box -->
    <div class="p-4 rounded-2xl bg-brand-ivory border border-brand-border/80 text-left text-xs space-y-2 mb-8">
      <div class="flex justify-between py-1 border-b border-brand-border/40">
        <span class="text-brand-muted">Patient Name:</span>
        <span class="font-bold text-brand-charcoal">{{ submission?.fullName }}</span>
      </div>
      <div class="flex justify-between py-1 border-b border-brand-border/40">
        <span class="text-brand-muted">Contact Mobile:</span>
        <span class="font-bold text-brand-charcoal">+91 {{ submission?.mobile }}</span>
      </div>
      <div class="flex justify-between py-1 border-b border-brand-border/40">
        <span class="text-brand-muted">Requested Slot:</span>
        <span class="font-bold text-brand-teal-dark">{{ submission?.preferredDate }} • {{ submission?.preferredTime }}</span>
      </div>
      <div class="flex justify-between py-1">
        <span class="text-brand-muted">Clinic:</span>
        <span class="font-medium text-brand-charcoal">OneCare Aesthetix, Kothrud</span>
      </div>
    </div>

    <!-- Instant WhatsApp Confirmation Bridge -->
    <div class="p-6 rounded-2xl bg-brand-mint/60 border border-brand-teal/30 mb-8 text-left">
      <div class="flex items-start gap-3 mb-4">
        <MessageCircle class="w-5 h-5 text-brand-teal-dark shrink-0 mt-0.5" />
        <div>
          <h4 class="text-xs font-bold text-brand-charcoal">Want instant priority confirmation?</h4>
          <p class="text-[11px] text-brand-muted mt-0.5 leading-relaxed">
            Send your booking summary directly to our clinic WhatsApp with one click.
          </p>
        </div>
      </div>

      <a 
        :href="whatsAppUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs shadow-soft transition-all"
      >
        <MessageCircle class="w-4 h-4" />
        <span>Open in WhatsApp (+91 98348 91463)</span>
      </a>
    </div>

    <button 
      type="button"
      class="inline-flex items-center gap-2 text-xs font-semibold text-brand-muted hover:text-brand-charcoal transition-colors"
      @click="emit('book-another')"
    >
      <RefreshCw class="w-3.5 h-3.5" />
      <span>Submit Another Request</span>
    </button>
  </div>
</template>
