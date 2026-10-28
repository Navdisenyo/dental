<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { 
  Menu, 
  X, 
  ChevronDown, 
  Calendar, 
  MessageCircle, 
  Sparkles, 
  ShieldCheck, 
  HeartPulse,
  BookOpen
} from 'lucide-vue-next'
import { siteConfig } from '../../config/site'

const route = useRoute()
const isScrolled = ref(false)
const mobileMenuOpen = ref(false)
const treatmentsDropdownOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 30
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const closeMobile = () => {
  mobileMenuOpen.value = false
  treatmentsDropdownOpen.value = false
}

const getSectionHref = (hash: string) => {
  if (route.path === '/') {
    return hash
  }
  return `/${hash}`
}
</script>

<template>
  <header 
    :class="[
      'sticky top-0 z-40 transition-all duration-300 w-full',
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-soft border-b border-brand-border py-3' 
        : 'bg-brand-ivory/80 backdrop-blur-sm py-4 border-b border-brand-border/40'
    ]"
    role="banner"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between gap-4">
        <!-- Brand Logo -->
        <RouterLink 
          to="/" 
          class="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-brand-teal rounded-lg p-1"
          aria-label="OneCare Aesthetix Clinic Home"
        >
          <img 
            src="/assets/logo.png" 
            alt="OneCare Aesthetix Clinic — Dental and Facial Aesthetics" 
            class="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-102"
          />
        </RouterLink>

        <!-- Desktop Navigation -->
        <nav class="hidden lg:flex items-center gap-6 xl:gap-7 text-sm font-medium text-brand-charcoal" aria-label="Main Navigation">
          <RouterLink to="/" class="hover:text-brand-teal transition-colors py-2">Home</RouterLink>
          <a :href="getSectionHref('#about')" class="hover:text-brand-teal transition-colors py-2">About Us</a>

          <!-- Treatments Mega Dropdown -->
          <div 
            class="relative group"
            @mouseenter="treatmentsDropdownOpen = true"
            @mouseleave="treatmentsDropdownOpen = false"
          >
            <button 
              type="button"
              class="flex items-center gap-1.5 hover:text-brand-teal transition-colors py-2 focus:outline-none focus:text-brand-teal"
              :aria-expanded="treatmentsDropdownOpen"
              aria-haspopup="true"
            >
              <span>Treatments</span>
              <ChevronDown class="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180 text-brand-muted" />
            </button>

            <!-- Dropdown Menu -->
            <div 
              v-show="treatmentsDropdownOpen"
              class="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-[460px] bg-white rounded-2xl shadow-card border border-brand-border p-4 grid grid-cols-1 gap-2 transition-all duration-200 z-50 animate-in fade-in slide-in-from-top-2"
            >
              <div class="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-muted">
                Our Clinical Specialties
              </div>
              <div class="grid grid-cols-2 gap-2">
                <a 
                  :href="getSectionHref('#treatments')" 
                  class="flex items-start gap-3 p-2.5 rounded-xl hover:bg-brand-mint/50 transition-colors group/item"
                  @click="treatmentsDropdownOpen = false"
                >
                  <div class="p-2 rounded-lg bg-brand-mint text-brand-teal-dark group-hover/item:bg-brand-teal group-hover/item:text-white transition-colors">
                    <Sparkles class="w-4 h-4" />
                  </div>
                  <div>
                    <div class="font-medium text-brand-charcoal group-hover/item:text-brand-teal-dark text-xs">Smile Design & Whitening</div>
                    <div class="text-[11px] text-brand-muted">Aesthetic teeth enhancement</div>
                  </div>
                </a>

                <a 
                  :href="getSectionHref('#treatments')" 
                  class="flex items-start gap-3 p-2.5 rounded-xl hover:bg-brand-mint/50 transition-colors group/item"
                  @click="treatmentsDropdownOpen = false"
                >
                  <div class="p-2 rounded-lg bg-brand-mint text-brand-teal-dark group-hover/item:bg-brand-teal group-hover/item:text-white transition-colors">
                    <ShieldCheck class="w-4 h-4" />
                  </div>
                  <div>
                    <div class="font-medium text-brand-charcoal group-hover/item:text-brand-teal-dark text-xs">Dental Implants & Crowns</div>
                    <div class="text-[11px] text-brand-muted">Bio-compatible restorations</div>
                  </div>
                </a>

                <a 
                  :href="getSectionHref('#treatments')" 
                  class="flex items-start gap-3 p-2.5 rounded-xl hover:bg-brand-mint/50 transition-colors group/item"
                  @click="treatmentsDropdownOpen = false"
                >
                  <div class="p-2 rounded-lg bg-brand-mint text-brand-teal-dark group-hover/item:bg-brand-teal group-hover/item:text-white transition-colors">
                    <HeartPulse class="w-4 h-4" />
                  </div>
                  <div>
                    <div class="font-medium text-brand-charcoal group-hover/item:text-brand-teal-dark text-xs">Facial Aesthetics & PRP</div>
                    <div class="text-[11px] text-brand-muted">Medical skin rejuvenation</div>
                  </div>
                </a>

                <a 
                  :href="getSectionHref('#treatments')" 
                  class="flex items-start gap-3 p-2.5 rounded-xl hover:bg-brand-mint/50 transition-colors group/item"
                  @click="treatmentsDropdownOpen = false"
                >
                  <div class="p-2 rounded-lg bg-brand-mint text-brand-teal-dark group-hover/item:bg-brand-teal group-hover/item:text-white transition-colors">
                    <Sparkles class="w-4 h-4" />
                  </div>
                  <div>
                    <div class="font-medium text-brand-charcoal group-hover/item:text-brand-teal-dark text-xs">Clear Aligners & Braces</div>
                    <div class="text-[11px] text-brand-muted">Discreet teeth alignment</div>
                  </div>
                </a>
              </div>
              <div class="mt-2 pt-2 border-t border-brand-border/60 text-center">
                <a 
                  :href="getSectionHref('#treatments')" 
                  class="text-xs font-semibold text-brand-teal-dark hover:text-brand-teal hover:underline inline-flex items-center gap-1"
                  @click="treatmentsDropdownOpen = false"
                >
                  View all 9+ personalized treatments →
                </a>
              </div>
            </div>
          </div>

          <a :href="getSectionHref('#clinic')" class="hover:text-brand-teal transition-colors py-2">Patient Results</a>
          <a :href="getSectionHref('#reviews')" class="hover:text-brand-teal transition-colors py-2">Reviews</a>
          
          <!-- Blog Navigation Link -->
          <RouterLink 
            to="/blog" 
            class="inline-flex items-center gap-1 hover:text-brand-teal transition-colors py-2 font-semibold"
            :class="{ 'text-brand-teal': route.path.startsWith('/blog') }"
          >
            <span>Blog</span>
            <span class="w-1.5 h-1.5 rounded-full bg-brand-teal"></span>
          </RouterLink>

          <a :href="getSectionHref('#contact')" class="hover:text-brand-teal transition-colors py-2">Contact</a>
        </nav>

        <!-- Right Action Buttons -->
        <div class="hidden sm:flex items-center gap-3">
          <!-- WhatsApp Action -->
          <a 
            :href="siteConfig.contact.whatsappLink"
            target="_blank"
            rel="noopener noreferrer"
            class="hidden md:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-brand-teal-dark bg-brand-mint hover:bg-brand-teal/20 transition-all border border-brand-teal/30 focus:outline-none focus:ring-2 focus:ring-brand-teal whitespace-nowrap"
            title="Chat with clinic on WhatsApp"
          >
            <MessageCircle class="w-4 h-4 text-brand-teal shrink-0" />
            <span>WhatsApp Us</span>
          </a>

          <!-- Book Appointment Button -->
          <a 
            :href="getSectionHref('#appointment')"
            class="inline-flex items-center gap-2 px-5 sm:px-5.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-brand-teal-dark hover:bg-brand-teal shadow-soft hover:shadow-card hover:-translate-y-0.5 active:translate-y-0 transition-all focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2 whitespace-nowrap"
          >
            <Calendar class="w-4 h-4 text-brand-mint shrink-0" />
            <span>Book Appointment</span>
          </a>
        </div>

        <!-- Mobile Menu Trigger -->
        <div class="flex items-center gap-2 lg:hidden">
          <a 
            :href="getSectionHref('#appointment')"
            class="sm:hidden inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-brand-teal-dark"
          >
            Book
          </a>
          <button 
            type="button"
            class="p-2 rounded-xl text-brand-charcoal hover:bg-brand-mint/60 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-teal"
            :aria-expanded="mobileMenuOpen"
            aria-label="Toggle navigation menu"
            @click="mobileMenuOpen = !mobileMenuOpen"
          >
            <Menu v-if="!mobileMenuOpen" class="w-6 h-6" />
            <X v-else class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Drawer Overlay -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 translate-y-[-10px]"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-[-10px]"
    >
      <div 
        v-if="mobileMenuOpen"
        class="lg:hidden absolute top-full left-0 w-full bg-white border-b border-brand-border shadow-card px-5 py-6 flex flex-col gap-4 max-h-[85vh] overflow-y-auto"
      >
        <nav class="flex flex-col gap-3 text-base font-medium text-brand-charcoal">
          <RouterLink to="/" class="py-2 border-b border-brand-border/40 hover:text-brand-teal" @click="closeMobile">Home</RouterLink>
          <a :href="getSectionHref('#about')" class="py-2 border-b border-brand-border/40 hover:text-brand-teal" @click="closeMobile">About Us</a>
          <a :href="getSectionHref('#treatments')" class="py-2 border-b border-brand-border/40 hover:text-brand-teal flex justify-between items-center" @click="closeMobile">
            <span>Treatments & Services</span>
            <span class="text-xs text-brand-teal font-normal bg-brand-mint px-2 py-0.5 rounded-full">Explore</span>
          </a>
          <a :href="getSectionHref('#clinic')" class="py-2 border-b border-brand-border/40 hover:text-brand-teal" @click="closeMobile">Patient Results (Before & After)</a>
          <a :href="getSectionHref('#doctor')" class="py-2 border-b border-brand-border/40 hover:text-brand-teal" @click="closeMobile">Meet The Doctor</a>
          
          <!-- Blog Link in Mobile Menu -->
          <RouterLink to="/blog" class="py-2 border-b border-brand-border/40 hover:text-brand-teal flex justify-between items-center" @click="closeMobile">
            <span class="font-bold text-brand-teal-dark flex items-center gap-2">
              <BookOpen class="w-4 h-4 text-brand-teal" />
              <span>Dental Blog & Guides</span>
            </span>
            <span class="text-xs text-white bg-brand-teal px-2 py-0.5 rounded-full">New</span>
          </RouterLink>

          <!-- Admin Link in Mobile Menu -->
          <RouterLink to="/admin" class="py-2 border-b border-brand-border/40 hover:text-brand-teal text-xs text-brand-muted" @click="closeMobile">
            Doctor / Staff Admin Portal
          </RouterLink>

          <a :href="getSectionHref('#reviews')" class="py-2 border-b border-brand-border/40 hover:text-brand-teal flex justify-between items-center" @click="closeMobile">
            <span>Patient Reviews</span>
            <span class="text-xs text-brand-teal font-normal bg-brand-mint px-2 py-0.5 rounded-full">4.9 ★ Google</span>
          </a>
          <a :href="getSectionHref('#faq')" class="py-2 border-b border-brand-border/40 hover:text-brand-teal" @click="closeMobile">FAQs</a>
          <a :href="getSectionHref('#contact')" class="py-2 hover:text-brand-teal" @click="closeMobile">Location & Contact</a>
        </nav>

        <div class="pt-3 flex flex-col gap-2.5">
          <a 
            :href="getSectionHref('#appointment')"
            class="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-teal-dark text-white font-medium shadow-soft text-sm"
            @click="closeMobile"
          >
            <Calendar class="w-4 h-4 text-brand-mint" />
            <span>Book Appointment</span>
          </a>
          <a 
            :href="siteConfig.contact.whatsappLink"
            target="_blank"
            rel="noopener noreferrer"
            class="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-mint text-brand-teal-dark font-medium border border-brand-teal/40 text-sm"
            @click="closeMobile"
          >
            <MessageCircle class="w-4 h-4 text-brand-teal" />
            <span>Chat on WhatsApp (+91 98348 91463)</span>
          </a>
        </div>
      </div>
    </transition>
  </header>
</template>
