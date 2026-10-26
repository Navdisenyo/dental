<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { 
  Calendar, 
  MessageCircle, 
  Sparkles, 
  Play, 
  CheckCircle2, 
  ArrowRight,
  X
} from 'lucide-vue-next'
import { siteConfig } from '../../config/site'

const heroRoot = ref<HTMLElement | null>(null)
const videoModalOpen = ref(false)

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && videoModalOpen.value) {
    videoModalOpen.value = false
  }
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !heroRoot.value) return

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.from('.hero-badge', {
      opacity: 0,
      y: -15,
      duration: 0.6
    })
    .from('.hero-headline-line', {
      opacity: 0,
      y: 35,
      stagger: 0.12,
      duration: 0.9
    }, '-=0.3')
    .from('.hero-sub', {
      opacity: 0,
      y: 20,
      duration: 0.8
    }, '-=0.5')
    .from('.hero-cta', {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.7
    }, '-=0.5')
    .from('.hero-visual-card', {
      opacity: 0,
      scale: 0.94,
      duration: 1.1,
      ease: 'power2.out'
    }, '-=0.8')
    .from('.hero-floating-card', {
      opacity: 0,
      y: 30,
      duration: 0.8
    }, '-=0.4')
  }, heroRoot.value)

  window.addEventListener('keydown', handleKeydown)

  return () => ctx.revert()
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <section 
    id="home"
    ref="heroRoot"
    class="relative min-h-[92vh] flex items-center pt-8 pb-16 lg:py-20 overflow-hidden bg-gradient-to-b from-brand-ivory via-brand-mint-light/40 to-brand-ivory"
    aria-label="Welcome to OneCare Aesthetix Clinic"
  >
    <!-- Subtle Background Organic Motifs -->
    <div class="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-brand-teal/10 blur-3xl pointer-events-none"></div>
    <div class="absolute top-1/2 -right-40 w-[500px] h-[500px] rounded-full bg-brand-mint blur-3xl pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        <!-- Left Column: Copy & Conversions (7 cols) -->
        <div class="lg:col-span-7 flex flex-col items-start text-left">
          
          <!-- Category Pill -->
          <div class="hero-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-mint border border-brand-teal/30 text-brand-teal-dark text-xs font-semibold tracking-wide mb-6">
            <span class="w-2 h-2 rounded-full bg-brand-teal animate-pulse"></span>
            <span>Dental & Facial Aesthetics • Kothrud, Pune</span>
          </div>

          <!-- Main Editorial Headline -->
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-charcoal tracking-tight leading-[1.12] mb-6">
            <span class="hero-headline-line block">Your Smile.</span>
            <span class="hero-headline-line block text-brand-teal-dark">
              Your Confidence.
            </span>
            <span class="hero-headline-line block font-serif italic font-normal text-brand-charcoal">
              Our Thoughtful Care.
            </span>
          </h1>

          <!-- Supporting Subtitle -->
          <p class="hero-sub text-base sm:text-lg text-brand-muted max-w-xl leading-relaxed mb-8 font-normal">
            Personalized dental care and facial aesthetics designed around your comfort. From digital smile design and dental implants to clinical skin rejuvenation in a serene, daylight-filled sanctuary in Kothrud.
          </p>

          <!-- Primary CTAs -->
          <div class="hero-cta flex flex-wrap items-center gap-4 w-full sm:w-auto">
            <a 
              href="#appointment"
              class="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-brand-teal-dark hover:bg-brand-teal text-white font-semibold shadow-card hover:shadow-float hover:-translate-y-0.5 active:translate-y-0 transition-all text-sm group"
            >
              <Calendar class="w-4 h-4 text-brand-mint transition-transform group-hover:scale-110" />
              <span>Book an Appointment</span>
              <ArrowRight class="w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform" />
            </a>

            <a 
              :href="siteConfig.contact.whatsappLink"
              target="_blank"
              rel="noopener noreferrer"
              class="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white hover:bg-brand-mint/60 text-brand-teal-dark font-semibold border border-brand-teal/30 shadow-soft hover:shadow-card hover:-translate-y-0.5 transition-all text-sm"
            >
              <MessageCircle class="w-4 h-4 text-brand-teal" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

        </div>

        <!-- Right Column: Clinic Visual Composition & 3D Accent (5 cols) -->
        <div class="lg:col-span-5 relative mt-6 lg:mt-0">
          
          <!-- Layered Visual Card Composition -->
          <div class="hero-visual-card relative rounded-3xl overflow-hidden shadow-float border-2 border-white bg-white group">
            
            <!-- Real Panoramic Clinic Image -->
            <div class="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-brand-mint">
              <img 
                src="/assets/clinic/clinic-panoramic-suite.jpg" 
                alt="OneCare Aesthetix Clinic Daylight Operatory Suite in Kothrud Pune" 
                class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-brand-teal-deep/30 via-transparent to-black/10"></div>

              <!-- Top Left Tag: Actual Clinic -->
              <div class="absolute top-4 left-4 z-20">
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-brand-teal-deep text-xs font-semibold shadow-soft">
                  <CheckCircle2 class="w-3.5 h-3.5 text-brand-teal" />
                  <span>Real Clinic Interior</span>
                </span>
              </div>

              <!-- Video Tour Trigger Button -->
              <button 
                type="button"
                class="absolute top-4 right-4 z-20 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-teal-deep/85 hover:bg-brand-teal-deep text-white backdrop-blur-md text-xs font-medium shadow-soft transition-all hover:scale-105"
                @click="videoModalOpen = true"
                title="Watch actual clinic interior video tour"
              >
                <div class="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <Play class="w-2.5 h-2.5 fill-current text-brand-mint ml-0.5" />
                </div>
                <span>Video Tour</span>
              </button>
            </div>

          </div>

          <!-- Floating Badge Card: Split Timings & Consultation -->
          <div class="hero-floating-card absolute -bottom-6 -left-4 sm:-left-8 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-card border border-brand-border z-30 max-w-[260px] hidden sm:block">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-brand-mint flex items-center justify-center shrink-0">
                <Sparkles class="w-5 h-5 text-brand-teal-dark" />
              </div>
              <div>
                <div class="text-xs font-bold text-brand-charcoal">Personalized Consultations</div>
                <div class="text-[11px] text-brand-muted">Private dedicated doctor slots</div>
              </div>
            </div>
            <div class="mt-2.5 pt-2 border-t border-brand-border/60 flex items-center justify-between text-[11px]">
              <span class="text-emerald-700 font-semibold flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Appointments Open</span>
              </span>
              <a href="#appointment" class="text-brand-teal-dark font-medium hover:underline">Reserve →</a>
            </div>
          </div>

        </div>

      </div>
    </div>

    <!-- Video Tour Modal -->
    <div 
      v-if="videoModalOpen" 
      class="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Clinic Video Tour"
      @click.self="videoModalOpen = false"
    >
      <!-- Fixed Close Button (Top-Right of screen) for effortless 1-click closing -->
      <button 
        type="button" 
        class="fixed top-4 right-4 sm:top-6 sm:right-6 z-[60] w-11 h-11 rounded-full bg-white/20 hover:bg-white/30 text-white border border-white/40 backdrop-blur-md flex items-center justify-center transition-all hover:scale-105 shadow-2xl cursor-pointer"
        @click="videoModalOpen = false"
        aria-label="Close video tour"
        title="Close (Esc)"
      >
        <X class="w-6 h-6 text-white" />
      </button>

      <div class="relative w-full max-w-xs sm:max-w-sm md:max-w-md max-h-[85vh] sm:max-h-[88vh] flex flex-col bg-black rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/20">
        <!-- Modal Header -->
        <div class="px-4 py-3 bg-brand-teal-deep text-white text-xs sm:text-sm font-semibold flex items-center justify-between border-b border-white/10 shrink-0">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-brand-mint animate-pulse"></span>
            <span>OneCare Aesthetix Clinic Tour</span>
          </div>
          <button 
            type="button" 
            class="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
            @click="videoModalOpen = false"
            aria-label="Close video tour"
          >
            <X class="w-4 h-4 text-white" />
          </button>
        </div>

        <!-- Video Container - fits dynamically in viewport height -->
        <div class="relative flex-1 min-h-0 bg-black flex items-center justify-center overflow-hidden">
          <video 
            src="/assets/clinic/clinic-tour.mp4" 
            controls 
            autoplay 
            playsinline 
            class="w-full h-full max-h-[calc(85vh-95px)] aspect-[9/16] object-contain bg-black"
          ></video>
        </div>

        <!-- Modal Footer -->
        <div class="p-3 sm:p-4 bg-brand-teal-deep text-center text-xs text-brand-mint/90 flex justify-between items-center border-t border-white/10 shrink-0">
          <span class="font-medium">Kothrud, Pune</span>
          <a 
            href="#appointment" 
            class="px-3.5 py-1.5 bg-brand-teal text-white rounded-lg font-medium hover:bg-brand-teal-light hover:text-brand-teal-deep transition-colors text-xs"
            @click="videoModalOpen = false"
          >
            Book Visit
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
