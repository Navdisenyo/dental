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
const LEAD_EMAIL = 'teamonecareaesthetix@gmail.com'

/**
 * Sends consultation booking details directly to clinic email
 */
async function dispatchEmailNotification(payload: AppointmentPayload, bookingId: string): Promise<boolean> {
  try {
    const formattedTimestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    const emailBody = {
      _subject: `New Consultation Lead: ${payload.fullName} - ${payload.treatment}`,
      _template: 'table',
      _captcha: 'false',
      'Patient Full Name': payload.fullName,
      'Contact Mobile': `+91 ${payload.mobile}`,
      'Patient Email': payload.email || 'Not provided',
      'Requested Treatment': payload.treatment,
      'Preferred Appointment Date': payload.preferredDate,
      'Preferred Slot': payload.preferredTime,
      'Patient Notes / Message': payload.notes || 'None provided',
      'Booking Reference ID': bookingId,
      'Clinic': 'OneCare Aesthetix Clinic (Shop 204, Geetai Sankul, Paud Road, Kothrud, Pune)',
      'Received At': formattedTimestamp
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 6000)

    const response = await fetch(`https://formsubmit.co/ajax/${LEAD_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(emailBody),
      signal: controller.signal
    })

    clearTimeout(timeoutId)
    return response.ok
  } catch (e) {
    console.warn('Email lead dispatch note:', e)
    return false
  }
}

export const bookingService = {
  /**
   * Save an appointment request.
   * Dispatches email lead details to teamonecareaesthetix@gmail.com,
   * syncs with optional backend endpoint, and saves to secure local queue.
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

    // 1. Dispatch lead notification directly to team email
    await dispatchEmailNotification(payload, id)

    try {
      // 2. Check if an external API endpoint is configured
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

      // 3. Persist locally to queue for reliability and offline support
      const existing: AppointmentPayload[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      existing.unshift(record)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing.slice(0, 50)))

      return {
        success: true,
        id,
        message: 'Your consultation request has been received and sent to our team at teamonecareaesthetix@gmail.com. We will contact you shortly.'
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
