<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { X, ShieldCheck, FileText, CheckCircle2, AlertCircle, Lock, ExternalLink } from 'lucide-vue-next'
import { siteConfig } from '../../config/site'

const props = withDefaults(
  defineProps<{
    isOpen: boolean
    initialTab?: 'terms' | 'privacy'
  }>(),
  {
    isOpen: false,
    initialTab: 'terms'
  }
)

const emit = defineEmits<{
  (e: 'close'): void
}>()

const activeTab = ref<'terms' | 'privacy'>(props.initialTab)

watch(
  () => props.initialTab,
  (newTab) => {
    if (newTab) activeTab.value = newTab
  }
)

watch(
  () => props.isOpen,
  (open) => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
)

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.isOpen) {
    emit('close')
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      :aria-label="activeTab === 'terms' ? 'Terms and Conditions' : 'Privacy Policy'"
    >
      <!-- Backdrop -->
      <div 
        class="fixed inset-0 bg-brand-charcoal/70 backdrop-blur-sm transition-opacity"
        @click="emit('close')"
      ></div>

      <!-- Modal Card -->
      <div 
        class="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-brand-border overflow-hidden z-10 flex flex-col max-h-[90vh] my-auto animate-in fade-in zoom-in-95 duration-200"
      >
        <!-- Modal Header -->
        <div class="px-6 py-5 bg-brand-ivory border-b border-brand-border flex items-center justify-between gap-4 shrink-0">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-brand-mint text-brand-teal-dark flex items-center justify-center shrink-0">
              <ShieldCheck v-if="activeTab === 'privacy'" class="w-5 h-5 text-brand-teal-dark" />
              <FileText v-else class="w-5 h-5 text-brand-teal-dark" />
            </div>
            <div>
              <h2 class="text-lg sm:text-xl font-bold text-brand-charcoal leading-tight">
                {{ activeTab === 'terms' ? 'Terms & Conditions' : 'Privacy Policy' }}
              </h2>
              <p class="text-[11px] text-brand-muted">
                OneCare Aesthetix Clinic • Updated October 2026
              </p>
            </div>
          </div>

          <!-- Close Button -->
          <button
            type="button"
            class="w-9 h-9 rounded-full bg-white hover:bg-brand-mint/80 border border-brand-border text-brand-charcoal hover:text-brand-teal-dark flex items-center justify-center transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-teal"
            aria-label="Close modal"
            @click="emit('close')"
          >
            <X class="w-4 h-4" />
          </button>
        </div>

        <!-- Tab Switcher -->
        <div class="px-6 py-3 bg-white border-b border-brand-border/70 flex items-center gap-2 shrink-0">
          <button
            type="button"
            class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2"
            :class="activeTab === 'terms' 
              ? 'bg-brand-teal-dark text-white shadow-soft' 
              : 'bg-brand-mint/40 text-brand-charcoal hover:bg-brand-mint'"
            @click="activeTab = 'terms'"
          >
            <FileText class="w-3.5 h-3.5" />
            <span>Terms & Conditions</span>
          </button>

          <button
            type="button"
            class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2"
            :class="activeTab === 'privacy' 
              ? 'bg-brand-teal-dark text-white shadow-soft' 
              : 'bg-brand-mint/40 text-brand-charcoal hover:bg-brand-mint'"
            @click="activeTab = 'privacy'"
          >
            <ShieldCheck class="w-3.5 h-3.5" />
            <span>Privacy Policy (Google Ads Compliant)</span>
          </button>
        </div>

        <!-- Scrollable Content Body -->
        <div class="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs sm:text-sm text-brand-charcoal leading-relaxed">
          
          <!-- ================= TERMS & CONDITIONS ================= -->
          <div v-if="activeTab === 'terms'" class="space-y-6">
            <div class="p-4 rounded-2xl bg-brand-mint/30 border border-brand-teal/20 text-xs text-brand-teal-dark">
              <strong>Agreement Overview:</strong> By accessing this website or scheduling an appointment with OneCare Aesthetix Clinic, you agree to comply with the following clinical terms, website policies, and medical guidelines.
            </div>

            <section class="space-y-2">
              <h3 class="text-sm sm:text-base font-bold text-brand-teal-dark">1. Nature of Clinical Services</h3>
              <p class="text-brand-muted">
                OneCare Aesthetix Clinic is a licensed dental and facial aesthetic practice located in Kothrud, Pune, headed by <strong>Dr. Achal Agarwal (BDS, MDS)</strong>. Our clinical offerings include Digital Smile Design, Orthodontics, Clear Aligners, Laser Teeth Whitening, Dental Implants, Restorative Dentistry, and Facial Aesthetic treatments.
              </p>
            </section>

            <section class="space-y-2">
              <h3 class="text-sm sm:text-base font-bold text-brand-teal-dark">2. Medical & Educational Disclaimer</h3>
              <p class="text-brand-muted">
                Information provided on this website, including treatment guides, procedures, durations, and FAQs, is for general educational and informational purposes only. It does not establish a formal doctor-patient relationship, nor does it replace professional clinical diagnostics, dental X-rays, or in-person examinations.
              </p>
              <div class="flex items-start gap-2 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
                <AlertCircle class="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Individual Results Vary:</strong> Clinical outcomes, treatment timelines, and aesthetic responses depend entirely upon the patient's individual dental health, bone density, gum condition, and compliance with clinical advice.
                </span>
              </div>
            </section>

            <section class="space-y-2">
              <h3 class="text-sm sm:text-base font-bold text-brand-teal-dark">3. Appointment Bookings & Consultations</h3>
              <p class="text-brand-muted">
                Online booking requests made through this website or WhatsApp are provisional until verified and confirmed by our clinic reception team based on doctor chair availability. We request patients to arrive 10 minutes prior to their scheduled slot. If you need to reschedule or cancel, please provide at least 24 hours prior notice as a courtesy to waiting patients.
              </p>
            </section>

            <section class="space-y-2">
              <h3 class="text-sm sm:text-base font-bold text-brand-teal-dark">4. Google Ads & Fair Representation Policy</h3>
              <p class="text-brand-muted">
                In full alignment with Google Advertising Policies and truth-in-advertising guidelines, all representations on this website, digital advertisements, and promotional campaigns are genuine, transparent, and verified.
              </p>
              <ul class="list-disc list-inside space-y-1 text-brand-muted pl-2">
                <li>We do not make misleading, deceptive, or guaranteed medical claims.</li>
                <li>Doctor degrees, certifications, and clinical experience are accurately stated.</li>
                <li>Treatment fees and planned procedures are discussed transparently with written estimates provided prior to initiating treatment.</li>
              </ul>
            </section>

            <section class="space-y-2">
              <h3 class="text-sm sm:text-base font-bold text-brand-teal-dark">5. Intellectual Property</h3>
              <p class="text-brand-muted">
                All website text, logos, custom clinical imagery, graphics, and interface code are proprietary to OneCare Aesthetix Clinic. Unauthorized reproduction, modification, or commercial exploitation is strictly prohibited without written consent.
              </p>
            </section>

            <section class="space-y-2">
              <h3 class="text-sm sm:text-base font-bold text-brand-teal-dark">6. Governing Law & Jurisdiction</h3>
              <p class="text-brand-muted">
                These terms are governed by the laws of the Republic of India. Any legal disputes or claims arising out of website usage or clinical services are subject to the exclusive jurisdiction of the competent courts in <strong>Pune, Maharashtra</strong>.
              </p>
            </section>
          </div>

          <!-- ================= PRIVACY POLICY ================= -->
          <div v-else class="space-y-6">
            <div class="p-4 rounded-2xl bg-brand-mint/30 border border-brand-teal/20 text-xs text-brand-teal-dark flex items-start gap-2.5">
              <Lock class="w-4 h-4 text-brand-teal-dark shrink-0 mt-0.5" />
              <div>
                <strong>Google Ads & Healthcare Privacy Compliance:</strong> OneCare Aesthetix Clinic is committed to protecting patient privacy. We strictly comply with Google's Healthcare and Medicines Advertising Policy, User Consent Policy, and Indian Information Technology laws. We never sell or share patient data with third-party advertisers.
              </div>
            </div>

            <section class="space-y-2">
              <h3 class="text-sm sm:text-base font-bold text-brand-teal-dark">1. Information We Collect</h3>
              <p class="text-brand-muted">
                We only collect personal information that you voluntarily provide when requesting an appointment, calling our clinic, or messaging us:
              </p>
              <ul class="list-disc list-inside space-y-1 text-brand-muted pl-2">
                <li><strong>Contact Details:</strong> Full Name, Phone / Mobile Number, Email Address.</li>
                <li><strong>Appointment Preferences:</strong> Preferred consultation date, preferred time slot, treatment of interest (e.g. Aligners, Implants, Smile Design).</li>
                <li><strong>Patient Notes:</strong> Any voluntary comments or concerns you share regarding your visit.</li>
                <li><strong>Technical / Web Usage Data:</strong> Anonymized browser type, device information, operating system, and IP address for security and load balancing.</li>
              </ul>
            </section>

            <section class="space-y-2">
              <h3 class="text-sm sm:text-base font-bold text-brand-teal-dark">2. How Your Information is Used</h3>
              <p class="text-brand-muted">
                Your data is used exclusively to facilitate your patient care and consultation experience:
              </p>
              <ul class="list-disc list-inside space-y-1 text-brand-muted pl-2">
                <li>To confirm, manage, or reschedule your clinic appointments via Phone or WhatsApp.</li>
                <li>To answer specific treatment questions, send clinic directions, or share post-op guidance.</li>
                <li>To maintain clinical medical records compliant with dental council guidelines.</li>
                <li>We <strong>never sell, rent, trade, or distribute</strong> patient personal data to data brokers or unrelated commercial third parties.</li>
              </ul>
            </section>

            <section class="space-y-2">
              <h3 class="text-sm sm:text-base font-bold text-brand-teal-dark">3. Google Ads, Conversion Tracking & Cookies</h3>
              <p class="text-brand-muted">
                When you visit our site from a Google advertisement or search, standard web measurement tools may be active:
              </p>
              <div class="space-y-2 text-brand-muted pl-2">
                <p>
                  <strong>• Google Tag & Conversion Measurement:</strong> We may utilize Google Analytics and Google Ads conversion tags solely to understand which services patients find most helpful and to evaluate marketing effectiveness.
                </p>
                <p>
                  <strong>• Strict Health Data Non-Personalization:</strong> In accordance with Google's Personalized Advertising and Health in Personalized Advertising policies, we <strong>never create remarketing lists</strong> based on sensitive clinical conditions or individual medical treatments.
                </p>
                <p>
                  <strong>• Cookie Management & Opt-Out:</strong> You can choose to disable cookies through your browser settings or opt out of Google Analytics tracking using Google's official Opt-out Browser Add-on.
                </p>
              </div>
            </section>

            <section class="space-y-2">
              <h3 class="text-sm sm:text-base font-bold text-brand-teal-dark">4. Patient Data Security & Confidentiality</h3>
              <p class="text-brand-muted">
                We implement robust security standards, including 256-bit SSL encryption across all website communications, secure database architecture, and strict physical & digital access controls within our clinic operatory in Geetai Sankul, Kothrud.
              </p>
            </section>

            <section class="space-y-2">
              <h3 class="text-sm sm:text-base font-bold text-brand-teal-dark">5. Your Privacy Rights</h3>
              <p class="text-brand-muted">
                You maintain complete control over your personal data. You have the right to:
              </p>
              <ul class="list-disc list-inside space-y-1 text-brand-muted pl-2">
                <li>Access, review, or correct your personal contact details on record.</li>
                <li>Request deletion or anonymization of non-statutory booking records.</li>
                <li>Opt out of informational WhatsApp or SMS appointment reminders at any time by messaging us.</li>
              </ul>
            </section>

            <section class="space-y-2">
              <h3 class="text-sm sm:text-base font-bold text-brand-teal-dark">6. Clinic Privacy Grievance Contact</h3>
              <p class="text-brand-muted">
                For any questions or privacy concerns, please contact our clinic management directly:
              </p>
              <div class="p-3 rounded-xl bg-brand-ivory border border-brand-border text-xs space-y-1 text-brand-charcoal">
                <div><strong>OneCare Aesthetix Clinic</strong></div>
                <div>Shop 204, 2nd Floor, Geetai Sankul, Paud Road, near Ideal Colony, Kothrud, Pune – 411038</div>
                <div>Phone: <a :href="'tel:' + siteConfig.contact.phoneClean" class="text-brand-teal-dark font-semibold hover:underline">{{ siteConfig.contact.phoneDisplay }}</a></div>
                <div>Email: <a :href="'mailto:' + siteConfig.contact.email" class="text-brand-teal-dark font-semibold hover:underline">{{ siteConfig.contact.email }}</a></div>
              </div>
            </section>
          </div>

        </div>

        <!-- Modal Footer Actions -->
        <div class="px-6 py-4 bg-brand-ivory border-t border-brand-border flex items-center justify-between gap-4 shrink-0">
          <div class="text-[11px] text-brand-muted hidden sm:block">
            <span>Official Policy Documentation • OneCare Aesthetix</span>
          </div>
          <button
            type="button"
            class="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-brand-teal-dark hover:bg-brand-teal text-white text-xs font-bold transition-all shadow-soft"
            @click="emit('close')"
          >
            I Understand & Close
          </button>
        </div>

      </div>
    </div>
  </Teleport>
</template>
