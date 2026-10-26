<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  Sparkles,
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  CheckCircle2, 
  Smile,
  Clock,
  ShieldCheck,
  ArrowRight
} from 'lucide-vue-next'
import { siteConfig } from '../../config/site'

gsap.registerPlugin(ScrollTrigger)

const galleryRoot = ref<HTMLElement | null>(null)

// Transformations filter category
const activeCategory = ref<'all' | 'orthodontics' | 'dentofacial' | 'gap-closure' | 'complex'>('all')

// Modals state
const activeTransformationIndex = ref<number | null>(null)
const showVideoPlayer = ref(false)

// Filtered transformations
const filteredTransformations = computed(() => {
  if (activeCategory.value === 'all') {
    return siteConfig.transformations
  }
  return siteConfig.transformations.filter(t => t.category === activeCategory.value)
})

// Current open transformation for modal
const currentTransformation = computed(() => {
  if (activeTransformationIndex.value === null) return null
  return siteConfig.transformations[activeTransformationIndex.value]
})

// Lightbox triggers for transformations
const openTransformationModal = (id: string) => {
  const idx = siteConfig.transformations.findIndex(t => t.id === id)
  if (idx !== -1) {
    activeTransformationIndex.value = idx
  }
}

const closeModals = () => {
  activeTransformationIndex.value = null
}

const nextTransformation = () => {
  if (activeTransformationIndex.value !== null) {
    activeTransformationIndex.value = (activeTransformationIndex.value + 1) % siteConfig.transformations.length
  }
}

const prevTransformation = () => {
  if (activeTransformationIndex.value !== null) {
    activeTransformationIndex.value = 
      (activeTransformationIndex.value - 1 + siteConfig.transformations.length) % siteConfig.transformations.length
  }
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    if (showVideoPlayer.value) showVideoPlayer.value = false
    closeModals()
  }
  if (activeTransformationIndex.value !== null) {
    if (e.key === 'ArrowRight') nextTransformation()
    if (e.key === 'ArrowLeft') prevTransformation()
  }
}

const animateCards = () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !galleryRoot.value) return
  gsap.fromTo('.transformation-card',
    { y: 20, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      stagger: 0.08,
      duration: 0.5,
      ease: 'power3.out',
      clearProps: 'all'
    }
  )
}

const switchCategory = (category: 'all' | 'orthodontics' | 'dentofacial' | 'gap-closure' | 'complex') => {
  activeCategory.value = category
  setTimeout(animateCards, 50)
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !galleryRoot.value) return

  const ctx = gsap.context(() => {
    gsap.fromTo('.transformation-card',
      { y: 25, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power3.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: galleryRoot.value,
          start: 'top 85%',
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
    class="py-20 lg:py-28 bg-brand-ivory relative overflow-hidden"
    aria-label="Real Patient Before and After Transformations"
  >
    <!-- Background subtle aesthetic accent -->
    <div class="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-brand-mint/40 blur-3xl pointer-events-none"></div>
    <div class="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-brand-teal/5 blur-3xl pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div class="max-w-2xl">
          <!-- Authentic Pill Badge -->
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-mint text-brand-teal-dark text-xs font-semibold uppercase tracking-wider mb-4 border border-brand-teal/20">
            <Sparkles class="w-3.5 h-3.5 text-brand-teal" />
            <span>Authentic Patient Results</span>
          </div>

          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-charcoal tracking-tight">
            Real Transformations, <br />
            <span class="font-serif italic font-normal text-brand-teal-dark">Genuine Confident Smiles.</span>
          </h2>

          <p class="mt-4 text-base text-brand-muted leading-relaxed">
            See actual clinical before-and-after results documented at OneCare Aesthetix Clinic, Kothrud. Under the expert care of <strong class="text-brand-charcoal font-semibold">Dr. Achal Agarwal (Dentist, Orthodontist & Dentofacial Orthopaedist)</strong>, every treatment is customized to restore natural bite function, jawline balance, and radiant aesthetics.
          </p>
        </div>

        <!-- Video Tour Callout Button -->
        <div class="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button 
            type="button"
            class="inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-2xl bg-brand-teal-deep hover:bg-brand-teal text-white text-xs font-semibold shadow-soft hover:shadow-card transition-all"
            @click="showVideoPlayer = true"
          >
            <div class="w-6 h-6 rounded-full bg-brand-teal flex items-center justify-center">
              <Play class="w-3 h-3 fill-current text-white ml-0.5" />
            </div>
            <span>Watch Full Clinic Video Tour</span>
          </button>
        </div>
      </div>

      <!-- Filter Sub-categories for Patient Transformations -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-brand-border/60">
        <div class="flex flex-wrap items-center gap-2">
          <span class="text-xs font-semibold text-brand-muted mr-1">Filter Case:</span>
          <button 
            type="button"
            class="px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all border"
            :class="activeCategory === 'all' 
              ? 'bg-brand-charcoal text-white border-brand-charcoal shadow-sm' 
              : 'bg-white text-brand-muted border-brand-border hover:bg-brand-mint/40 hover:text-brand-charcoal'"
            @click="switchCategory('all')"
          >
            All Cases ({{ siteConfig.transformations.length }})
          </button>
          <button 
            type="button"
            class="px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all border"
            :class="activeCategory === 'orthodontics' 
              ? 'bg-brand-charcoal text-white border-brand-charcoal shadow-sm' 
              : 'bg-white text-brand-muted border-brand-border hover:bg-brand-mint/40 hover:text-brand-charcoal'"
            @click="switchCategory('orthodontics')"
          >
            Orthodontics & Braces
          </button>
          <button 
            type="button"
            class="px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all border"
            :class="activeCategory === 'dentofacial' 
              ? 'bg-brand-charcoal text-white border-brand-charcoal shadow-sm' 
              : 'bg-white text-brand-muted border-brand-border hover:bg-brand-mint/40 hover:text-brand-charcoal'"
            @click="switchCategory('dentofacial')"
          >
            Dentofacial Orthopaedics
          </button>
          <button 
            type="button"
            class="px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all border"
            :class="activeCategory === 'gap-closure' 
              ? 'bg-brand-charcoal text-white border-brand-charcoal shadow-sm' 
              : 'bg-white text-brand-muted border-brand-border hover:bg-brand-mint/40 hover:text-brand-charcoal'"
            @click="switchCategory('gap-closure')"
          >
            Gap Closure
          </button>
          <button 
            type="button"
            class="px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all border"
            :class="activeCategory === 'complex' 
              ? 'bg-brand-charcoal text-white border-brand-charcoal shadow-sm' 
              : 'bg-white text-brand-muted border-brand-border hover:bg-brand-mint/40 hover:text-brand-charcoal'"
            @click="switchCategory('complex')"
          >
            Complex Alignment
          </button>
        </div>

        <div class="text-xs text-brand-muted flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Verified Clinical Results by Dr. Achal Agarwal</span>
        </div>
      </div>

      <!-- ============================================== -->
      <!-- PATIENT TRANSFORMATIONS (BEFORE & AFTER) GRID  -->
      <!-- ============================================== -->
      <div class="space-y-8">
        
        <!-- Grid of Transformation Cards (3 Columns) -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div 
            v-for="item in filteredTransformations" 
            :key="item.id"
            class="transformation-card group bg-white rounded-3xl overflow-hidden border border-brand-border/90 shadow-soft hover:shadow-card transition-all duration-300 flex flex-col cursor-pointer"
            @click="openTransformationModal(item.id)"
            tabindex="0"
            :aria-label="'View transformation details: ' + item.title"
            @keydown.enter="openTransformationModal(item.id)"
          >
            <!-- Image Area with interactive zoom -->
            <div class="relative bg-brand-mint/40 overflow-hidden aspect-[4/3] flex items-center justify-center">
              <img 
                :src="item.image" 
                :alt="item.title + ' — Before and After Patient Transformation at OneCare Aesthetix Clinic Kothrud'"
                class="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />

              <!-- Floating Before & After Clinical Badge -->
              <div class="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-charcoal/80 backdrop-blur-md text-white text-[11px] font-semibold border border-white/20">
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Before & After Result</span>
              </div>

              <!-- Zoom Icon Button -->
              <div class="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-brand-charcoal/70 text-white flex items-center justify-center backdrop-blur-md group-hover:bg-brand-teal transition-colors shadow-sm">
                <Maximize2 class="w-3.5 h-3.5" />
              </div>

              <!-- Quick category overlay pill on bottom of image -->
              <div class="absolute bottom-3 left-3 z-10">
                <span class="px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-md text-[11px] font-bold text-brand-teal-deep shadow-sm">
                  {{ item.patientTag }}
                </span>
              </div>
            </div>

            <!-- Content Area -->
            <div class="p-5 sm:p-6 flex flex-col flex-grow justify-between bg-white">
              <div>
                <!-- Treatment & Duration Meta -->
                <div class="flex items-center justify-between text-xs text-brand-muted mb-2 font-medium">
                  <span class="text-brand-teal font-semibold">{{ item.categoryLabel }}</span>
                  <span class="inline-flex items-center gap-1 text-[11px] bg-brand-mint/60 px-2 py-0.5 rounded text-brand-teal-dark font-medium">
                    <Clock class="w-3 h-3" />
                    {{ item.duration }}
                  </span>
                </div>

                <!-- Case Title -->
                <h3 class="text-lg font-bold text-brand-charcoal group-hover:text-brand-teal transition-colors leading-snug mb-1">
                  {{ item.title }}
                </h3>
                <p class="text-xs text-brand-muted font-medium mb-3">
                  {{ item.subtitle }}
                </p>

                <!-- Clinical Details Box -->
                <div class="space-y-2 py-3 px-3.5 rounded-xl bg-brand-ivory border border-brand-border/60 text-xs text-brand-charcoal mb-4">
                  <div class="flex items-start gap-2">
                    <span class="shrink-0 font-bold text-red-700 bg-red-100 px-1.5 py-0.5 rounded text-[10px] uppercase">Before</span>
                    <span class="text-brand-muted text-[11px] leading-tight line-clamp-2">{{ item.concern }}</span>
                  </div>
                  <div class="flex items-start gap-2 pt-1 border-t border-brand-border/40">
                    <span class="shrink-0 font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded text-[10px] uppercase">After</span>
                    <span class="text-brand-charcoal text-[11px] font-medium leading-tight line-clamp-2">{{ item.outcome }}</span>
                  </div>
                </div>

                <!-- Highlights tags -->
                <div class="flex flex-wrap gap-1.5 mb-2">
                  <span 
                    v-for="(hl, i) in item.highlights" 
                    :key="i"
                    class="text-[11px] px-2 py-0.5 rounded-md bg-brand-mint/40 text-brand-teal-dark font-medium"
                  >
                    ✓ {{ hl }}
                  </span>
                </div>
              </div>

              <!-- Card Action Button -->
              <div class="pt-4 border-t border-brand-border/60 flex items-center justify-between">
                <span class="text-xs font-semibold text-brand-teal group-hover:underline flex items-center gap-1">
                  View Full Case Details
                  <ArrowRight class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
                <span class="text-[11px] text-brand-muted">
                  Dr. Achal Agarwal
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Clinical Trust Highlights Footer Banner -->
        <div class="rounded-3xl bg-white border border-brand-border/80 p-6 sm:p-8 shadow-soft">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
            
            <div class="flex items-center gap-3.5">
              <div class="w-11 h-11 rounded-2xl bg-brand-mint text-brand-teal flex items-center justify-center shrink-0">
                <ShieldCheck class="w-6 h-6" />
              </div>
              <div>
                <h4 class="text-sm font-bold text-brand-charcoal">100% Real Patient Results</h4>
                <p class="text-xs text-brand-muted mt-0.5">Untouched clinical photos documented at our Kothrud clinic.</p>
              </div>
            </div>

            <div class="flex items-center gap-3.5">
              <div class="w-11 h-11 rounded-2xl bg-brand-mint text-brand-teal flex items-center justify-center shrink-0">
                <Smile class="w-6 h-6" />
              </div>
              <div>
                <h4 class="text-sm font-bold text-brand-charcoal">Specialist Orthodontist</h4>
                <p class="text-xs text-brand-muted mt-0.5">Personalized care by Dr. Achal Agarwal (BDS, MDS).</p>
              </div>
            </div>

            <div class="flex items-center gap-3.5">
              <div class="w-11 h-11 rounded-2xl bg-brand-mint text-brand-teal flex items-center justify-center shrink-0">
                <Sparkles class="w-6 h-6" />
              </div>
              <div>
                <h4 class="text-sm font-bold text-brand-charcoal">Digital Precision Planning</h4>
                <p class="text-xs text-brand-muted mt-0.5">Predictable treatment milestones and transparent timelines.</p>
              </div>
            </div>

            <div class="text-center md:text-right">
              <a 
                href="#appointment"
                class="inline-flex items-center justify-center gap-2 w-full md:w-auto px-5 py-3 rounded-xl bg-brand-teal hover:bg-brand-teal-deep text-white text-xs font-bold transition-all shadow-soft hover:shadow-card"
              >
                <span>Book Smile Consultation</span>
                <ArrowRight class="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>

      </div>

    </div>

    <!-- ======================================================== -->
    <!-- MODAL: TRANSFORMATION CASE DETAIL LIGHTBOX               -->
    <!-- ======================================================== -->
    <div 
      v-if="currentTransformation !== null"
      class="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Patient Transformation Case Details"
      @click.self="closeModals"
    >
      <!-- Fixed Close Button -->
      <button 
        type="button"
        class="fixed top-5 right-5 z-50 w-11 h-11 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-brand-teal"
        @click="closeModals"
        aria-label="Close Case Lightbox (Esc)"
      >
        <X class="w-5 h-5" />
      </button>

      <!-- Prev Transformation Button -->
      <button 
        type="button"
        class="hidden sm:flex fixed left-4 sm:left-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-white/20 hover:bg-white/30 text-white items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-brand-teal"
        @click="prevTransformation"
        aria-label="Previous Transformation Case"
      >
        <ChevronLeft class="w-6 h-6" />
      </button>

      <!-- Next Transformation Button -->
      <button 
        type="button"
        class="hidden sm:flex fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-white/20 hover:bg-white/30 text-white items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-brand-teal"
        @click="nextTransformation"
        aria-label="Next Transformation Case"
      >
        <ChevronRight class="w-6 h-6" />
      </button>

      <!-- Lightbox Main Modal Container -->
      <div class="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/20 my-auto flex flex-col md:flex-row max-h-[90vh]">
        
        <!-- Left / Top: High-Res Before & After Photo View -->
        <div class="md:w-3/5 bg-brand-charcoal flex flex-col justify-center items-center p-4 sm:p-6 relative min-h-[300px]">
          <div class="relative w-full h-full flex items-center justify-center">
            <img 
              :src="currentTransformation.image" 
              :alt="currentTransformation.title"
              class="max-w-full max-h-[70vh] rounded-2xl object-contain shadow-xl"
            />
          </div>

          <!-- Bottom indicators on image -->
          <div class="w-full flex items-center justify-between text-xs text-white/70 mt-3 pt-2 border-t border-white/10">
            <span class="flex items-center gap-1.5 font-medium text-emerald-400">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Verified Clinical Before & After
            </span>
            <span>Case {{ (activeTransformationIndex ?? 0) + 1 }} of {{ siteConfig.transformations.length }}</span>
          </div>
        </div>

        <!-- Right / Bottom: Clinical Case Analysis & Action -->
        <div class="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-white">
          <div>
            <!-- Category and Tag -->
            <div class="flex items-center justify-between gap-2 mb-2">
              <span class="px-2.5 py-1 rounded-md bg-brand-mint text-brand-teal-dark text-xs font-bold">
                {{ currentTransformation.categoryLabel }}
              </span>
              <span class="text-xs text-brand-muted flex items-center gap-1">
                <Clock class="w-3.5 h-3.5" />
                {{ currentTransformation.duration }}
              </span>
            </div>

            <!-- Case Title -->
            <h3 class="text-xl sm:text-2xl font-bold text-brand-charcoal mb-1">
              {{ currentTransformation.title }}
            </h3>
            <p class="text-xs text-brand-teal font-semibold mb-4">
              {{ currentTransformation.subtitle }}
            </p>

            <!-- Case Comparison Details -->
            <div class="space-y-3 mb-5">
              <div class="p-3.5 rounded-xl bg-red-50/70 border border-red-200/60">
                <div class="text-[11px] font-bold text-red-800 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <span>Initial Clinical Concern</span>
                </div>
                <p class="text-xs text-brand-charcoal leading-relaxed">
                  {{ currentTransformation.concern }}
                </p>
              </div>

              <div class="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/60">
                <div class="text-[11px] font-bold text-emerald-800 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <CheckCircle2 class="w-3.5 h-3.5 text-emerald-600" />
                  <span>Clinical Outcome Achieved</span>
                </div>
                <p class="text-xs text-brand-charcoal leading-relaxed">
                  {{ currentTransformation.outcome }}
                </p>
              </div>
            </div>

            <!-- Highlights -->
            <div class="mb-5">
              <span class="text-xs font-bold text-brand-charcoal block mb-2">Treatment Highlights:</span>
              <ul class="space-y-1.5 text-xs text-brand-muted">
                <li v-for="(hl, i) in currentTransformation.highlights" :key="i" class="flex items-center gap-2">
                  <CheckCircle2 class="w-3.5 h-3.5 text-brand-teal shrink-0" />
                  <span>{{ hl }}</span>
                </li>
              </ul>
            </div>

            <div class="text-xs text-brand-muted pt-3 border-t border-brand-border">
              <span class="font-semibold text-brand-charcoal">Treating Specialist:</span> Dr. Achal Agarwal (BDS, MDS Orthodontics & Dentofacial Orthopaedics)
            </div>
          </div>

          <!-- Bottom Action Buttons in Lightbox -->
          <div class="pt-6 mt-4 border-t border-brand-border/60 flex flex-col gap-2">
            <a 
              href="#appointment"
              class="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-teal hover:bg-brand-teal-deep text-white text-xs font-bold transition-all shadow-soft"
              @click="closeModals"
            >
              <span>Book Consultation for this Treatment</span>
              <ArrowRight class="w-3.5 h-3.5" />
            </a>

            <!-- Mobile pagination buttons -->
            <div class="sm:hidden flex items-center justify-between pt-2">
              <button 
                type="button" 
                class="px-3 py-1.5 rounded-lg bg-brand-mint text-brand-teal-dark text-xs font-semibold flex items-center gap-1"
                @click="prevTransformation"
              >
                <ChevronLeft class="w-3.5 h-3.5" /> Previous Case
              </button>
              <button 
                type="button" 
                class="px-3 py-1.5 rounded-lg bg-brand-mint text-brand-teal-dark text-xs font-semibold flex items-center gap-1"
                @click="nextTransformation"
              >
                Next Case <ChevronRight class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>

    <!-- ======================================================== -->
    <!-- MODAL: VIDEO WALKTHROUGH TOUR                            -->
    <!-- ======================================================== -->
    <div 
      v-if="showVideoPlayer"
      class="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Clinic Video Tour Walkthrough"
      @click.self="showVideoPlayer = false"
    >
      <!-- Fixed Close Button -->
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

        <!-- Video Player -->
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
