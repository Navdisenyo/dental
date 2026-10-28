<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { MapPin, Phone, MessageCircle, Clock, Star, ArrowUp, Mail, BookOpen, Settings } from 'lucide-vue-next'
import { siteConfig } from '../../config/site'
import LegalModal from '../ui/LegalModal.vue'

const route = useRoute()
const currentYear = new Date().getFullYear()

const isLegalModalOpen = ref(false)
const legalModalTab = ref<'terms' | 'privacy'>('terms')

const openLegalModal = (tab: 'terms' | 'privacy') => {
  legalModalTab.value = tab
  isLegalModalOpen.value = true
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const getSectionHref = (hash: string) => {
  if (route.path === '/') {
    return hash
  }
  return `/${hash}`
}
</script>

<template>
  <footer class="bg-brand-teal-deep text-brand-mint/90 pt-16 pb-12 border-t border-brand-teal/20 relative" role="contentinfo">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Top Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-brand-teal/20">
        
        <!-- Col 1: Brand & Intro (4 cols) -->
        <div class="lg:col-span-4 flex flex-col items-start">
          <div class="bg-white p-2.5 rounded-2xl mb-5 shadow-soft">
            <img 
              src="/assets/logo.png" 
              alt="OneCare Aesthetix Clinic" 
              class="h-10 w-auto object-contain"
            />
          </div>

          <p class="text-xs sm:text-sm text-brand-mint/80 leading-relaxed mb-6 max-w-sm">
            Personalized dental care and facial aesthetics in Kothrud, Pune. Modern clinical expertise with unhurried consultations, natural smile transformations, and gentle patient comfort.
          </p>

          <!-- Verified Google Review Rating Pill -->
          <a 
            :href="siteConfig.trust.googleSearchReviewUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2.5 p-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-brand-teal/30 transition-all text-xs text-white"
          >
            <div class="flex text-amber-300">
              <Star v-for="i in 5" :key="i" class="w-3.5 h-3.5 fill-current" />
            </div>
            <span><strong>4.9 / 5.0</strong> on Google (75+ Reviews)</span>
          </a>
        </div>

        <!-- Col 2: Quick Links (2 cols) -->
        <div class="lg:col-span-2">
          <h4 class="text-xs font-bold uppercase tracking-wider text-white mb-4">
            Navigation
          </h4>
          <ul class="space-y-2.5 text-xs text-brand-mint/80">
            <li><RouterLink to="/" class="hover:text-white transition-colors">Home</RouterLink></li>
            <li><a :href="getSectionHref('#about')" class="hover:text-white transition-colors">About Us</a></li>
            <li><a :href="getSectionHref('#treatments')" class="hover:text-white transition-colors">Treatments</a></li>
            <li>
              <RouterLink to="/blog" class="text-emerald-300 hover:text-white transition-colors font-semibold flex items-center gap-1.5">
                <span>Dental Blog</span>
                <span class="text-[9px] bg-brand-teal/40 text-white px-1.5 py-0.2 rounded">Guides</span>
              </RouterLink>
            </li>
            <li><a :href="getSectionHref('#clinic')" class="hover:text-white transition-colors">Before & After</a></li>
            <li><a :href="getSectionHref('#doctor')" class="hover:text-white transition-colors">Meet Dr. Achal</a></li>
            <li><a :href="getSectionHref('#appointment')" class="hover:text-white transition-colors">Book Appointment</a></li>
            <li><a :href="getSectionHref('#contact')" class="hover:text-white transition-colors">Location & Contact</a></li>
            <li>
              <RouterLink to="/admin" class="hover:text-white text-brand-mint/50 transition-colors flex items-center gap-1 text-[11px] pt-1 border-t border-white/10">
                <Settings class="w-3 h-3 text-brand-teal" />
                <span>Doctor Admin Portal</span>
              </RouterLink>
            </li>
            <li>
              <button 
                type="button" 
                class="hover:text-white transition-colors text-left flex items-center gap-1 cursor-pointer"
                @click="openLegalModal('terms')"
              >
                Terms & Conditions
              </button>
            </li>
            <li>
              <button 
                type="button" 
                class="hover:text-white transition-colors text-left flex items-center gap-1 cursor-pointer"
                @click="openLegalModal('privacy')"
              >
                Privacy Policy
              </button>
            </li>
          </ul>
        </div>

        <!-- Col 3: Treatments (3 cols) -->
        <div class="lg:col-span-3">
          <h4 class="text-xs font-bold uppercase tracking-wider text-white mb-4">
            Treatments & Services
          </h4>
          <ul class="space-y-2.5 text-xs text-brand-mint/80">
            <li><a href="#treatments" class="hover:text-white transition-colors">Digital Smile Design</a></li>
            <li><a href="#treatments" class="hover:text-white transition-colors">Laser Teeth Whitening</a></li>
            <li><a href="#treatments" class="hover:text-white transition-colors">Dental Implants</a></li>
            <li><a href="#treatments" class="hover:text-white transition-colors">Ceramic Crowns & Veneers</a></li>
            <li><a href="#treatments" class="hover:text-white transition-colors">Clear Aligners & Braces</a></li>
            <li><a href="#treatments" class="hover:text-white transition-colors">Gentle Root Canal Therapy</a></li>
            <li><a href="#treatments" class="hover:text-white transition-colors">Facial Aesthetics & PRP</a></li>
            <li><a href="#treatments" class="hover:text-white transition-colors">Pediatric Dental Care</a></li>
            <li><a href="#treatments" class="hover:text-white transition-colors">Ultrasonic Teeth Cleaning</a></li>
          </ul>
        </div>

        <!-- Col 4: Contact & Hours (3 cols) -->
        <div class="lg:col-span-3">
          <h4 class="text-xs font-bold uppercase tracking-wider text-white mb-4">
            Clinic Details
          </h4>
          
          <div class="space-y-3.5 text-xs text-brand-mint/80">
            <div class="flex items-start gap-2.5">
              <MapPin class="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
              <span>Shop 204, Geetai Sankul, Paud Road, near Ideal Colony, Kothrud, Pune, 411038</span>
            </div>

            <div class="flex items-center gap-2.5">
              <Phone class="w-4 h-4 text-brand-teal shrink-0" />
              <a :href="'tel:' + siteConfig.contact.phoneClean" class="hover:text-white font-medium">
                {{ siteConfig.contact.phoneDisplay }}
              </a>
            </div>

            <div class="flex items-center gap-2.5">
              <MessageCircle class="w-4 h-4 text-brand-teal shrink-0" />
              <a :href="siteConfig.contact.whatsappLink" target="_blank" rel="noopener noreferrer" class="hover:text-white font-medium">
                WhatsApp: +91 98348 91463
              </a>
            </div>

            <div class="flex items-center gap-2.5">
              <Mail class="w-4 h-4 text-brand-teal shrink-0" />
              <a :href="'mailto:' + siteConfig.contact.email" class="hover:text-white font-medium">
                {{ siteConfig.contact.email }}
              </a>
            </div>

            <div class="flex items-start gap-2.5 pt-2 border-t border-brand-teal/20">
              <Clock class="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
              <div>
                <div class="text-white font-medium">Mon–Sat Hours:</div>
                <div>10:30am–2:00pm & 4:30pm–8:00pm</div>
                <div class="text-white font-medium mt-1">Sunday:</div>
                <div>11:00am–2:30pm (By Appointment)</div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Bottom Bar: Medical Disclaimer, Privacy & Copyright -->
      <div class="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-brand-mint/60">
        <div>
          © {{ currentYear }} OneCare Aesthetix Clinic. All rights reserved. | Develop by 
          <a 
            href="https://navdisenyo.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="hover:text-white underline underline-offset-2 transition-colors"
          >Navdisenyo</a>
        </div>

        <div class="flex flex-wrap items-center gap-4 sm:gap-6">
          <button 
            type="button" 
            class="hover:text-brand-mint transition-colors cursor-pointer"
            @click="openLegalModal('terms')"
          >
            Terms & Conditions
          </button>
          <button 
            type="button" 
            class="hover:text-brand-mint transition-colors cursor-pointer"
            @click="openLegalModal('privacy')"
          >
            Privacy Policy
          </button>
          <a :href="siteConfig.trust.googleSearchReviewUrl" target="_blank" rel="noopener noreferrer" class="hover:text-brand-mint transition-colors">
            Google Business Listing
          </a>
          <a :href="siteConfig.contact.mapsUrl" target="_blank" rel="noopener noreferrer" class="hover:text-brand-mint transition-colors">
            Google Maps
          </a>
          <button 
            type="button"
            class="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
            @click="scrollToTop"
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <ArrowUp class="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <!-- Medical Disclaimer Note -->
      <div class="mt-6 pt-4 border-t border-brand-teal/10 text-[11px] text-brand-mint/50 text-center leading-relaxed max-w-4xl mx-auto">
        Medical Disclaimer: Information on this website is intended for general educational purposes and does not constitute formal medical diagnosis or treatment plans. Treatment outcomes vary individually based on clinical evaluation and patient oral anatomy. Consult Dr. Achal Agarwal at OneCare Aesthetix Clinic for a personalized clinical examination.
      </div>

    </div>

    <!-- Legal Modal for Terms & Conditions and Privacy Policy -->
    <LegalModal 
      :is-open="isLegalModalOpen" 
      :initial-tab="legalModalTab" 
      @close="isLegalModalOpen = false" 
    />
  </footer>
</template>
