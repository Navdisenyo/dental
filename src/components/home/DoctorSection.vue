<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Award, Calendar, Stethoscope, Sparkles } from 'lucide-vue-next'
import { siteConfig } from '../../config/site'

gsap.registerPlugin(ScrollTrigger)
const doctorRoot = ref<HTMLElement | null>(null)

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !doctorRoot.value) return

  const ctx = gsap.context(() => {
    gsap.fromTo('.doctor-card',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power3.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: doctorRoot.value,
          start: 'top 92%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    )
  }, doctorRoot.value)

  return () => ctx.revert()
})
</script>

<template>
  <section 
    id="doctor"
    ref="doctorRoot"
    class="py-20 lg:py-28 bg-brand-ivory relative"
    aria-label="Clinical Leadership and Doctor Profile"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Doctor Card -->
      <div class="doctor-card max-w-5xl mx-auto bg-white rounded-3xl overflow-hidden border border-brand-border shadow-card grid grid-cols-1 lg:grid-cols-12">
        
        <!-- Left: Real Consultation Office Visual (5 cols) -->
        <div class="lg:col-span-5 relative bg-brand-mint overflow-hidden min-h-[320px] lg:min-h-full">
          <img 
            src="/assets/clinic/dr-achal-agarwal.jpg" 
            alt="Dr. Achal Agarwal - Dentist, Orthodontist and Dentofacial Orthopaedist at OneCare Aesthetix Clinic Kothrud Pune" 
            class="w-full h-full object-cover object-[center_55%]"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-brand-teal-deep/85 via-brand-teal-deep/25 to-transparent"></div>

          <!-- Doctor Tag & Experience on Image -->
          <div class="absolute bottom-6 left-6 right-6 text-white">
            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-brand-mint text-xs font-semibold mb-2">
              <Award class="w-3.5 h-3.5" />
              <span>9+ Years Clinical Practice</span>
            </div>
            <h3 class="text-2xl font-bold">{{ siteConfig.leadDoctor.name }}</h3>
            <p class="text-xs text-brand-mint/90 font-medium mt-0.5">
              {{ siteConfig.leadDoctor.title }}
            </p>
          </div>
        </div>

        <!-- Right: Doctor Details & Philosophy (7 cols) -->
        <div class="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between">
          <div>
            <div class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-teal-dark mb-3">
              <Stethoscope class="w-4 h-4 text-brand-teal" />
              <span>Clinical Leadership</span>
            </div>

            <h3 class="text-2xl sm:text-3xl font-extrabold text-brand-charcoal mb-4">
              Care Guided by 9+ Years of <br />
              <span class="font-serif italic font-normal text-brand-teal-dark">Clinical Dedication.</span>
            </h3>

            <p class="text-sm text-brand-muted leading-relaxed mb-6">
              {{ siteConfig.leadDoctor.bio }}
            </p>

            <h4 class="text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-3">
              Areas of Focus & Clinical Specialties
            </h4>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
              <div 
                v-for="(spec, i) in siteConfig.leadDoctor.specialties" 
                :key="i"
                class="flex items-center gap-2 text-xs font-medium text-brand-charcoal p-2.5 rounded-xl bg-brand-mint/40 border border-brand-teal/15"
              >
                <Sparkles class="w-3.5 h-3.5 text-brand-teal shrink-0" />
                <span>{{ spec }}</span>
              </div>
            </div>
          </div>

          <!-- Doctor Booking Actions -->
          <div class="pt-6 border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="text-xs text-brand-muted text-center sm:text-left">
              {{ siteConfig.leadDoctor.note }}
            </div>

            <div class="w-full sm:w-auto">
              <a 
                href="#appointment"
                class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-brand-teal-dark hover:bg-brand-teal text-white text-xs font-semibold shadow-soft hover:shadow-card hover:-translate-y-0.5 transition-all"
              >
                <Calendar class="w-3.5 h-3.5" />
                <span>Book With Doctor</span>
              </a>
            </div>
          </div>

        </div>

      </div>

    </div>
  </section>
</template>
