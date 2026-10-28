<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { 
  Search, 
  Clock, 
  Calendar, 
  ArrowRight, 
  Tag, 
  Sparkles, 
  BookOpen, 
  ShieldCheck, 
  Settings, 
  ChevronRight,
  Filter
} from 'lucide-vue-next'
import { useBlogStore } from '../services/blogStore'
import { siteConfig } from '../config/site'

const blogStore = useBlogStore()

const searchQuery = ref('')
const selectedCategory = ref('all')

const filteredPosts = computed(() => {
  let list = blogStore.publishedPosts.value

  if (selectedCategory.value !== 'all') {
    list = list.filter(p => p.category === selectedCategory.value)
  }

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim()
    list = list.filter(p => {
      const matchTitle = p.title.toLowerCase().includes(q)
      const matchDesc = p.description.toLowerCase().includes(q)
      const matchKeywords = p.keywords.some(k => k.toLowerCase().includes(q))
      const matchCategory = p.categoryLabel.toLowerCase().includes(q)
      return matchTitle || matchDesc || matchKeywords || matchCategory
    })
  }

  return list
})

const featuredPost = computed(() => {
  return filteredPosts.value.find(p => p.featured) || filteredPosts.value[0]
})

const regularPosts = computed(() => {
  if (!featuredPost.value) return []
  return filteredPosts.value.filter(p => p.id !== featuredPost.value.id)
})

function selectKeyword(keyword: string) {
  searchQuery.value = keyword
}

function clearFilters() {
  searchQuery.value = ''
  selectedCategory.value = 'all'
}
</script>

<template>
  <div class="bg-brand-ivory min-h-screen py-10 sm:py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Top Breadcrumbs & Admin Access -->
      <div class="flex flex-wrap items-center justify-between gap-4 mb-8 text-xs font-medium text-brand-muted">
        <nav class="flex items-center gap-2" aria-label="Breadcrumb">
          <RouterLink to="/" class="hover:text-brand-teal transition-colors">Home</RouterLink>
          <ChevronRight class="w-3.5 h-3.5 text-brand-border" />
          <span class="text-brand-charcoal font-semibold">Dental Articles & Knowledge Base</span>
        </nav>

        <RouterLink 
          to="/admin" 
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-mint hover:bg-brand-teal/20 text-brand-teal-dark border border-brand-teal/30 transition-all text-xs font-semibold shadow-xs"
          title="Manage & publish blog articles"
        >
          <Settings class="w-3.5 h-3.5" />
          <span>Doctor / Admin Panel</span>
        </RouterLink>
      </div>

      <!-- Hero Header Section -->
      <div class="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-mint text-brand-teal-dark text-xs font-bold tracking-wide uppercase mb-4 border border-brand-teal/20">
          <Sparkles class="w-3.5 h-3.5 text-brand-teal" />
          <span>Clinical Orthodontics & Aesthetic Dentistry</span>
        </div>
        
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-charcoal tracking-tight leading-tight mb-4">
          Evidence-Based Guides for a <br class="hidden sm:block" />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal-dark via-brand-teal to-brand-gold">
            Radiant, Healthy Smile
          </span>
        </h1>
        
        <p class="text-sm sm:text-base text-brand-muted leading-relaxed">
          Authored by <strong>Dr. Achal Agarwal</strong> (MDS Orthodontist & Dentofacial Orthopaedist). 
          Explore clear clinical advice on clear aligners, dental arch development, aesthetic gap closure, and family oral health.
        </p>

        <!-- Search & Filter Controls -->
        <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto">
          <div class="relative w-full">
            <Search class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
            <input 
              v-model="searchQuery"
              type="text"
              placeholder="Search by keyword (e.g. Aligners, Arch, Diastema)..."
              class="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-brand-border text-sm text-brand-charcoal placeholder:text-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-teal shadow-soft transition-all"
            />
            <button 
              v-if="searchQuery" 
              @click="searchQuery = ''"
              class="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-brand-muted hover:text-brand-charcoal font-bold"
            >
              ✕
            </button>
          </div>
        </div>

        <!-- Category Pills -->
        <div class="mt-6 flex flex-wrap items-center justify-center gap-2">
          <button
            v-for="cat in blogStore.categories.value"
            :key="cat.value"
            @click="selectedCategory = cat.value"
            :class="[
              'px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border',
              selectedCategory === cat.value
                ? 'bg-brand-teal-dark text-white border-brand-teal-dark shadow-sm'
                : 'bg-white text-brand-charcoal hover:bg-brand-mint border-brand-border hover:border-brand-teal/40'
            ]"
          >
            {{ cat.label }}
          </button>
        </div>
      </div>

      <!-- No Results State -->
      <div v-if="filteredPosts.length === 0" class="text-center py-16 bg-white rounded-3xl border border-brand-border p-8 shadow-soft max-w-md mx-auto">
        <BookOpen class="w-12 h-12 text-brand-teal/40 mx-auto mb-4" />
        <h3 class="text-lg font-bold text-brand-charcoal mb-2">No matching clinical articles</h3>
        <p class="text-xs text-brand-muted mb-6">
          We couldn't find any articles matching "{{ searchQuery }}". Try searching another topic or reset your filters.
        </p>
        <button 
          @click="clearFilters"
          class="px-5 py-2.5 rounded-xl bg-brand-teal-dark text-white text-xs font-semibold hover:bg-brand-teal transition-all shadow-soft"
        >
          View All Articles
        </button>
      </div>

      <div v-else class="space-y-12">
        <!-- Featured Article Spotlight (Hero Card) -->
        <article 
          v-if="featuredPost"
          class="group bg-white rounded-3xl overflow-hidden border border-brand-border shadow-card hover:shadow-float transition-all duration-300 grid grid-cols-1 lg:grid-cols-12"
        >
          <!-- Left: Featured Image -->
          <div class="lg:col-span-7 relative bg-brand-mint/40 overflow-hidden min-h-[280px] sm:min-h-[360px] flex items-center justify-center">
            <img 
              :src="featuredPost.image" 
              :alt="featuredPost.title"
              class="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 max-h-[440px]"
            />
            <div class="absolute top-4 left-4 z-10 flex items-center gap-2">
              <span class="px-3 py-1 rounded-full bg-brand-charcoal/85 backdrop-blur-md text-white text-xs font-bold border border-white/20">
                ★ Featured Article
              </span>
              <span class="px-3 py-1 rounded-full bg-brand-teal text-white text-xs font-semibold shadow-sm">
                {{ featuredPost.categoryLabel }}
              </span>
            </div>
          </div>

          <!-- Right: Featured Content Details -->
          <div class="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <!-- Meta strip -->
              <div class="flex items-center gap-3 text-xs text-brand-muted mb-3 font-medium">
                <span class="flex items-center gap-1">
                  <Calendar class="w-3.5 h-3.5 text-brand-teal" />
                  {{ featuredPost.publishedAt }}
                </span>
                <span>•</span>
                <span class="flex items-center gap-1">
                  <Clock class="w-3.5 h-3.5 text-brand-teal" />
                  {{ featuredPost.readingTime }}
                </span>
              </div>

              <!-- Title -->
              <h2 class="text-xl sm:text-2xl lg:text-3xl font-bold text-brand-charcoal group-hover:text-brand-teal transition-colors leading-snug mb-3">
                <RouterLink :to="'/blog/' + featuredPost.slug">
                  {{ featuredPost.title }}
                </RouterLink>
              </h2>

              <!-- Description -->
              <p class="text-xs sm:text-sm text-brand-muted leading-relaxed line-clamp-3 mb-6">
                {{ featuredPost.description }}
              </p>

              <!-- Keywords / Tags -->
              <div class="flex flex-wrap gap-1.5 mb-6">
                <button
                  v-for="kw in featuredPost.keywords.slice(0, 4)"
                  :key="kw"
                  @click.stop="selectKeyword(kw)"
                  class="inline-flex items-center gap-1 text-[11px] bg-brand-mint text-brand-teal-dark font-medium px-2.5 py-1 rounded-md hover:bg-brand-teal hover:text-white transition-colors"
                >
                  <Tag class="w-2.5 h-2.5" />
                  <span>{{ kw }}</span>
                </button>
              </div>
            </div>

            <!-- Author & Read Link -->
            <div class="pt-5 border-t border-brand-border flex items-center justify-between">
              <div class="flex items-center gap-3">
                <img 
                  :src="featuredPost.author.avatar" 
                  :alt="featuredPost.author.name"
                  class="w-9 h-9 rounded-full object-contain p-0.5 border border-brand-teal/40 bg-white"
                />
                <div>
                  <div class="text-xs font-bold text-brand-charcoal">{{ featuredPost.author.name }}</div>
                  <div class="text-[11px] text-brand-muted">{{ featuredPost.author.role }}</div>
                </div>
              </div>

              <RouterLink 
                :to="'/blog/' + featuredPost.slug"
                class="inline-flex items-center gap-1 text-xs font-bold text-brand-teal-dark hover:text-brand-teal group/link"
              >
                <span>Read Guide</span>
                <ArrowRight class="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
              </RouterLink>
            </div>
          </div>
        </article>

        <!-- Articles Grid (3 Columns) -->
        <div v-if="regularPosts.length > 0" class="space-y-6">
          <div class="flex items-center justify-between">
            <h3 class="text-xl font-bold text-brand-charcoal">All Recent Clinical Articles</h3>
            <span class="text-xs text-brand-muted">{{ regularPosts.length }} articles available</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <article 
              v-for="post in regularPosts" 
              :key="post.id"
              class="group bg-white rounded-3xl overflow-hidden border border-brand-border shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <!-- Image Header -->
                <div class="relative bg-brand-mint/40 overflow-hidden aspect-[16/10] flex items-center justify-center">
                  <img 
                    :src="post.image" 
                    :alt="post.title"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <!-- Category Pill -->
                  <div class="absolute top-3 left-3 z-10">
                    <span class="px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-md text-[11px] font-bold text-brand-teal-deep shadow-xs">
                      {{ post.categoryLabel }}
                    </span>
                  </div>
                </div>

                <!-- Card Body -->
                <div class="p-5 sm:p-6">
                  <!-- Meta Details -->
                  <div class="flex items-center justify-between text-xs text-brand-muted mb-2 font-medium">
                    <span class="flex items-center gap-1 text-[11px]">
                      <Calendar class="w-3 h-3 text-brand-teal" />
                      {{ post.publishedAt }}
                    </span>
                    <span class="inline-flex items-center gap-1 text-[11px] bg-brand-mint px-2 py-0.5 rounded text-brand-teal-dark font-medium">
                      <Clock class="w-3 h-3" />
                      {{ post.readingTime }}
                    </span>
                  </div>

                  <!-- Title -->
                  <h4 class="text-base sm:text-lg font-bold text-brand-charcoal group-hover:text-brand-teal transition-colors leading-snug mb-2 line-clamp-2">
                    <RouterLink :to="'/blog/' + post.slug">
                      {{ post.title }}
                    </RouterLink>
                  </h4>

                  <!-- Description -->
                  <p class="text-xs text-brand-muted line-clamp-3 leading-relaxed mb-4">
                    {{ post.description }}
                  </p>

                  <!-- Keywords Chips -->
                  <div class="flex flex-wrap gap-1.5 mb-2">
                    <button
                      v-for="kw in post.keywords.slice(0, 3)"
                      :key="kw"
                      @click.stop="selectKeyword(kw)"
                      class="text-[10px] bg-brand-mint/70 text-brand-teal-dark font-medium px-2 py-0.5 rounded hover:bg-brand-teal hover:text-white transition-colors"
                    >
                      #{{ kw }}
                    </button>
                    <span v-if="post.keywords.length > 3" class="text-[10px] text-brand-muted self-center">
                      +{{ post.keywords.length - 3 }} more
                    </span>
                  </div>
                </div>
              </div>

              <!-- Footer with Author & Link -->
              <div class="p-5 sm:p-6 pt-0 border-t border-brand-border/40 mt-3 flex items-center justify-between">
                <div class="text-[11px] text-brand-muted">
                  By <span class="font-bold text-brand-charcoal">{{ post.author.name }}</span>
                </div>
                
                <RouterLink 
                  :to="'/blog/' + post.slug"
                  class="inline-flex items-center gap-1 text-xs font-bold text-brand-teal-dark hover:text-brand-teal group/arrow"
                >
                  <span>Read Post</span>
                  <ArrowRight class="w-3.5 h-3.5 transition-transform group-hover/arrow:translate-x-1" />
                </RouterLink>
              </div>
            </article>
          </div>
        </div>
      </div>

      <!-- Consultation CTA Banner -->
      <div class="mt-16 sm:mt-20 bg-gradient-to-r from-brand-teal-deep to-brand-teal-dark text-white rounded-3xl p-8 sm:p-12 shadow-card relative overflow-hidden">
        <div class="absolute -right-10 -bottom-10 w-72 h-72 bg-brand-teal/20 rounded-full blur-3xl pointer-events-none"></div>
        <div class="relative z-10 max-w-2xl">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-mint text-xs font-semibold mb-3 border border-white/15">
            <ShieldCheck class="w-3.5 h-3.5 text-emerald-300" />
            <span>Consult Dr. Achal Agarwal at Kothrud, Pune</span>
          </div>
          <h3 class="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
            Have Questions About Your Teeth or Smile Alignment?
          </h3>
          <p class="text-xs sm:text-sm text-brand-mint/90 leading-relaxed mb-6">
            Schedule an unhurried, evidence-based clinical assessment. We analyze your digital scans, facial symmetry, and arch dimensions to formulate your tailored treatment roadmap.
          </p>
          <div class="flex flex-wrap items-center gap-4">
            <a 
              href="/#appointment"
              class="px-6 py-3 rounded-xl bg-white text-brand-teal-dark hover:bg-brand-mint text-xs sm:text-sm font-bold shadow-soft transition-all"
            >
              Book an Appointment
            </a>
            <a 
              :href="siteConfig.contact.whatsappLink"
              target="_blank"
              rel="noopener noreferrer"
              class="px-6 py-3 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs sm:text-sm font-semibold border border-white/20 transition-all"
            >
              WhatsApp Us (+91 98348 91463)
            </a>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
