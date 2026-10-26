<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Star, ShieldCheck, MapPin, Award, UserCheck, Heart } from 'lucide-vue-next'
import { siteConfig } from '../../config/site'

gsap.registerPlugin(ScrollTrigger)
const trustRoot = ref<HTMLElement | null>(null)

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !trustRoot.value) return

  const ctx = gsap.context(() => {
    gsap.from('.trust-card', {
      scrollTrigger: {
        trigger: trustRoot.value,
        start: 'top 88%',
        toggleActions: 'play none none none',
        once: true
      },
      y: 25,
      opacity: 0,
      stagger: 0.1,
      duration: 0.7,
      ease: 'power3.out'
    })
  }, trustRoot.value)

  return () => ctx.revert()
})
</script>

<template>
  <section 
    ref="trustRoot"
    class="py-10 bg-white border-y border-brand-border/70 relative z-20"
    aria-label="Clinical Trust and Verification"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
        
        <!-- Trust Metric 1: Google Rating -->
        <a 
          :href="siteConfig.trust.googleSearchReviewUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="trust-card flex flex-col items-center sm:items-start text-center sm:text-left group"
        >
          <div class="flex items-center gap-1.5 mb-1.5">
            <span class="text-2xl sm:text-3xl font-extrabold text-brand-charcoal tracking-tight">4.9</span>
            <div class="flex text-amber-400">
              <Star v-for="i in 5" :key="i" class="w-4 h-4 fill-current" />
            </div>
          </div>
          <div class="text-xs font-semibold text-brand-teal-dark flex items-center gap-1">
            <span>75+ Google Reviews</span>
            <span class="group-hover:translate-x-0.5 transition-transform">↗</span>
          </div>
          <div class="text-[11px] text-brand-muted mt-0.5">Top-rated clinic in Kothrud</div>
        </a>

        <!-- Trust Metric 2: Experience -->
        <div class="trust-card flex flex-col items-center sm:items-start text-center sm:text-left">
          <div class="flex items-center gap-1.5 mb-1.5">
            <span class="text-2xl sm:text-3xl font-extrabold text-brand-charcoal tracking-tight">{{ siteConfig.trust.experienceYears }}</span>
            <span class="text-lg font-bold text-brand-teal">Years</span>
          </div>
          <div class="text-xs font-semibold text-brand-teal-dark">Clinical Practice</div>
          <div class="text-[11px] text-brand-muted mt-0.5">Led by Dr. Achal Agarwal</div>
        </div>

        <!-- Trust Metric 3: Multi-specialty Dental & Facial -->
        <div class="trust-card flex flex-col items-center sm:items-start text-center sm:text-left">
          <div class="flex items-center gap-1.5 mb-1.5">
            <span class="text-2xl sm:text-3xl font-extrabold text-brand-charcoal tracking-tight">Dual</span>
            <span class="text-sm font-semibold text-brand-teal-dark bg-brand-mint px-2 py-0.5 rounded-full">Care</span>
          </div>
          <div class="text-xs font-semibold text-brand-teal-dark">Dental & Facial Aesthetics</div>
          <div class="text-[11px] text-brand-muted mt-0.5">Harmonized smile & skin treatments</div>
        </div>

        <!-- Trust Metric 4: Location -->
        <a 
          :href="siteConfig.contact.mapsUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="trust-card flex flex-col items-center sm:items-start text-center sm:text-left group"
        >
          <div class="flex items-center gap-1.5 mb-1.5">
            <MapPin class="w-6 h-6 text-brand-teal" />
            <span class="text-xl sm:text-2xl font-extrabold text-brand-charcoal tracking-tight">Kothrud</span>
          </div>
          <div class="text-xs font-semibold text-brand-teal-dark flex items-center gap-1">
            <span>Geetai Sankul, Paud Rd</span>
            <span class="group-hover:translate-x-0.5 transition-transform">↗</span>
          </div>
          <div class="text-[11px] text-brand-muted mt-0.5">Near Ideal Colony • Parking available</div>
        </a>

      </div>
    </div>
  </section>
</template>
