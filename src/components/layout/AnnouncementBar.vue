<script setup lang="ts">
import { ref } from 'vue'
import { MapPin, Phone, Clock, ArrowRight } from 'lucide-vue-next'
import { siteConfig } from '../../config/site'

const isDismissed = ref(false)
</script>

<template>
  <aside 
    v-if="!isDismissed" 
    class="bg-brand-teal-deep text-brand-mint text-xs border-b border-brand-teal/20 transition-all duration-300 z-50 relative"
    aria-label="Clinic announcement and business hours"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-3">
      <!-- Left: Announcement & Location -->
      <div class="flex items-center gap-2 tracking-wide font-normal">
        <span class="inline-flex items-center justify-center p-1 rounded-full bg-brand-teal/20 text-brand-teal">
          <MapPin class="w-3.5 h-3.5" />
        </span>
        <span class="hidden sm:inline">204, Geetai Sankul, Paud Road, Kothrud, Pune</span>
        <span class="sm:hidden font-medium">Kothrud, Pune</span>
        <span class="text-brand-teal/60 hidden md:inline">•</span>
        <span class="text-brand-mint/90 hidden md:inline">Personalized Dental & Facial Aesthetic Care</span>
      </div>

      <!-- Right: Split Hours & Fast Call -->
      <div class="flex items-center gap-4 text-brand-mint/90">
        <div class="hidden lg:flex items-center gap-1.5 text-xs text-brand-mint/80">
          <Clock class="w-3.5 h-3.5 text-brand-teal" />
          <span>Mon–Sat: 10:30am–2pm & 4:30pm–8pm</span>
        </div>

        <a 
          :href="'tel:' + siteConfig.contact.phoneClean" 
          class="flex items-center gap-1.5 font-medium hover:text-white transition-colors"
          title="Call OneCare Aesthetix Reception"
        >
          <Phone class="w-3 h-3 text-brand-teal" />
          <span>+91 98348 91463</span>
        </a>

        <a 
          href="#appointment" 
          class="inline-flex items-center gap-1 bg-brand-teal/25 hover:bg-brand-teal text-brand-mint hover:text-white px-2.5 py-0.5 rounded-full font-medium transition-all"
        >
          <span>Book Visit</span>
          <ArrowRight class="w-2.5 h-2.5" />
        </a>
      </div>
    </div>
  </aside>
</template>
