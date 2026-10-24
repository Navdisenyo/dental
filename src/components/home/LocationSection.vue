<script setup lang="ts">
import { MapPin, Phone, MessageCircle, Navigation, Clock, Calendar, CheckCircle } from 'lucide-vue-next'
import { siteConfig } from '../../config/site'
</script>

<template>
  <section 
    id="contact"
    class="py-20 lg:py-28 bg-white relative"
    aria-label="Location and Contact Details"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header -->
      <div class="max-w-3xl mb-12">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-mint text-brand-teal-dark text-xs font-semibold uppercase tracking-wider mb-4">
          <MapPin class="w-3.5 h-3.5 text-brand-teal" />
          <span>Find Our Clinic</span>
        </div>

        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-charcoal tracking-tight mb-4">
          Conveniently Located in <br />
          <span class="font-serif italic font-normal text-brand-teal-dark">The Heart of Kothrud, Pune.</span>
        </h2>

        <p class="text-base text-brand-muted leading-relaxed">
          Situated on Paud Road in Geetai Sankul near Ideal Colony. Easily accessible by private vehicle, bus, and metro with convenient parking available.
        </p>
      </div>

      <!-- Main Layout: Contact Card & Map -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        <!-- Left Column: Verified Business Information (5 cols) -->
        <div class="lg:col-span-5 bg-brand-ivory rounded-3xl p-8 border border-brand-border/80 shadow-soft flex flex-col justify-between">
          <div>
            <!-- Clinic Identity -->
            <div class="flex items-center gap-3 mb-6">
              <img src="/assets/logo.png" alt="OneCare Aesthetix" class="h-10 w-auto" />
            </div>

            <!-- Address Block -->
            <div class="space-y-6">
              <div class="flex items-start gap-3.5">
                <div class="w-10 h-10 rounded-xl bg-brand-mint text-brand-teal-dark flex items-center justify-center shrink-0">
                  <MapPin class="w-5 h-5 text-brand-teal-dark" />
                </div>
                <div>
                  <h3 class="text-xs font-bold uppercase tracking-wider text-brand-muted mb-1">Clinic Address</h3>
                  <p class="text-sm font-semibold text-brand-charcoal leading-snug">
                    {{ siteConfig.contact.address.suite }}
                  </p>
                  <p class="text-xs text-brand-muted mt-0.5">
                    {{ siteConfig.contact.address.street }}, {{ siteConfig.contact.address.locality }}, {{ siteConfig.contact.address.city }} — {{ siteConfig.contact.address.pincode }}
                  </p>
                  <p class="text-[11px] text-brand-teal-dark font-medium mt-1">Landmark: Near Ideal Colony Metro / Paud Road</p>
                </div>
              </div>

              <!-- Phone & WhatsApp -->
              <div class="flex items-start gap-3.5">
                <div class="w-10 h-10 rounded-xl bg-brand-mint text-brand-teal-dark flex items-center justify-center shrink-0">
                  <Phone class="w-5 h-5 text-brand-teal-dark" />
                </div>
                <div>
                  <h3 class="text-xs font-bold uppercase tracking-wider text-brand-muted mb-1">Direct Phone & WhatsApp</h3>
                  <a 
                    :href="'tel:' + siteConfig.contact.phoneClean"
                    class="text-base font-bold text-brand-teal-dark hover:underline block"
                  >
                    {{ siteConfig.contact.phoneDisplay }}
                  </a>
                  <p class="text-[11px] text-brand-muted">Call during reception hours for immediate queries</p>
                </div>
              </div>

              <!-- Working Hours -->
              <div class="flex items-start gap-3.5">
                <div class="w-10 h-10 rounded-xl bg-brand-mint text-brand-teal-dark flex items-center justify-center shrink-0">
                  <Clock class="w-5 h-5 text-brand-teal-dark" />
                </div>
                <div>
                  <h3 class="text-xs font-bold uppercase tracking-wider text-brand-muted mb-1">Consultation Hours</h3>
                  <div class="space-y-1 text-xs text-brand-charcoal">
                    <div><strong>Monday – Saturday:</strong> 10:30 AM – 2:00 PM</div>
                    <div><strong>Evening Hours:</strong> 4:30 PM – 8:00 PM</div>
                    <div><strong>Sunday:</strong> 11:00 AM – 2:30 PM (By Appointment)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Direct Action Buttons -->
          <div class="mt-8 pt-6 border-t border-brand-border grid grid-cols-2 gap-3">
            <a 
              :href="'tel:' + siteConfig.contact.phoneClean"
              class="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-brand-teal-dark hover:bg-brand-teal text-white text-xs font-semibold shadow-soft transition-all"
            >
              <Phone class="w-3.5 h-3.5" />
              <span>Call Now</span>
            </a>

            <a 
              :href="siteConfig.contact.whatsappLink"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-soft transition-all"
            >
              <MessageCircle class="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            <a 
              :href="siteConfig.contact.mapsUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="col-span-2 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white hover:bg-brand-mint text-brand-teal-dark border border-brand-teal/30 text-xs font-semibold transition-all"
            >
              <Navigation class="w-3.5 h-3.5 text-brand-teal" />
              <span>Get Directions on Google Maps</span>
            </a>
          </div>
        </div>

        <!-- Right Column: Interactive Map & Landmark Guide (7 cols) -->
        <div class="lg:col-span-7 bg-brand-mint/30 rounded-3xl overflow-hidden border border-brand-border/80 shadow-soft flex flex-col justify-between min-h-[420px]">
          
          <!-- Google Map Embed -->
          <div class="relative w-full h-80 sm:h-96 bg-brand-border/40 overflow-hidden">
            <iframe 
              title="OneCare Aesthetix Clinic Location Map"
              class="w-full h-full border-0"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.568472895697!2d73.8055112!3d18.5074127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf308401610f%3A0x50c19bf8637527f7!2sOneCare%20Aesthetix%20Clinic!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              allowfullscreen
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <!-- Bottom Location Highlights -->
          <div class="p-6 bg-white border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-brand-mint text-brand-teal-dark flex items-center justify-center shrink-0">
                <CheckCircle class="w-4 h-4 text-brand-teal" />
              </div>
              <div class="text-xs text-brand-charcoal font-medium">
                Elevator access available to 2nd Floor, Geetai Sankul.
              </div>
            </div>

            <a 
              :href="siteConfig.contact.mapsUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="text-xs font-bold text-brand-teal-dark hover:underline flex items-center gap-1 shrink-0"
            >
              <span>Open in Google Maps App</span>
              <span>↗</span>
            </a>
          </div>

        </div>

      </div>

    </div>
  </section>
</template>
