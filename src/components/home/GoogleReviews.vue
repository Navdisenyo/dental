<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Star, ChevronLeft, ChevronRight, MessageSquare, ExternalLink, PenLine, ShieldCheck } from 'lucide-vue-next'
import { siteConfig } from '../../config/site'

gsap.registerPlugin(ScrollTrigger)
const reviewsRoot = ref<HTMLElement | null>(null)
const currentIndex = ref(0)

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % siteConfig.reviews.length
}

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + siteConfig.reviews.length) % siteConfig.reviews.length
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !reviewsRoot.value) return

  const ctx = gsap.context(() => {
    gsap.fromTo('.reviews-header',
      { y: 25, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power3.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: reviewsRoot.value,
          start: 'top 92%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    )
  }, reviewsRoot.value)

  return () => ctx.revert()
})
</script>

<template>
  <section 
    id="reviews"
    ref="reviewsRoot"
    class="py-20 lg:py-28 bg-brand-mint-light/40 relative overflow-hidden"
    aria-label="Verified Patient Reviews and Google Testimonials"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header with Official Google Badge -->
      <div class="reviews-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div class="max-w-2xl">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-mint text-brand-teal-dark text-xs font-semibold uppercase tracking-wider mb-4">
            <Star class="w-3.5 h-3.5 text-amber-400 fill-current" />
            <span>Verified Patient Feedback</span>
          </div>

          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-charcoal tracking-tight">
            Kind Words From <br />
            <span class="font-serif italic font-normal text-brand-teal-dark">Our Valued Patients.</span>
          </h2>

          <p class="mt-4 text-base text-brand-muted leading-relaxed">
            Real experiences from individuals who trusted OneCare Aesthetix Clinic with their smile transformations and routine family dental care in Kothrud, Pune.
          </p>
        </div>

        <!-- Google Official Summary Card -->
        <div class="shrink-0 bg-white p-5 rounded-3xl border border-brand-border shadow-soft flex items-center gap-5">
          <div class="w-12 h-12 rounded-2xl bg-brand-mint/60 flex items-center justify-center p-2.5">
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" class="w-full h-auto" />
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="text-2xl font-black text-brand-charcoal">4.9</span>
              <div class="flex text-amber-400">
                <Star v-for="i in 5" :key="i" class="w-4 h-4 fill-current" />
              </div>
            </div>
            <div class="text-xs text-brand-muted mt-0.5">Based on 75+ Google Reviews</div>
          </div>
        </div>
      </div>

      <!-- Carousel Container -->
      <div class="relative">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <article 
            v-for="(review, index) in siteConfig.reviews" 
            :key="review.id"
            class="bg-white rounded-3xl p-7 border border-brand-border/80 shadow-soft hover:shadow-card transition-all flex flex-col justify-between"
          >
            <div>
              <!-- Header with Stars & Verified Icon -->
              <div class="flex items-center justify-between mb-4">
                <div class="flex text-amber-400">
                  <Star v-for="i in review.rating" :key="i" class="w-4 h-4 fill-current" />
                </div>
                <span class="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  <ShieldCheck class="w-3 h-3 text-emerald-600" />
                  <span>Google Verified</span>
                </span>
              </div>

              <!-- Treatment Tag -->
              <div class="text-xs font-semibold text-brand-teal-dark mb-3">
                {{ review.treatment }}
              </div>

              <!-- Review Text -->
              <p class="text-xs sm:text-sm text-brand-charcoal leading-relaxed italic mb-6">
                “{{ review.text }}”
              </p>
            </div>

            <!-- Author & Attribution -->
            <div class="pt-4 border-t border-brand-border/60 flex items-center justify-between">
              <div>
                <div class="text-xs font-bold text-brand-charcoal">{{ review.author }}</div>
                <div class="text-[11px] text-brand-muted">{{ review.source }}</div>
              </div>
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" class="h-3.5 w-auto opacity-70" />
            </div>
          </article>
        </div>
      </div>

      <!-- Action Footer: Read & Write Google Reviews -->
      <div class="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
        <a 
          :href="siteConfig.trust.googleSearchReviewUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-brand-teal-dark hover:bg-brand-teal text-white text-xs font-semibold transition-all shadow-soft"
        >
          <span>Read All 75+ Google Reviews</span>
          <ExternalLink class="w-3.5 h-3.5" />
        </a>

        <a 
          :href="siteConfig.trust.googleSearchReviewUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white hover:bg-brand-mint text-brand-teal-dark border border-brand-teal/30 text-xs font-semibold transition-all"
        >
          <PenLine class="w-3.5 h-3.5 text-brand-teal" />
          <span>Write a Google Review</span>
        </a>
      </div>

    </div>
  </section>
</template>
