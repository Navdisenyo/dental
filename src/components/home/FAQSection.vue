<script setup lang="ts">
import { ref } from 'vue'
import { HelpCircle, ChevronDown, MessageCircle } from 'lucide-vue-next'
import { siteConfig } from '../../config/site'

const openIndex = ref<number | null>(0)

const toggleFaq = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<template>
  <section 
    id="faq"
    class="py-20 lg:py-28 bg-white relative"
    aria-label="Frequently Asked Questions"
  >
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header -->
      <div class="text-center mb-16">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-mint text-brand-teal-dark text-xs font-semibold uppercase tracking-wider mb-4">
          <HelpCircle class="w-3.5 h-3.5 text-brand-teal" />
          <span>Helpful Answers</span>
        </div>

        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-charcoal tracking-tight mb-4">
          Frequently Asked <br />
          <span class="font-serif italic font-normal text-brand-teal-dark">Questions.</span>
        </h2>

        <p class="text-base text-brand-muted max-w-lg mx-auto">
          Common queries regarding appointment scheduling, treatment safety, location, and clinic policies.
        </p>
      </div>

      <!-- Accordion List -->
      <div class="space-y-4" role="region" aria-label="FAQ Accordion">
        <div 
          v-for="(item, idx) in siteConfig.faqs" 
          :key="idx"
          class="border border-brand-border rounded-2xl overflow-hidden bg-brand-ivory transition-all"
        >
          <button 
            type="button"
            class="w-full px-6 py-5 flex items-center justify-between text-left font-semibold text-brand-charcoal text-sm sm:text-base hover:text-brand-teal transition-colors focus:outline-none focus:ring-2 focus:ring-brand-teal"
            :aria-expanded="openIndex === idx"
            :aria-controls="'faq-answer-' + idx"
            @click="toggleFaq(idx)"
          >
            <span>{{ item.question }}</span>
            <ChevronDown 
              :class="[
                'w-5 h-5 text-brand-teal shrink-0 transition-transform duration-300 ml-4',
                openIndex === idx ? 'rotate-180' : ''
              ]"
            />
          </button>

          <transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0 max-h-0"
            enter-to-class="opacity-100 max-h-96"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100 max-h-96"
            leave-to-class="opacity-0 max-h-0"
          >
            <div 
              v-show="openIndex === idx"
              :id="'faq-answer-' + idx"
              class="px-6 pb-6 pt-1 text-xs sm:text-sm text-brand-muted leading-relaxed border-t border-brand-border/40"
            >
              {{ item.answer }}
            </div>
          </transition>
        </div>
      </div>

      <!-- FAQ CTA -->
      <div class="mt-12 text-center p-6 rounded-3xl bg-brand-mint/50 border border-brand-teal/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="text-left">
          <div class="text-sm font-bold text-brand-charcoal">Have a question not listed here?</div>
          <div class="text-xs text-brand-muted">Our reception desk is happy to help you with pricing, slots, or procedure advice.</div>
        </div>

        <a 
          :href="siteConfig.contact.whatsappLink"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-teal-dark hover:bg-brand-teal text-white text-xs font-semibold shrink-0 transition-all shadow-soft"
        >
          <MessageCircle class="w-4 h-4" />
          <span>Ask on WhatsApp</span>
        </a>
      </div>

    </div>
  </section>
</template>
