<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Sparkles, HeartHandshake, Eye, CheckCircle2, ArrowRight } from 'lucide-vue-next'

gsap.registerPlugin(ScrollTrigger)
const welcomeRoot = ref<HTMLElement | null>(null)

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !welcomeRoot.value) return

  const ctx = gsap.context(() => {
    gsap.from('.welcome-text-col', {
      scrollTrigger: {
        trigger: welcomeRoot.value,
        start: 'top 80%',
        toggleActions: 'play none none none',
        once: true
      },
      x: -30,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out'
    })

    gsap.from('.welcome-image-col', {
      scrollTrigger: {
        trigger: welcomeRoot.value,
        start: 'top 80%',
        toggleActions: 'play none none none',
        once: true
      },
      x: 30,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out'
    })
  }, welcomeRoot.value)

  return () => ctx.revert()
})
</script>

<template>
  <section 
    id="about"
    ref="welcomeRoot"
    class="py-20 lg:py-28 bg-brand-ivory relative overflow-hidden"
    aria-label="About OneCare Aesthetix Clinic"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        <!-- Left Column: Editorial Introduction (7 cols) -->
        <div class="welcome-text-col lg:col-span-7 flex flex-col items-start text-left">
          
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-mint text-brand-teal-dark text-xs font-semibold tracking-wider uppercase mb-4">
            <HeartHandshake class="w-3.5 h-3.5 text-brand-teal" />
            <span>Welcome to OneCare Aesthetix</span>
          </div>

          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-charcoal tracking-tight leading-[1.2] mb-6">
            Care That Begins With <br />
            <span class="font-serif italic font-normal text-brand-teal-dark">Understanding You.</span>
          </h2>

          <p class="text-base sm:text-lg text-brand-muted leading-relaxed mb-6 font-normal">
            At OneCare Aesthetix Clinic, we believe dentistry should feel reassuring, transparent, and artfully aligned with your overall facial harmony. Whether you are visiting for routine preventive dental maintenance, a transformative smile redesign, or clinical facial aesthetic treatments, your comfort is prioritized from the moment you step inside.
          </p>

          <p class="text-sm sm:text-base text-brand-muted leading-relaxed mb-8">
            Located in Geetai Sankul, Kothrud, our clinic was consciously created as a warm, Scandinavian-inspired haven. With natural daylight, lush tree views, and modern dental technology, we take time to listen, explain your options clearly, and tailor care without rush.
          </p>

          <!-- Core Pillars -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-8">
            <div class="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-brand-border/80 shadow-soft">
              <CheckCircle2 class="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
              <div>
                <div class="text-xs font-bold text-brand-charcoal">Personalized Consultations</div>
                <div class="text-[11px] text-brand-muted leading-relaxed">Dedicated slots where your concerns and expectations are thoroughly heard.</div>
              </div>
            </div>

            <div class="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-brand-border/80 shadow-soft">
              <CheckCircle2 class="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
              <div>
                <div class="text-xs font-bold text-brand-charcoal">Calming Daylight Environment</div>
                <div class="text-[11px] text-brand-muted leading-relaxed">Operatories with natural garden views to ease clinical anxiety.</div>
              </div>
            </div>

            <div class="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-brand-border/80 shadow-soft">
              <CheckCircle2 class="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
              <div>
                <div class="text-xs font-bold text-brand-charcoal">Dual Care Under One Roof</div>
                <div class="text-[11px] text-brand-muted leading-relaxed">Specialized smile design & clinical facial aesthetic care in synergy.</div>
              </div>
            </div>

            <div class="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-brand-border/80 shadow-soft">
              <CheckCircle2 class="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
              <div>
                <div class="text-xs font-bold text-brand-charcoal">Hospital-Grade Sterilization</div>
                <div class="text-[11px] text-brand-muted leading-relaxed">Strict multi-stage autoclave and infection-barrier protocols.</div>
              </div>
            </div>
          </div>

          <!-- Secondary Link -->
          <div class="flex items-center gap-4">
            <a 
              href="#clinic" 
              class="inline-flex items-center gap-2 text-sm font-semibold text-brand-teal-dark hover:text-brand-teal transition-colors group"
            >
              <span>View Patient Transformations & Clinic Gallery</span>
              <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

        </div>

        <!-- Right Column: Real Clinic Photography (5 cols) -->
        <div class="welcome-image-col lg:col-span-5 relative">
          
          <div class="relative rounded-3xl overflow-hidden shadow-card border-4 border-white bg-white">
            <img 
              src="/assets/clinic/reception-lounge.jpg" 
              alt="OneCare Aesthetix Clinic Warm Oak Reception Lounge in Kothrud Pune" 
              class="w-full aspect-[4/5] object-cover object-center"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-brand-charcoal/70 via-transparent to-transparent"></div>

            <div class="absolute bottom-5 left-5 right-5 text-white">
              <div class="text-xs uppercase tracking-wider text-brand-teal-light font-bold mb-1">
                Warm Scandinavian Oak Cladding
              </div>
              <div class="text-sm font-medium">
                Our tranquil waiting lounge designed to welcome every patient with warmth and comfort.
              </div>
            </div>
          </div>

          <!-- Decorative accent badge -->
          <div class="absolute -bottom-6 -right-4 sm:-right-6 bg-brand-teal-deep text-white p-4 rounded-2xl shadow-card border border-brand-teal/30 max-w-[200px]">
            <div class="text-xs text-brand-mint/80 font-medium">Patient-First Philosophy</div>
            <div class="text-sm font-bold text-white mt-1">Honest care, zero pressure</div>
          </div>

        </div>

      </div>
    </div>
  </section>
</template>
