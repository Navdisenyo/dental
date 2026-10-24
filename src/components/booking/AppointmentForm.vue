<script setup lang="ts">
import { Calendar, User, Phone, Mail, Clock, MessageSquare, Check, AlertCircle, Loader2, ArrowRight } from 'lucide-vue-next'
import { useBooking } from '../../composables/useBooking'
import { siteConfig } from '../../config/site'
import BookingSuccess from './BookingSuccess.vue'

const {
  form,
  errors,
  today,
  isSubmitting,
  isSuccess,
  errorMessage,
  lastSubmission,
  lastWhatsAppUrl,
  submit,
  reset
} = useBooking()
</script>

<template>
  <div class="relative w-full">
    <!-- Success View -->
    <BookingSuccess 
      v-if="isSuccess"
      :submission="lastSubmission"
      :whats-app-url="lastWhatsAppUrl"
      @book-another="reset"
    />

    <!-- Interactive Booking Form -->
    <form 
      v-else
      class="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-card text-left"
      @submit.prevent="submit"
      novalidate
    >
      <div class="mb-8">
        <h3 class="text-xl sm:text-2xl font-bold text-brand-charcoal mb-2">
          Request a Consultation
        </h3>
        <p class="text-xs sm:text-sm text-brand-muted">
          Fill in your details below. Our team in Kothrud will check schedule availability and reach out to confirm your preferred slot.
        </p>
      </div>

      <!-- General Error Message Banner -->
      <div 
        v-if="errorMessage" 
        class="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2.5"
      >
        <AlertCircle class="w-4 h-4 shrink-0 mt-0.5" />
        <span>{{ errorMessage }}</span>
      </div>

      <div class="space-y-5">
        
        <!-- Field 1: Full Name -->
        <div>
          <label for="fullName" class="block text-xs font-bold text-brand-charcoal uppercase tracking-wider mb-1.5">
            Full Name <span class="text-rose-500">*</span>
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-muted">
              <User class="w-4 h-4" />
            </div>
            <input 
              id="fullName"
              v-model="form.fullName"
              type="text"
              placeholder="e.g. Pooja Deshmukh"
              class="w-full pl-10 pr-4 py-3 rounded-xl border text-sm text-brand-charcoal placeholder-brand-muted/50 bg-brand-ivory/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-teal transition-all"
              :class="errors.fullName ? 'border-rose-300 focus:ring-rose-400' : 'border-brand-border'"
              required
            />
          </div>
          <p v-if="errors.fullName" class="text-[11px] text-rose-500 mt-1">{{ errors.fullName }}</p>
        </div>

        <!-- Field 2: Mobile & Optional Email (2 cols on tablet/desktop) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <!-- Mobile Number -->
          <div>
            <label for="mobile" class="block text-xs font-bold text-brand-charcoal uppercase tracking-wider mb-1.5">
              Mobile Number <span class="text-rose-500">*</span>
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-muted font-medium text-xs">
                +91
              </div>
              <input 
                id="mobile"
                v-model="form.mobile"
                type="tel"
                maxlength="13"
                placeholder="98348 91463"
                class="w-full pl-12 pr-4 py-3 rounded-xl border text-sm text-brand-charcoal placeholder-brand-muted/50 bg-brand-ivory/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-teal transition-all"
                :class="errors.mobile ? 'border-rose-300 focus:ring-rose-400' : 'border-brand-border'"
                required
              />
            </div>
            <p v-if="errors.mobile" class="text-[11px] text-rose-500 mt-1">{{ errors.mobile }}</p>
          </div>

          <!-- Email (Optional) -->
          <div>
            <label for="email" class="block text-xs font-bold text-brand-charcoal uppercase tracking-wider mb-1.5">
              Email Address <span class="text-brand-muted font-normal">(Optional)</span>
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-muted">
                <Mail class="w-4 h-4" />
              </div>
              <input 
                id="email"
                v-model="form.email"
                type="email"
                placeholder="name@domain.com"
                class="w-full pl-10 pr-4 py-3 rounded-xl border text-sm text-brand-charcoal placeholder-brand-muted/50 bg-brand-ivory/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-teal transition-all"
                :class="errors.email ? 'border-rose-300 focus:ring-rose-400' : 'border-brand-border'"
              />
            </div>
            <p v-if="errors.email" class="text-[11px] text-rose-500 mt-1">{{ errors.email }}</p>
          </div>
        </div>

        <!-- Field 3: Treatment Selection -->
        <div>
          <label for="treatment" class="block text-xs font-bold text-brand-charcoal uppercase tracking-wider mb-1.5">
            Preferred Treatment or Service <span class="text-rose-500">*</span>
          </label>
          <select 
            id="treatment"
            v-model="form.treatment"
            class="w-full px-4 py-3 rounded-xl border border-brand-border text-sm text-brand-charcoal bg-brand-ivory/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-teal transition-all"
          >
            <option v-for="t in siteConfig.treatments" :key="t.id" :value="t.title">
              {{ t.title }} ({{ t.category === 'aesthetic' ? 'Facial Aesthetics' : 'Dental Care' }})
            </option>
            <option value="General Dental Consultation & Checkup">General Dental Consultation & Checkup</option>
            <option value="Second Opinion / Treatment Discussion">Second Opinion / Treatment Discussion</option>
          </select>
        </div>

        <!-- Field 4: Preferred Date & Time Slot -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <!-- Preferred Date -->
          <div>
            <label for="preferredDate" class="block text-xs font-bold text-brand-charcoal uppercase tracking-wider mb-1.5">
              Preferred Date <span class="text-rose-500">*</span>
            </label>
            <div class="relative">
              <input 
                id="preferredDate"
                v-model="form.preferredDate"
                type="date"
                :min="today"
                class="w-full px-4 py-3 rounded-xl border text-sm text-brand-charcoal bg-brand-ivory/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-teal transition-all"
                :class="errors.preferredDate ? 'border-rose-300 focus:ring-rose-400' : 'border-brand-border'"
                required
              />
            </div>
            <p v-if="errors.preferredDate" class="text-[11px] text-rose-500 mt-1">{{ errors.preferredDate }}</p>
          </div>

          <!-- Preferred Time -->
          <div>
            <label for="preferredTime" class="block text-xs font-bold text-brand-charcoal uppercase tracking-wider mb-1.5">
              Preferred Consultation Time <span class="text-rose-500">*</span>
            </label>
            <select 
              id="preferredTime"
              v-model="form.preferredTime"
              class="w-full px-4 py-3 rounded-xl border border-brand-border text-sm text-brand-charcoal bg-brand-ivory/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-teal transition-all"
            >
              <option value="Morning (10:30 AM – 1:00 PM)">Morning (10:30 AM – 1:00 PM)</option>
              <option value="Afternoon (1:00 PM – 2:00 PM)">Afternoon (1:00 PM – 2:00 PM)</option>
              <option value="Evening (4:30 PM – 6:30 PM)">Evening (4:30 PM – 6:30 PM)</option>
              <option value="Late Evening (6:30 PM – 8:00 PM)">Late Evening (6:30 PM – 8:00 PM)</option>
              <option value="Sunday Morning (11:00 AM – 2:30 PM)">Sunday Morning (11:00 AM – 2:30 PM)</option>
            </select>
          </div>
        </div>

        <!-- Field 5: Notes (Optional) -->
        <div>
          <label for="notes" class="block text-xs font-bold text-brand-charcoal uppercase tracking-wider mb-1.5">
            Additional Details or Tooth/Skin Concern <span class="text-brand-muted font-normal">(Optional)</span>
          </label>
          <textarea 
            id="notes"
            v-model="form.notes"
            rows="2"
            placeholder="Share any specific pain, dental history, or questions you have..."
            class="w-full px-4 py-3 rounded-xl border border-brand-border text-sm text-brand-charcoal placeholder-brand-muted/50 bg-brand-ivory/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-teal transition-all resize-none"
          ></textarea>
        </div>

        <!-- Consent Checkbox -->
        <div class="pt-2">
          <label class="flex items-start gap-3 cursor-pointer select-none">
            <input 
              v-model="form.consent" 
              type="checkbox"
              class="mt-1 h-4 w-4 rounded border-brand-border text-brand-teal focus:ring-brand-teal"
            />
            <span class="text-xs text-brand-muted leading-relaxed">
              I consent to OneCare Aesthetix Clinic contacting me via phone or WhatsApp regarding this appointment enquiry. (Your contact details remain confidential).
            </span>
          </label>
          <p v-if="errors.consent" class="text-[11px] text-rose-500 mt-1">{{ errors.consent }}</p>
        </div>

        <!-- Submit Button -->
        <div class="pt-4">
          <button 
            type="submit"
            :disabled="isSubmitting"
            class="w-full py-4 px-6 rounded-2xl bg-brand-teal-dark hover:bg-brand-teal text-white font-semibold text-sm shadow-card hover:shadow-float transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2 disabled:opacity-60"
          >
            <Loader2 v-if="isSubmitting" class="w-4 h-4 animate-spin" />
            <span v-if="!isSubmitting">Request Appointment</span>
            <span v-else>Recording Request...</span>
            <ArrowRight v-if="!isSubmitting" class="w-4 h-4 ml-1" />
          </button>
        </div>

      </div>
    </form>
  </div>
</template>
