<script setup lang="ts">
import AnnouncementBar from './components/layout/AnnouncementBar.vue'
import SiteHeader from './components/layout/SiteHeader.vue'
import SiteFooter from './components/layout/SiteFooter.vue'
import WhatsAppButton from './components/ui/WhatsAppButton.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-brand-ivory text-brand-charcoal selection:bg-brand-teal selection:text-white">
    <!-- Section 1: Announcement Bar -->
    <AnnouncementBar />

    <!-- Main Navigation Header -->
    <SiteHeader />

    <!-- Dynamic View via Router -->
    <router-view />

    <!-- Section 15: Footer -->
    <SiteFooter />

    <!-- Floating WhatsApp Action -->
    <WhatsAppButton />
  </div>
</template>
