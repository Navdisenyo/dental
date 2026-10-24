<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Smile, CheckCircle } from 'lucide-vue-next'

gsap.registerPlugin(ScrollTrigger)
const journeyRoot = ref<HTMLElement | null>(null)

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !journeyRoot.value) return

  const ctx = gsap.context(() => {
    gsap.fromTo('.journey-step-card',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 0.6,
        ease: 'power3.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: journeyRoot.value,
          start: 'top 92%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    )
  }, journeyRoot.value)

  return () => ctx.revert()
})
</script>

<template>
  <section 
    ref="journeyRoot"
    class="py-20 lg:py-28 bg-white relative overflow-hidden"
    aria-label="Patient Journey and Consultation Process"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header -->
      <div class="max-w-3xl mx-auto text-center mb-16">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-mint text-brand-teal-dark text-xs font-semibold uppercase tracking-wider mb-4">
          <Smile class="w-3.5 h-3.5 text-brand-teal" />
          <span>Simple, Transparent Process</span>
        </div>

        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-charcoal tracking-tight mb-4">
          Your Journey to a Healthy, <br />
          <span class="font-serif italic font-normal text-brand-teal-dark">Radiant Smile in 3 Steps.</span>
        </h2>

        <p class="text-base text-brand-muted max-w-xl mx-auto">
          We respect your time. Our consultation workflow is designed to be straightforward, friendly, and unhurried.
        </p>
      </div>

      <!-- 3-Step Horizontal / Vertical Timeline -->
      <div class="relative grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
        
        <!-- Connecting Line on Desktop -->
        <div class="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-brand-teal/20 via-brand-teal to-brand-teal/20 z-0"></div>

        <!-- Step 1 -->
        <div class="journey-step-card relative z-10 bg-brand-ivory rounded-3xl p-8 border border-brand-border/80 shadow-soft flex flex-col items-center text-center">
          <div class="w-14 h-14 rounded-2xl bg-brand-teal-deep text-brand-mint flex items-center justify-center font-bold text-lg mb-6 shadow-soft">
            01
          </div>
          <h3 class="text-lg font-bold text-brand-charcoal mb-3">
            Connect & Share Goals
          </h3>
          <p class="text-xs sm:text-sm text-brand-muted leading-relaxed">
            Tell us about your dental needs, aesthetic preferences, or any specific concerns using our simple form or a direct WhatsApp message.
          </p>
        </div>

        <!-- Step 2 -->
        <div class="journey-step-card relative z-10 bg-brand-ivory rounded-3xl p-8 border border-brand-border/80 shadow-soft flex flex-col items-center text-center">
          <div class="w-14 h-14 rounded-2xl bg-brand-teal text-white flex items-center justify-center font-bold text-lg mb-6 shadow-soft">
            02
          </div>
          <h3 class="text-lg font-bold text-brand-charcoal mb-3">
            Schedule Preferred Slot
          </h3>
          <p class="text-xs sm:text-sm text-brand-muted leading-relaxed">
            Select your preferred morning or evening consultation time. Our clinic coordinator will review schedule availability and confirm your booking.
          </p>
        </div>

        <!-- Step 3 -->
        <div class="journey-step-card relative z-10 bg-brand-ivory rounded-3xl p-8 border border-brand-border/80 shadow-soft flex flex-col items-center text-center">
          <div class="w-14 h-14 rounded-2xl bg-brand-teal-dark text-white flex items-center justify-center font-bold text-lg mb-6 shadow-soft">
            03
          </div>
          <h3 class="text-lg font-bold text-brand-charcoal mb-3">
            Relaxed Consultation
          </h3>
          <p class="text-xs sm:text-sm text-brand-muted leading-relaxed">
            Visit our calming clinic in Geetai Sankul, Kothrud. Receive one-on-one time with Dr. Achal Agarwal, comprehensive evaluation, and clear guidance.
          </p>
        </div>

      </div>

      <!-- Trust Note: Ethical Scheduling -->
      <div class="mt-12 max-w-2xl mx-auto p-4 rounded-2xl bg-brand-mint/60 border border-brand-teal/20 text-center text-xs text-brand-muted flex items-center justify-center gap-2">
        <CheckCircle class="w-4 h-4 text-brand-teal shrink-0" />
        <span>Submitted requests are verified personally by our reception before confirmation to guarantee uninterrupted doctor time.</span>
      </div>

    </div>
  </section>
</template>
