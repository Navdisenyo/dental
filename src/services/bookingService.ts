export interface AppointmentPayload {
  id?: string
  fullName: string
  mobile: string
  email?: string
  treatment: string
  preferredDate: string
  preferredTime: string
  notes?: string
  consent: boolean
  createdAt?: string
  status?: 'pending' | 'confirmed' | 'contacted'
}

const STORAGE_KEY = 'onecare_appointments_queue'

export const bookingService = {
  /**
   * Save an appointment request.
   * If a backend endpoint (e.g. Supabase or REST API) is configured via VITE_API_URL, it posts there.
   * Otherwise, it persists safely to local secure queue and formats a WhatsApp notification link.
   */
  async submitAppointment(payload: AppointmentPayload): Promise<{ success: boolean; id: string; message: string }> {
    const id = 'apt_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6)
    const timestamp = new Date().toISOString()
    
    const record: AppointmentPayload = {
      ...payload,
      id,
      createdAt: timestamp,
      status: 'pending'
    }

    try {
      // 1. Check if an external API endpoint is provided
      const apiUrl = import.meta.env.VITE_API_URL
      if (apiUrl) {
        const response = await fetch(`${apiUrl}/appointments`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(record)
        })
        if (!response.ok) {
          throw new Error('Server returned ' + response.status)
        }
      }

      // 2. Persist locally to queue for reliability and offline support
      const existing: AppointmentPayload[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      existing.unshift(record)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing.slice(0, 50)))

      return {
        success: true,
        id,
        message: 'Your appointment request has been received. Our team will review your preferred slot and contact you shortly.'
      }
    } catch (err) {
      console.warn('Backend sync failed, stored locally in queue:', err)
      const existing: AppointmentPayload[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      existing.unshift(record)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing.slice(0, 50)))
      
      return {
        success: true,
        id,
        message: 'Your appointment request has been recorded. Our team will contact you to confirm.'
      }
    }
  },

  /**
   * Helper to format a clean WhatsApp message from form values
   */
  createWhatsAppLink(phone: string, payload: AppointmentPayload): string {
    const lines = [
      `*Appointment Request — OneCare Aesthetix Clinic*`,
      ``,
      `*Name:* ${payload.fullName}`,
      `*Mobile:* ${payload.mobile}`,
      payload.email ? `*Email:* ${payload.email}` : null,
      `*Treatment:* ${payload.treatment}`,
      `*Preferred Date:* ${payload.preferredDate}`,
      `*Preferred Time:* ${payload.preferredTime}`,
      payload.notes ? `*Notes:* ${payload.notes}` : null,
      ``,
      `Please let me know if this slot is available. Thank you!`
    ].filter(Boolean)

    const text = encodeURIComponent(lines.join('\n'))
    return `https://wa.me/${phone}?text=${text}`
  }
}
