<script setup lang="ts">
import { computed, watch, onMounted } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { 
  Calendar, 
  Clock, 
  ArrowLeft, 
  Share2, 
  MessageCircle, 
  Check, 
  Tag, 
  Bookmark, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  ChevronRight,
  BookOpen,
  CalendarCheck
} from 'lucide-vue-next'
import { ref } from 'vue'
import { useBlogStore } from '../services/blogStore'
import { siteConfig } from '../config/site'

const route = useRoute()
const router = useRouter()
const blogStore = useBlogStore()

const copied = ref(false)

const slug = computed(() => route.params.slug as string)

const post = computed(() => {
  return blogStore.getPostBySlug(slug.value)
})

const relatedPosts = computed(() => {
  if (!post.value) return []
  return blogStore.publishedPosts.value
    .filter(p => p.id !== post.value?.id)
    .slice(0, 3)
})

// Update document title and meta for SEO
function updateSEO() {
  if (!post.value) return
  document.title = `${post.value.title} | OneCare Aesthetix Clinic`

  let metaDesc = document.querySelector('meta[name="description"]')
  if (!metaDesc) {
    metaDesc = document.createElement('meta')
    metaDesc.setAttribute('name', 'description')
    document.head.appendChild(metaDesc)
  }
  metaDesc.setAttribute('content', post.value.description)

  let metaKeywords = document.querySelector('meta[name="keywords"]')
  if (!metaKeywords) {
    metaKeywords = document.createElement('meta')
    metaKeywords.setAttribute('name', 'keywords')
    document.head.appendChild(metaKeywords)
  }
  metaKeywords.setAttribute('content', post.value.keywords.join(', '))
}

watch(post, () => {
  updateSEO()
}, { immediate: true })

onMounted(() => {
  updateSEO()
})

function copyPageLink() {
  if (typeof window !== 'undefined') {
    navigator.clipboard.writeText(window.location.href)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2500)
  }
}

const shareWhatsAppUrl = computed(() => {
  if (typeof window === 'undefined' || !post.value) return ''
  const text = `Read this clinical guide from Dr. Achal Agarwal at OneCare Aesthetix Clinic: "${post.value.title}"\n${window.location.href}`
  return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`
})

// Simple Markdown / format renderer for the content
const formattedContent = computed(() => {
  if (!post.value?.content) return ''
  const lines = post.value.content.split('\n')
  let html = ''
  let inList = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (line.startsWith('## ')) {
      if (inList) { html += '</ul>'; inList = false; }
      html += `<h2 class="text-2xl sm:text-3xl font-bold text-brand-charcoal mt-8 mb-4 tracking-tight leading-snug">${line.replace('## ', '')}</h2>`
    } else if (line.startsWith('### ')) {
      if (inList) { html += '</ul>'; inList = false; }
      html += `<h3 class="text-xl sm:text-2xl font-bold text-brand-charcoal mt-6 mb-3 tracking-tight">${line.replace('### ', '')}</h3>`
    } else if (line.startsWith('#### ')) {
      if (inList) { html += '</ul>'; inList = false; }
      html += `<h4 class="text-lg font-bold text-brand-teal-dark mt-5 mb-2">${line.replace('#### ', '')}</h4>`
    } else if (line.startsWith('> ')) {
      if (inList) { html += '</ul>'; inList = false; }
      html += `<blockquote class="my-6 p-4 sm:p-6 rounded-2xl bg-brand-mint/60 border-l-4 border-brand-teal text-brand-teal-deep italic font-medium text-sm sm:text-base leading-relaxed">${line.replace('> ', '')}</blockquote>`
    } else if (line.startsWith('- ')) {
      if (!inList) {
        html += '<ul class="my-4 space-y-2 list-none pl-0">'
        inList = true
      }
      const itemText = line.replace('- ', '')
      html += `<li class="flex items-start gap-2.5 text-sm sm:text-base text-brand-charcoal leading-relaxed"><span class="w-2 h-2 rounded-full bg-brand-teal mt-2 shrink-0"></span><span>${itemText}</span></li>`
    } else if (line.startsWith('---')) {
      if (inList) { html += '</ul>'; inList = false; }
      html += '<hr class="my-8 border-brand-border" />'
    } else if (line.trim() === '') {
      if (inList) { html += '</ul>'; inList = false; }
    } else {
      if (inList) { html += '</ul>'; inList = false; }
      // Bold syntax replacer
      let formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-brand-charcoal">$1</strong>')
      html += `<p class="my-4 text-sm sm:text-base text-brand-charcoal/90 leading-relaxed">${formattedLine}</p>`
    }
  }

  if (inList) {
    html += '</ul>'
  }

  return html
})
</script>

<template>
  <div class="bg-brand-ivory min-h-screen py-8 sm:py-14">
    <!-- 404 Post Not Found State -->
    <div v-if="!post" class="max-w-2xl mx-auto px-4 text-center py-20">
      <BookOpen class="w-16 h-16 text-brand-teal/40 mx-auto mb-4" />
      <h1 class="text-2xl sm:text-3xl font-extrabold text-brand-charcoal mb-3">Article Not Found</h1>
      <p class="text-sm text-brand-muted mb-8">
        The clinical article you are searching for might have been moved or removed.
      </p>
      <RouterLink 
        to="/blog"
        class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-teal-dark text-white text-sm font-semibold hover:bg-brand-teal transition-all shadow-soft"
      >
        <ArrowLeft class="w-4 h-4" />
        <span>Return to All Articles</span>
      </RouterLink>
    </div>

    <!-- Active Article View -->
    <article v-else class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Top Navigation & Breadcrumbs -->
      <div class="flex flex-wrap items-center justify-between gap-4 mb-8 text-xs font-medium text-brand-muted">
        <nav class="flex items-center gap-1.5 flex-wrap" aria-label="Breadcrumbs">
          <RouterLink to="/" class="hover:text-brand-teal transition-colors">Home</RouterLink>
          <ChevronRight class="w-3.5 h-3.5 text-brand-border" />
          <RouterLink to="/blog" class="hover:text-brand-teal transition-colors">Articles</RouterLink>
          <ChevronRight class="w-3.5 h-3.5 text-brand-border" />
          <span class="text-brand-teal-dark font-semibold">{{ post.categoryLabel }}</span>
        </nav>

        <RouterLink 
          to="/blog"
          class="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-teal-dark hover:text-brand-teal transition-colors"
        >
          <ArrowLeft class="w-3.5 h-3.5" />
          <span>Back to Articles</span>
        </RouterLink>
      </div>

      <!-- Post Header -->
      <header class="mb-8">
        <!-- Category & Reading Time Meta -->
        <div class="flex flex-wrap items-center gap-3 mb-4">
          <span class="px-3 py-1 rounded-full bg-brand-mint text-brand-teal-dark text-xs font-bold border border-brand-teal/30">
            {{ post.categoryLabel }}
          </span>
          <span class="inline-flex items-center gap-1.5 text-xs text-brand-muted font-medium">
            <Calendar class="w-3.5 h-3.5 text-brand-teal" />
            Published {{ post.publishedAt }}
          </span>
          <span class="inline-flex items-center gap-1.5 text-xs text-brand-muted font-medium">
            <Clock class="w-3.5 h-3.5 text-brand-teal" />
            {{ post.readingTime }}
          </span>
        </div>

        <!-- Blog Title (H1) -->
        <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-charcoal tracking-tight leading-tight mb-5">
          {{ post.title }}
        </h1>

        <!-- Executive Description Lead Card -->
        <div class="p-4 sm:p-5 rounded-2xl bg-white border border-brand-border shadow-soft mb-6">
          <div class="text-[11px] font-bold text-brand-teal-dark uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Sparkles class="w-3.5 h-3.5 text-brand-teal" />
            <span>Clinical Summary & Overview</span>
          </div>
          <p class="text-sm sm:text-base text-brand-charcoal/90 leading-relaxed font-normal">
            {{ post.description }}
          </p>
        </div>

        <!-- Keywords / Tags Pill Bar -->
        <div class="flex flex-wrap items-center gap-2 mb-6">
          <span class="text-xs font-bold text-brand-muted flex items-center gap-1">
            <Tag class="w-3.5 h-3.5 text-brand-teal" />
            <span>Keywords:</span>
          </span>
          <span 
            v-for="kw in post.keywords"
            :key="kw"
            class="px-2.5 py-1 rounded-md bg-brand-mint/70 text-brand-teal-dark text-xs font-medium border border-brand-teal/20"
          >
            {{ kw }}
          </span>
        </div>

        <!-- Author Byline & Social Sharing Strip -->
        <div class="py-4 border-y border-brand-border flex flex-wrap items-center justify-between gap-4">
          <!-- Author Profile -->
          <div class="flex items-center gap-3">
            <img 
              :src="post.author.avatar" 
              :alt="post.author.name"
              class="w-11 h-11 rounded-full object-contain p-0.5 border border-brand-teal/40 bg-white shadow-xs"
            />
            <div>
              <div class="text-sm font-bold text-brand-charcoal">{{ post.author.name }}</div>
              <div class="text-xs text-brand-muted">{{ post.author.role }} • {{ post.author.clinic }}</div>
            </div>
          </div>

          <!-- Sharing Actions -->
          <div class="flex items-center gap-2">
            <a 
              :href="shareWhatsAppUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-semibold transition-colors"
              title="Share on WhatsApp"
            >
              <MessageCircle class="w-3.5 h-3.5 text-emerald-600" />
              <span>Share</span>
            </a>

            <button 
              @click="copyPageLink"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-brand-mint text-brand-charcoal border border-brand-border text-xs font-semibold transition-colors shadow-xs"
              title="Copy Link to Clipboard"
            >
              <Check v-if="copied" class="w-3.5 h-3.5 text-emerald-600" />
              <Share2 v-else class="w-3.5 h-3.5 text-brand-muted" />
              <span>{{ copied ? 'Copied!' : 'Copy Link' }}</span>
            </button>
          </div>
        </div>
      </header>

      <!-- Main Cover Image -->
      <figure class="mb-10 rounded-3xl overflow-hidden bg-white border border-brand-border shadow-card">
        <div class="relative bg-brand-mint/30 overflow-hidden max-h-[480px] flex items-center justify-center">
          <img 
            :src="post.image" 
            :alt="post.title"
            class="w-full h-auto object-contain max-h-[480px]"
          />
          <div class="absolute bottom-3 left-3 z-10">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-charcoal/80 backdrop-blur-md text-white text-[11px] font-semibold border border-white/20">
              <ShieldCheck class="w-3 h-3 text-emerald-400" />
              <span>OneCare Aesthetix Clinical Case Photo</span>
            </span>
          </div>
        </div>
        <figcaption v-if="post.imageCaption" class="p-3 text-center text-xs text-brand-muted border-t border-brand-border bg-white italic">
          {{ post.imageCaption }}
        </figcaption>
      </figure>

      <!-- Formatted Article Content -->
      <section 
        class="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-brand-border shadow-soft leading-relaxed"
        v-html="formattedContent"
      >
      </section>

      <!-- Author Bio Box with Consultation Callout -->
      <div class="mt-10 bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-soft flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <img 
          :src="post.author.avatar" 
          :alt="post.author.name"
          class="w-20 h-20 rounded-2xl object-contain p-1 border-2 border-brand-teal/40 bg-white shrink-0 shadow-soft"
        />
        <div class="flex-grow text-center sm:text-left">
          <div class="text-xs font-bold uppercase tracking-wider text-brand-teal mb-1">About the Author</div>
          <h3 class="text-xl font-bold text-brand-charcoal mb-1">{{ post.author.name }}</h3>
          <p class="text-xs font-semibold text-brand-teal-dark mb-2">{{ post.author.role }}</p>
          <p class="text-xs sm:text-sm text-brand-muted leading-relaxed mb-4">
            {{ post.author.bio || 'Specialist Orthodontist dedicated to gentle, modern teeth straightening, digital aligners, and aesthetic smile rehabilitation at OneCare Aesthetix Clinic, Kothrud, Pune.' }}
          </p>
          <div class="flex flex-wrap items-center justify-center sm:justify-start gap-3">
            <a 
              href="/#appointment"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-teal-dark hover:bg-brand-teal text-white text-xs font-bold transition-all shadow-soft"
            >
              <CalendarCheck class="w-3.5 h-3.5" />
              <span>Book Consultation with Dr. Achal</span>
            </a>
            <a 
              :href="siteConfig.contact.whatsappLink"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-mint text-brand-teal-dark border border-brand-teal/30 hover:bg-brand-teal/20 text-xs font-semibold transition-all"
            >
              <MessageCircle class="w-3.5 h-3.5 text-brand-teal" />
              <span>Ask on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Related Clinical Articles -->
      <div v-if="relatedPosts.length > 0" class="mt-14 sm:mt-16">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl sm:text-2xl font-bold text-brand-charcoal">Related Clinical Guides</h3>
          <RouterLink to="/blog" class="text-xs font-bold text-brand-teal-dark hover:text-brand-teal">
            View All →
          </RouterLink>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <article 
            v-for="rel in relatedPosts" 
            :key="rel.id"
            class="group bg-white rounded-2xl overflow-hidden border border-brand-border shadow-soft hover:shadow-card transition-all p-4 flex flex-col justify-between"
          >
            <div>
              <div class="relative bg-brand-mint/40 rounded-xl overflow-hidden aspect-[16/10] mb-3">
                <img :src="rel.image" :alt="rel.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <span class="text-[10px] font-bold text-brand-teal-dark uppercase tracking-wider block mb-1">
                {{ rel.categoryLabel }}
              </span>
              <h4 class="text-sm font-bold text-brand-charcoal group-hover:text-brand-teal transition-colors line-clamp-2 mb-2">
                <RouterLink :to="'/blog/' + rel.slug">
                  {{ rel.title }}
                </RouterLink>
              </h4>
              <p class="text-xs text-brand-muted line-clamp-2 mb-3">
                {{ rel.description }}
              </p>
            </div>
            
            <RouterLink 
              :to="'/blog/' + rel.slug"
              class="text-xs font-bold text-brand-teal-dark hover:text-brand-teal inline-flex items-center gap-1 mt-2"
            >
              <span>Read article</span>
              <span>→</span>
            </RouterLink>
          </article>
        </div>
      </div>

    </article>
  </div>
</template>
