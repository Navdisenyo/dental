<script setup lang="ts">
import AnnouncementBar from './components/layout/AnnouncementBar.vue'
import SiteHeader from './components/layout/SiteHeader.vue'
import HeroSection from './components/home/HeroSection.vue'
import TrustSection from './components/home/TrustSection.vue'
import WelcomeSection from './components/home/WelcomeSection.vue'
import TreatmentsSection from './components/home/TreatmentsSection.vue'
import WhyChooseUs from './components/home/WhyChooseUs.vue'
import DoctorSection from './components/home/DoctorSection.vue'
import ClinicGallery from './components/home/ClinicGallery.vue'
import PatientJourney from './components/home/PatientJourney.vue'
import GoogleReviews from './components/home/GoogleReviews.vue'
import FAQSection from './components/home/FAQSection.vue'
import AppointmentSection from './components/home/AppointmentSection.vue'
import LocationSection from './components/home/LocationSection.vue'
import SiteFooter from './components/layout/SiteFooter.vue'
import WhatsAppButton from './components/ui/WhatsAppButton.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-brand-ivory text-brand-charcoal selection:bg-brand-teal selection:text-white">
    <!-- Section 1: Announcement Bar -->
    <AnnouncementBar />

    <!-- Main Navigation Header -->
    <SiteHeader />

    <main id="main-content" class="flex-grow">
      <!-- Section 2: Hero Section -->
      <HeroSection />

      <!-- Section 3: Trust and Credibility -->
      <TrustSection />

      <!-- Section 4: Welcome to OneCare -->
      <WelcomeSection />

      <!-- Section 5: Treatments and Services -->
      <TreatmentsSection />

      <!-- Section 6: Why Choose OneCare -->
      <WhyChooseUs />

      <!-- Section 7: Meet the Doctor -->
      <DoctorSection />

      <!-- Section 8: Real Clinic Gallery -->
      <ClinicGallery />

      <!-- Section 9: Patient Journey -->
      <PatientJourney />

      <!-- Section 10: Google Reviews and Testimonials -->
      <GoogleReviews />

      <!-- Section 11: FAQ -->
      <FAQSection />

      <!-- Section 12: Appointment Booking -->
      <AppointmentSection />

      <!-- Section 14: Location and Contact -->
      <LocationSection />
    </main>

    <!-- Section 15: Footer -->
    <SiteFooter />

    <!-- Floating WhatsApp Action -->
    <WhatsAppButton />
  </div>
</template>
