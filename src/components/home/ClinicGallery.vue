<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  Camera, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-vue-next'
import { siteConfig } from '../../config/site'

gsap.registerPlugin(ScrollTrigger)
const galleryRoot = ref<HTMLElement | null>(null)
const activeIndex = ref<number | null>(null)
const showVideoPlayer = ref(false)

const openLightbox = (index: number) => {
  activeIndex.value = index
}

const closeLightbox = () => {
  activeIndex.value = null
}

const nextImage = () => {
  if (activeIndex.value !== null) {
    activeIndex.value = (activeIndex.value + 1) % siteConfig.gallery.length
  }
}

const prevImage = () => {
  if (activeIndex.value !== null) {
    activeIndex.value = (activeIndex.value - 1 + siteConfig.gallery.length) % siteConfig.gallery.length
  }
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    if (showVideoPlayer.value) showVideoPlayer.value = false
    if (activeIndex.value !== null) closeLightbox()
  }
  if (activeIndex.value === null) return
  if (e.key === 'ArrowRight') nextImage()
  if (e.key === 'ArrowLeft') prevImage()
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !galleryRoot.value) return

  const ctx = gsap.context(() => {
    gsap.fromTo('.gallery-tile',
      { scale: 0.95, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power3.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: galleryRoot.value,
          start: 'top 92%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    )
  }, galleryRoot.value)

  return () => ctx.revert()
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <section 
    id="clinic"
    ref="galleryRoot"
    class="py-20 lg:py-28 bg-brand-ivory relative"
    aria-label="Real Clinic Atmosphere and Photo Gallery"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header with Video Reel Callout -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div class="max-w-2xl">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-mint text-brand-teal-dark text-xs font-semibold uppercase tracking-wider mb-4">
            <Camera class="w-3.5 h-3.5 text-brand-teal" />
            <span>Authentic Premises</span>
          </div>

          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-charcoal tracking-tight">
            A Place Designed to <br />
            <span class="font-serif italic font-normal text-brand-teal-dark">Make You Feel at Ease.</span>
          </h2>

          <p class="mt-4 text-base text-brand-muted leading-relaxed">
            Take a look inside our actual clinic premises at Geetai Sankul, Kothrud. From tranquil Scandinavian oak claddings to panoramic tree canopy operatory suites, every detail is crafted for your peace of mind.
          </p>
        </div>

        <!-- Walkthrough Video Tour Button -->
        <div class="shrink-0">
          <button 
            type="button"
            class="inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-brand-teal-deep hover:bg-brand-teal text-white text-xs font-semibold shadow-soft hover:shadow-card transition-all"
            @click="showVideoPlayer = true"
          >
            <div class="w-6 h-6 rounded-full bg-brand-teal flex items-center justify-center">
              <Play class="w-3 h-3 fill-current text-white ml-0.5" />
            </div>
            <span>Watch Full Clinic Video Tour</span>
          </button>
        </div>
      </div>

      <!-- Gallery Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <div 
          v-for="(item, idx) in siteConfig.gallery" 
          :key="idx"
          class="gallery-tile group relative rounded-3xl overflow-hidden bg-brand-mint border border-brand-border/80 shadow-soft cursor-pointer aspect-[4/3]"
          @click="openLightbox(idx)"
          tabindex="0"
          :aria-label="'View ' + item.title"
          @keydown.enter="openLightbox(idx)"
        >
          <img 
            :src="item.wideImage || item.image" 
            :alt="item.title + ' — OneCare Aesthetix Clinic Kothrud'"
            class="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
            loading="lazy"
          />

          <!-- Gradient Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-brand-charcoal/85 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300"></div>

          <!-- Category Badge -->
          <div class="absolute top-4 left-4 z-10">
            <span class="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-semibold text-brand-teal-deep">
              {{ item.category }}
            </span>
          </div>

          <!-- Expand Icon -->
          <div class="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center backdrop-blur-md group-hover:bg-brand-teal transition-colors">
            <Maximize2 class="w-3.5 h-3.5" />
          </div>

          <!-- Bottom Caption -->
          <div class="absolute bottom-4 left-4 right-4 z-10 text-white">
            <h3 class="text-base font-bold leading-tight">{{ item.title }}</h3>
            <p class="text-xs text-brand-mint/90 mt-1 line-clamp-1">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>

    </div>

    <!-- Lightbox Modal -->
    <div 
      v-if="activeIndex !== null"
      class="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Image Lightbox"
    >
      <!-- Close Button -->
      <button 
        type="button"
        class="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-brand-teal"
        @click="closeLightbox"
        aria-label="Close Lightbox (Esc)"
      >
        <X class="w-5 h-5" />
      </button>

      <!-- Prev Button -->
      <button 
        type="button"
        class="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-brand-teal"
        @click="prevImage"
        aria-label="Previous Image"
      >
        <ChevronLeft class="w-6 h-6" />
      </button>

      <!-- Next Button -->
      <button 
        type="button"
        class="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-brand-teal"
        @click="nextImage"
        aria-label="Next Image"
      >
        <ChevronRight class="w-6 h-6" />
      </button>

      <!-- Lightbox Main Content -->
      <div class="relative max-w-4xl max-h-[85vh] flex flex-col items-center">
        <img 
          :src="siteConfig.gallery[activeIndex].image" 
          :alt="siteConfig.gallery[activeIndex].title"
          class="max-w-full max-h-[70vh] rounded-2xl object-contain shadow-2xl"
        />
        <div class="mt-4 text-center text-white max-w-xl">
          <div class="text-xs uppercase tracking-widest text-brand-teal-light font-semibold mb-1">
            {{ siteConfig.gallery[activeIndex].category }} • Photo {{ activeIndex + 1 }} of {{ siteConfig.gallery.length }}
          </div>
          <h4 class="text-xl font-bold">{{ siteConfig.gallery[activeIndex].title }}</h4>
          <p class="text-xs text-brand-mint/80 mt-1">{{ siteConfig.gallery[activeIndex].description }}</p>
        </div>
      </div>
    </div>

    <!-- Video Walkthrough Modal -->
    <div 
      v-if="showVideoPlayer"
      class="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Clinic Video Tour Walkthrough"
      @click.self="showVideoPlayer = false"
    >
      <!-- Fixed Close Button (Top-Right of screen) for effortless 1-click closing -->
      <button 
        type="button" 
        class="fixed top-4 right-4 sm:top-6 sm:right-6 z-[60] w-11 h-11 rounded-full bg-white/20 hover:bg-white/30 text-white border border-white/40 backdrop-blur-md flex items-center justify-center transition-all hover:scale-105 shadow-2xl cursor-pointer"
        @click="showVideoPlayer = false"
        aria-label="Close video tour"
        title="Close (Esc)"
      >
        <X class="w-6 h-6 text-white" />
      </button>

      <div class="relative w-full max-w-xs sm:max-w-sm md:max-w-md max-h-[85vh] sm:max-h-[88vh] flex flex-col bg-black rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/20">
        <!-- Modal Top Bar -->
        <div class="px-4 py-3 bg-brand-teal-deep text-white text-xs sm:text-sm font-semibold flex items-center justify-between border-b border-white/10 shrink-0">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-brand-mint animate-pulse"></span>
            <span>OneCare Aesthetix Clinic — Walkthrough</span>
          </div>
          <button 
            type="button" 
            class="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
            @click="showVideoPlayer = false"
            aria-label="Close video"
          >
            <X class="w-4 h-4 text-white" />
          </button>
        </div>

        <!-- Video Player constrained to available height -->
        <div class="relative flex-1 min-h-0 bg-black flex items-center justify-center overflow-hidden">
          <video 
            src="/assets/clinic/clinic-tour.mp4" 
            controls 
            autoplay 
            playsinline 
            class="w-full h-full max-h-[calc(85vh-95px)] aspect-[9/16] object-contain bg-black"
          ></video>
        </div>

        <!-- Modal Bottom Bar -->
        <div class="p-3 sm:p-4 bg-brand-teal-deep flex items-center justify-between text-xs text-brand-mint border-t border-white/10 shrink-0">
          <span class="font-medium">Kothrud, Pune</span>
          <a 
            href="#appointment"
            class="px-3.5 py-1.5 rounded-lg bg-brand-teal hover:bg-brand-teal-light text-white hover:text-brand-teal-deep font-semibold transition-colors text-xs"
            @click="showVideoPlayer = false"
          >
            Schedule Consultation
          </a>
        </div>
      </div>
    </div>

  </section>
</template>
