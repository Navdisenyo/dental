<script setup lang="ts">
import { ref } from 'vue'
import { Calendar, Phone, MessageCircle, MapPin, Clock, ShieldCheck, HeartPulse, Mail } from 'lucide-vue-next'
import { siteConfig } from '../../config/site'
import AppointmentForm from '../booking/AppointmentForm.vue'
</script>

<template>
  <section 
    id="appointment"
    class="py-20 lg:py-28 bg-gradient-to-b from-brand-ivory to-brand-mint-light/50 relative overflow-hidden"
    aria-label="Book an Appointment"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        <!-- Left: Context & Clinic Reassurance (5 cols) -->
        <div class="lg:col-span-5 flex flex-col items-start text-left">
          
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-mint text-brand-teal-dark text-xs font-semibold uppercase tracking-wider mb-4">
            <Calendar class="w-3.5 h-3.5 text-brand-teal" />
            <span>Dedicated Consultation</span>
          </div>

          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-charcoal tracking-tight mb-5">
            Reserve Your <br />
            <span class="font-serif italic font-normal text-brand-teal-dark">Consultation Slot.</span>
          </h2>

          <p class="text-base text-brand-muted leading-relaxed mb-8">
            Experience gentle, personalized care in a tranquil setting in Kothrud, Pune. We examine your teeth, smile, or skin anatomy, address all questions honestly, and design a treatment plan aligned with your lifestyle.
          </p>

          <!-- Clinic Highlights Card -->
          <div class="w-full bg-white rounded-3xl p-6 border border-brand-border/80 shadow-soft space-y-4 mb-8">
            <div class="flex items-start gap-3.5">
              <div class="w-9 h-9 rounded-xl bg-brand-mint text-brand-teal-dark flex items-center justify-center shrink-0 mt-0.5">
                <Clock class="w-4 h-4 text-brand-teal-dark" />
              </div>
              <div>
                <div class="text-xs font-bold text-brand-charcoal">Split Business Hours</div>
                <div class="text-xs text-brand-muted mt-0.5">Mon–Sat: 10:30am–2pm & 4:30pm–8pm • Sun: 11am–2:30pm</div>
              </div>
            </div>

            <div class="flex items-start gap-3.5">
              <div class="w-9 h-9 rounded-xl bg-brand-mint text-brand-teal-dark flex items-center justify-center shrink-0 mt-0.5">
                <MapPin class="w-4 h-4 text-brand-teal-dark" />
              </div>
              <div>
                <div class="text-xs font-bold text-brand-charcoal">Geetai Sankul, Kothrud</div>
                <div class="text-xs text-brand-muted mt-0.5">Shop 204, 2nd Floor, Paud Road, near Ideal Colony</div>
              </div>
            </div>

            <div class="flex items-start gap-3.5">
              <div class="w-9 h-9 rounded-xl bg-brand-mint text-brand-teal-dark flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck class="w-4 h-4 text-brand-teal-dark" />
              </div>
              <div>
                <div class="text-xs font-bold text-brand-charcoal">Zero Obligation Consultation</div>
                <div class="text-xs text-brand-muted mt-0.5">Honest medical assessments with complete price clarity</div>
              </div>
            </div>
          </div>

          <!-- Direct Communication Channels: WhatsApp & Direct Email -->
          <div class="space-y-3 w-full mb-2">
            <!-- Direct WhatsApp Channel -->
            <div class="p-5 rounded-3xl bg-brand-teal-deep text-white w-full shadow-card flex items-center justify-between gap-4">
              <div>
                <div class="text-xs text-brand-teal-light uppercase tracking-wider font-semibold">Prefer WhatsApp?</div>
                <div class="text-sm font-bold mt-0.5">Message our reception directly</div>
              </div>

              <a 
                :href="siteConfig.contact.whatsappLink"
                target="_blank"
                rel="noopener noreferrer"
                class="px-4 py-2.5 rounded-xl bg-brand-teal hover:bg-brand-teal-light hover:text-brand-teal-deep text-white font-semibold text-xs transition-all shrink-0 flex items-center gap-1.5"
              >
                <MessageCircle class="w-4 h-4" />
                <span>WhatsApp Now</span>
              </a>
            </div>

            <!-- Direct Email Channel -->
            <a 
              :href="'mailto:' + siteConfig.contact.email"
              class="p-4 rounded-3xl bg-white border border-brand-border/80 shadow-soft w-full flex items-center justify-between gap-3 group hover:border-brand-teal hover:shadow-card transition-all"
            >
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-2xl bg-brand-mint text-brand-teal-dark flex items-center justify-center shrink-0 group-hover:bg-brand-teal group-hover:text-white transition-colors">
                  <Mail class="w-4 h-4" />
                </div>
                <div class="text-left">
                  <div class="text-[11px] text-brand-muted uppercase tracking-wider font-semibold">Clinic Email Leads</div>
                  <div class="text-xs font-bold text-brand-charcoal group-hover:text-brand-teal-dark transition-colors">
                    {{ siteConfig.contact.email }}
                  </div>
                </div>
              </div>
              <span class="text-xs font-semibold text-brand-teal-dark group-hover:translate-x-1 transition-transform">Email Us →</span>
            </a>
          </div>

        </div>

        <!-- Right: The Booking Form (7 cols) -->
        <div class="lg:col-span-7 w-full">
          <AppointmentForm />
        </div>

      </div>

    </div>
  </section>
</template>
