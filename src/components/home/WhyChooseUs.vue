<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  Eye, 
  Home, 
  FileCheck, 
  CheckCircle2 
} from 'lucide-vue-next'
import { siteConfig } from '../../config/site'

gsap.registerPlugin(ScrollTrigger)
const whyRoot = ref<HTMLElement | null>(null)

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !whyRoot.value) return

  const ctx = gsap.context(() => {
    gsap.fromTo('.why-feature-card',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power3.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: whyRoot.value,
          start: 'top 92%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    )
  }, whyRoot.value)

  return () => ctx.revert()
})
</script>

<template>
  <section 
    id="why-us"
    ref="whyRoot"
    class="py-20 lg:py-28 bg-white relative overflow-hidden"
    aria-label="Why Choose OneCare Aesthetix Clinic"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Heading -->
      <div class="max-w-3xl mb-16">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-mint text-brand-teal-dark text-xs font-semibold uppercase tracking-wider mb-4">
          <ShieldCheck class="w-3.5 h-3.5 text-brand-teal" />
          <span>The OneCare Difference</span>
        </div>

        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-charcoal tracking-tight mb-5">
          Why Patients in Kothrud <br />
          <span class="font-serif italic font-normal text-brand-teal-dark">Trust Our Approach.</span>
        </h2>

        <p class="text-base text-brand-muted leading-relaxed">
          Great healthcare starts with listening. We bring together dual dental and facial aesthetics, contemporary clinical equipment, and a calming environment where your comfort comes first.
        </p>
      </div>

      <!-- Grid of Feature Blocks -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <!-- Feature 1: Dual Care -->
        <div class="why-feature-card p-8 rounded-3xl bg-brand-ivory border border-brand-border/80 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all">
          <div class="w-12 h-12 rounded-2xl bg-brand-mint text-brand-teal-dark flex items-center justify-center mb-6">
            <Sparkles class="w-6 h-6 text-brand-teal-dark" />
          </div>
          <h3 class="text-lg font-bold text-brand-charcoal mb-2.5">
            Dental & Facial Aesthetic Synergy
          </h3>
          <p class="text-xs sm:text-sm text-brand-muted leading-relaxed">
            Conveniently address tooth contouring, whitening, and smile design alongside clinical facial aesthetic care under one trusted roof.
          </p>
        </div>

        <!-- Feature 2: Serene Green Daylight Views -->
        <div class="why-feature-card p-8 rounded-3xl bg-brand-ivory border border-brand-border/80 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all">
          <div class="w-12 h-12 rounded-2xl bg-brand-mint text-brand-teal-dark flex items-center justify-center mb-6">
            <Eye class="w-6 h-6 text-brand-teal-dark" />
          </div>
          <h3 class="text-lg font-bold text-brand-charcoal mb-2.5">
            Soothing Garden Canopy Views
          </h3>
          <p class="text-xs sm:text-sm text-brand-muted leading-relaxed">
            Our main operatory overlooks a lush green tree canopy through expansive picture windows, flooding the space with natural daylight to soothe clinical anxiety.
          </p>
        </div>

        <!-- Feature 3: Warm Oak Scandinavian Architecture -->
        <div class="why-feature-card p-8 rounded-3xl bg-brand-ivory border border-brand-border/80 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all">
          <div class="w-12 h-12 rounded-2xl bg-brand-mint text-brand-teal-dark flex items-center justify-center mb-6">
            <Home class="w-6 h-6 text-brand-teal-dark" />
          </div>
          <h3 class="text-lg font-bold text-brand-charcoal mb-2.5">
            Warm Scandinavian Design
          </h3>
          <p class="text-xs sm:text-sm text-brand-muted leading-relaxed">
            Warm wood paneling, fluted details, and soft ambient lighting create an experience that feels tranquil, respectful, and genuinely comfortable.
          </p>
        </div>

        <!-- Feature 4: Hospital-Grade Sterilization -->
        <div class="why-feature-card p-8 rounded-3xl bg-brand-ivory border border-brand-border/80 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all">
          <div class="w-12 h-12 rounded-2xl bg-brand-mint text-brand-teal-dark flex items-center justify-center mb-6">
            <ShieldCheck class="w-6 h-6 text-brand-teal-dark" />
          </div>
          <h3 class="text-lg font-bold text-brand-charcoal mb-2.5">
            Strict Autoclave Sterilization
          </h3>
          <p class="text-xs sm:text-sm text-brand-muted leading-relaxed">
            Patient safety is paramount. All reusable instruments undergo multi-cycle Class-B autoclaving, hermetic vacuum sealing, and barrier protection.
          </p>
        </div>

        <!-- Feature 5: Transparent Consultations -->
        <div class="why-feature-card p-8 rounded-3xl bg-brand-ivory border border-brand-border/80 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all">
          <div class="w-12 h-12 rounded-2xl bg-brand-mint text-brand-teal-dark flex items-center justify-center mb-6">
            <FileCheck class="w-6 h-6 text-brand-teal-dark" />
          </div>
          <h3 class="text-lg font-bold text-brand-charcoal mb-2.5">
            Transparent Honest Guidance
          </h3>
          <p class="text-xs sm:text-sm text-brand-muted leading-relaxed">
            Zero pressured upselling. We examine your oral condition, show you digital findings, and outline all viable pathways with clear cost breakdowns.
          </p>
        </div>

        <!-- Feature 6: Split Morning & Evening Slots -->
        <div class="why-feature-card p-8 rounded-3xl bg-brand-ivory border border-brand-border/80 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all">
          <div class="w-12 h-12 rounded-2xl bg-brand-mint text-brand-teal-dark flex items-center justify-center mb-6">
            <Clock class="w-6 h-6 text-brand-teal-dark" />
          </div>
          <h3 class="text-lg font-bold text-brand-charcoal mb-2.5">
            Convenient Split Timings
          </h3>
          <p class="text-xs sm:text-sm text-brand-muted leading-relaxed">
            Open mornings (10:30am–2pm) and evenings (4:30pm–8pm) Mon–Sat plus Sunday mornings, accommodating busy professionals and family schedules.
          </p>
        </div>

      </div>

    </div>
  </section>
</template>
