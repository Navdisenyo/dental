<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  Sparkles, 
  ArrowRight, 
  Clock, 
  Check, 
  MessageCircle, 
  Calendar,
  X,
  ExternalLink 
} from 'lucide-vue-next'
import { siteConfig, type Treatment } from '../../config/site'

gsap.registerPlugin(ScrollTrigger)
const treatmentsRoot = ref<HTMLElement | null>(null)
const selectedCategory = ref<'all' | 'dental' | 'restorative' | 'aesthetic'>('all')
const activeModalTreatment = ref<Treatment | null>(null)

const filteredTreatments = computed(() => {
  if (selectedCategory.value === 'all') return siteConfig.treatments
  return siteConfig.treatments.filter(t => t.category === selectedCategory.value)
})

const getWhatsAppEnquiry = (treatmentTitle: string) => {
  const text = encodeURIComponent(
    `Hello OneCare Aesthetix Clinic, I would like to know more about ${treatmentTitle}. Please share consultation options.`
  )
  return `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${text}`
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !treatmentsRoot.value) return

  const ctx = gsap.context(() => {
    gsap.fromTo('.treatment-card-item',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power3.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: treatmentsRoot.value,
          start: 'top 92%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    )
  }, treatmentsRoot.value)

  return () => ctx.revert()
})
</script>

<template>
  <section 
    id="treatments"
    ref="treatmentsRoot"
    class="py-20 lg:py-28 bg-brand-mint-light/50 relative"
    aria-label="Treatments and Services"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header -->
      <div class="max-w-3xl mx-auto text-center mb-12">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-mint text-brand-teal-dark text-xs font-semibold uppercase tracking-wider mb-4">
          <Sparkles class="w-3.5 h-3.5 text-brand-teal" />
          <span>Personalized Clinical Care</span>
        </div>

        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-charcoal tracking-tight mb-5">
          Treatments Crafted Around <br />
          <span class="font-serif italic font-normal text-brand-teal-dark">Your Unique Health & Smile.</span>
        </h2>

        <p class="text-base text-brand-muted max-w-2xl mx-auto leading-relaxed">
          From advanced restorative dentistry and smile contouring to medical facial aesthetic procedures, we combine contemporary clinical techniques with gentle, unhurried care.
        </p>

        <!-- Category Filters -->
        <div class="mt-8 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
          <button 
            type="button"
            :class="[
              'px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold transition-all shadow-sm',
              selectedCategory === 'all'
                ? 'bg-brand-teal-dark text-white shadow-soft scale-105 border border-brand-teal-dark'
                : 'bg-white text-brand-charcoal hover:bg-brand-mint hover:text-brand-teal-dark border border-brand-border hover:border-brand-teal/30'
            ]"
            @click="selectedCategory = 'all'"
          >
            All Services
          </button>

          <button 
            type="button"
            :class="[
              'px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold transition-all shadow-sm',
              selectedCategory === 'dental'
                ? 'bg-brand-teal-dark text-white shadow-soft scale-105 border border-brand-teal-dark'
                : 'bg-white text-brand-charcoal hover:bg-brand-mint hover:text-brand-teal-dark border border-brand-border hover:border-brand-teal/30'
            ]"
            @click="selectedCategory = 'dental'"
          >
            Smile Design & Alignment
          </button>

          <button 
            type="button"
            :class="[
              'px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold transition-all shadow-sm',
              selectedCategory === 'restorative'
                ? 'bg-brand-teal-dark text-white shadow-soft scale-105 border border-brand-teal-dark'
                : 'bg-white text-brand-charcoal hover:bg-brand-mint hover:text-brand-teal-dark border border-brand-border hover:border-brand-teal/30'
            ]"
            @click="selectedCategory = 'restorative'"
          >
            Restorative & Implants
          </button>

          <button 
            type="button"
            :class="[
              'px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold transition-all shadow-sm',
              selectedCategory === 'aesthetic'
                ? 'bg-brand-teal-dark text-white shadow-soft scale-105 border border-brand-teal-dark'
                : 'bg-white text-brand-charcoal hover:bg-brand-mint hover:text-brand-teal-dark border border-brand-border hover:border-brand-teal/30'
            ]"
            @click="selectedCategory = 'aesthetic'"
          >
            Facial Aesthetics & Skin
          </button>
        </div>
      </div>

      <!-- Treatments Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <article 
          v-for="treatment in filteredTreatments" 
          :key="treatment.id"
          class="treatment-card-item group bg-white rounded-3xl overflow-hidden border border-brand-border shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <!-- Treatment Visual Header -->
            <div class="relative aspect-[16/10] overflow-hidden bg-brand-mint">
              <img 
                :src="treatment.image" 
                :alt="treatment.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

              <!-- Duration Pill -->
              <div class="absolute top-3.5 right-3.5 z-10">
                <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-brand-charcoal text-[11px] font-medium shadow-soft">
                  <Clock class="w-3 h-3 text-brand-teal" />
                  <span>{{ treatment.duration }}</span>
                </span>
              </div>

              <!-- Treatment Title on Image Overlay -->
              <div class="absolute bottom-3 left-4 right-4 z-10 text-white">
                <span class="text-[10px] uppercase tracking-wider font-semibold text-brand-mint">
                  {{ treatment.category === 'aesthetic' ? 'Facial Aesthetics' : 'Dental Care' }}
                </span>
                <h3 class="text-lg font-bold leading-tight">
                  {{ treatment.title }}
                </h3>
              </div>
            </div>

            <!-- Treatment Body -->
            <div class="p-6">
              <p class="text-xs sm:text-sm text-brand-muted leading-relaxed mb-4">
                {{ treatment.shortDesc }}
              </p>

              <!-- Key Clinical Benefits -->
              <ul class="space-y-2 mb-6" aria-label="Key treatment benefits">
                <li 
                  v-for="(benefit, idx) in treatment.benefits" 
                  :key="idx"
                  class="flex items-center gap-2 text-xs text-brand-charcoal"
                >
                  <div class="w-4 h-4 rounded-full bg-brand-mint text-brand-teal-dark flex items-center justify-center shrink-0">
                    <Check class="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>{{ benefit }}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Bottom Actions -->
          <div class="px-6 pb-6 pt-2 border-t border-brand-border/60 flex items-center justify-between gap-3">
            <button 
              type="button"
              class="text-xs font-semibold text-brand-charcoal hover:text-brand-teal-dark flex items-center gap-1 transition-colors"
              @click="activeModalTreatment = treatment"
            >
              <span>Read Details</span>
              <ArrowRight class="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <!-- Context-Aware WhatsApp Enquiry -->
            <a 
              :href="getWhatsAppEnquiry(treatment.title)"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-mint hover:bg-brand-teal text-brand-teal-dark hover:text-white text-xs font-medium transition-all"
              title="Enquire on WhatsApp with prefilled message"
            >
              <MessageCircle class="w-3.5 h-3.5" />
              <span>Enquire</span>
            </a>
          </div>
        </article>
      </div>

      <!-- Bottom Banner -->
      <div class="mt-14 p-6 sm:p-8 rounded-3xl bg-brand-teal-deep text-white shadow-card flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 class="text-xl sm:text-2xl font-bold mb-2">Unsure which treatment is right for you?</h3>
          <p class="text-xs sm:text-sm text-brand-mint/90 max-w-xl">
            Book an exploratory digital consultation with Dr. Achal Agarwal. We assess your smile and skin anatomy, address all questions, and provide transparent treatment pathways.
          </p>
        </div>
        <div class="flex items-center gap-3 shrink-0">
          <a 
            href="#appointment"
            class="px-5 py-3 rounded-xl bg-brand-teal hover:bg-brand-teal-light hover:text-brand-teal-deep text-white text-xs font-semibold transition-all shadow-soft"
          >
            Book Consultation
          </a>
          <a 
            :href="siteConfig.contact.whatsappLink"
            target="_blank"
            rel="noopener noreferrer"
            class="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all border border-white/20"
          >
            Ask on WhatsApp
          </a>
        </div>
      </div>

    </div>

    <!-- Treatment Details Modal -->
    <div 
      v-if="activeModalTreatment"
      class="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      :aria-label="activeModalTreatment.title"
    >
      <div class="relative w-full max-w-xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-brand-border animate-in fade-in zoom-in-95 duration-200">
        
        <!-- Modal Image Header -->
        <div class="relative aspect-[16/9] bg-brand-mint">
          <img 
            :src="activeModalTreatment.image" 
            :alt="activeModalTreatment.title" 
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-transparent to-transparent"></div>

          <button 
            type="button" 
            class="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/90 text-brand-charcoal hover:bg-white flex items-center justify-center shadow-soft transition-colors"
            @click="activeModalTreatment = null"
            aria-label="Close modal"
          >
            <X class="w-4 h-4" />
          </button>

          <div class="absolute bottom-4 left-6 right-6 text-white">
            <span class="text-xs font-semibold text-brand-teal-light uppercase tracking-wider">
              OneCare Aesthetix Specialty
            </span>
            <h3 class="text-2xl font-bold leading-tight">{{ activeModalTreatment.title }}</h3>
          </div>
        </div>

        <!-- Modal Body Content -->
        <div class="p-6 sm:p-8">
          <div class="flex items-center gap-4 text-xs text-brand-muted mb-4 pb-4 border-b border-brand-border">
            <span class="flex items-center gap-1.5">
              <Clock class="w-4 h-4 text-brand-teal" />
              <span>Typical Duration: <strong>{{ activeModalTreatment.duration }}</strong></span>
            </span>
            <span>•</span>
            <span>Location: <strong>Geetai Sankul, Kothrud</strong></span>
          </div>

          <p class="text-sm text-brand-charcoal leading-relaxed mb-6">
            {{ activeModalTreatment.fullDesc }}
          </p>

          <h4 class="text-xs font-bold uppercase tracking-wider text-brand-muted mb-3">
            Clinical Advantages
          </h4>
          <ul class="space-y-2 mb-8">
            <li 
              v-for="(b, idx) in activeModalTreatment.benefits" 
              :key="idx" 
              class="flex items-center gap-2.5 text-xs text-brand-charcoal"
            >
              <div class="w-4 h-4 rounded-full bg-brand-mint text-brand-teal-dark flex items-center justify-center shrink-0">
                <Check class="w-2.5 h-2.5 stroke-[3]" />
              </div>
              <span>{{ b }}</span>
            </li>
          </ul>

          <!-- Modal Actions -->
          <div class="flex flex-col sm:flex-row items-center gap-3">
            <a 
              href="#appointment"
              class="w-full sm:flex-1 py-3 px-4 rounded-xl bg-brand-teal-dark hover:bg-brand-teal text-white text-xs font-semibold text-center transition-all shadow-soft"
              @click="activeModalTreatment = null"
            >
              Book For {{ activeModalTreatment.title }}
            </a>
            <a 
              :href="getWhatsAppEnquiry(activeModalTreatment.title)"
              target="_blank"
              rel="noopener noreferrer"
              class="w-full sm:w-auto py-3 px-4 rounded-xl bg-brand-mint text-brand-teal-dark border border-brand-teal/30 hover:bg-brand-teal/20 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <MessageCircle class="w-4 h-4 text-brand-teal" />
              <span>WhatsApp Doctor</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
