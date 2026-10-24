import { ref, reactive } from 'vue'
import { bookingService, type AppointmentPayload } from '../services/bookingService'
import { siteConfig } from '../config/site'

export function useBooking() {
  const isSubmitting = ref(false)
  const isSuccess = ref(false)
  const errorMessage = ref('')
  const lastSubmission = ref<AppointmentPayload | null>(null)
  const lastWhatsAppUrl = ref('')

  // Set min date to today, default preferred date to tomorrow
  const today = new Date().toISOString().split('T')[0]
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0]

  const form = reactive({
    fullName: '',
    mobile: '',
    email: '',
    treatment: 'Digital Smile Design',
    preferredDate: tomorrow,
    preferredTime: 'Morning (10:30 AM – 1:00 PM)',
    notes: '',
    consent: true
  })

  const errors = reactive({
    fullName: '',
    mobile: '',
    email: '',
    preferredDate: '',
    consent: ''
  })

  const validate = (): boolean => {
    let isValid = true
    errors.fullName = ''
    errors.mobile = ''
    errors.email = ''
    errors.preferredDate = ''
    errors.consent = ''

    // Full name
    if (!form.fullName.trim() || form.fullName.trim().length < 2) {
      errors.fullName = 'Please enter your full name (at least 2 characters).'
      isValid = false
    }

    // Indian mobile number validation (10 digits starting with 6-9, allowing +91 or 0 prefix)
    const cleanMobile = form.mobile.replace(/[\s\-()]/g, '')
    const mobileRegex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/
    if (!cleanMobile || !mobileRegex.test(cleanMobile)) {
      errors.mobile = 'Please enter a valid 10-digit Indian mobile number.'
      isValid = false
    }

    // Optional email validation
    if (form.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(form.email.trim())) {
        errors.email = 'Please provide a valid email address.'
        isValid = false
      }
    }

    // Date validation: cannot be in the past
    if (!form.preferredDate) {
      errors.preferredDate = 'Please select your preferred appointment date.'
      isValid = false
    } else if (form.preferredDate < today) {
      errors.preferredDate = 'Appointment date cannot be in the past.'
      isValid = false
    }

    // Consent
    if (!form.consent) {
      errors.consent = 'Please give consent so our clinic can contact you regarding this enquiry.'
      isValid = false
    }

    return isValid
  }

  const submit = async () => {
    if (!validate()) return false

    isSubmitting.value = true
    errorMessage.value = ''

    try {
      // Standardize clean 10 digit number
      let cleanMobile = form.mobile.replace(/[\s\-()]/g, '')
      if (cleanMobile.startsWith('+91')) cleanMobile = cleanMobile.slice(3)
      else if (cleanMobile.startsWith('91') && cleanMobile.length === 12) cleanMobile = cleanMobile.slice(2)
      else if (cleanMobile.startsWith('0') && cleanMobile.length === 11) cleanMobile = cleanMobile.slice(1)

      const payload: AppointmentPayload = {
        fullName: form.fullName.trim(),
        mobile: cleanMobile,
        email: form.email.trim() || undefined,
        treatment: form.treatment,
        preferredDate: form.preferredDate,
        preferredTime: form.preferredTime,
        notes: form.notes.trim() || undefined,
        consent: form.consent
      }

      const res = await bookingService.submitAppointment(payload)
      if (res.success) {
        isSuccess.value = true
        lastSubmission.value = payload
        lastWhatsAppUrl.value = bookingService.createWhatsAppLink(siteConfig.contact.whatsappNumber, payload)
        return true
      } else {
        errorMessage.value = res.message || 'Something went wrong. Please try again or WhatsApp us directly.'
        return false
      }
    } catch (err: any) {
      errorMessage.value = err.message || 'Unable to record appointment. Please contact our reception directly.'
      return false
    } finally {
      isSubmitting.value = false
    }
  }

  const reset = () => {
    form.fullName = ''
    form.mobile = ''
    form.email = ''
    form.treatment = 'Digital Smile Design'
    form.preferredDate = tomorrow
    form.preferredTime = 'Morning (10:30 AM – 1:00 PM)'
    form.notes = ''
    form.consent = true
    isSuccess.value = false
    errorMessage.value = ''
  }

  return {
    form,
    errors,
    today,
    isSubmitting,
    isSuccess,
    errorMessage,
    lastSubmission,
    lastWhatsAppUrl,
    validate,
    submit,
    reset
  }
}
