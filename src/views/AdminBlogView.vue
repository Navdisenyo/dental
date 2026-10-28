<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Upload, 
  Image as ImageIcon, 
  Tag, 
  Check, 
  X, 
  Lock, 
  Unlock, 
  FileText, 
  Sparkles, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  ArrowLeft,
  RotateCcw,
  Download,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  User,
  Key,
  LogOut,
  EyeOff
} from 'lucide-vue-next'
import { useBlogStore, generateSlug, calculateReadingTime } from '../services/blogStore'
import type { BlogPost } from '../types/blog'

const blogStore = useBlogStore()

// Pre-defined Admin Credentials (Cryptographic SHA-256 Hash of Password)
const AUTH_STORAGE_KEY = 'onecare_admin_auth_user'
const VALID_USERNAME = 'Ananda'
// One-way SHA-256 hash of authorized password - plaintext is NEVER exposed in the codebase
const PASSWORD_SHA256 = '8f6ad288c857911a15e6c7794373d02b71f8819e552bf45fc97d983ac3e2c6a5'

// Cryptographic SHA-256 helper using standard browser Web Crypto API
async function hashSHA256(text: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(text)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

// Check existing session in sessionStorage
const storedUser = typeof window !== 'undefined' ? sessionStorage.getItem(AUTH_STORAGE_KEY) : null
const isAuthenticated = ref(storedUser === VALID_USERNAME)

const loginUsername = ref('')
const loginPassword = ref('')
const showPassword = ref(false)
const authError = ref('')
const isLoggingIn = ref(false)

async function handleLogin() {
  authError.value = ''
  isLoggingIn.value = true

  try {
    const u = loginUsername.value.trim()
    const p = loginPassword.value

    if (!u || !p) {
      authError.value = 'Please enter both username and password.'
      isLoggingIn.value = false
      return
    }

    const inputPasswordHash = await hashSHA256(p)

    if (u === VALID_USERNAME && inputPasswordHash === PASSWORD_SHA256) {
      isAuthenticated.value = true
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(AUTH_STORAGE_KEY, VALID_USERNAME)
      }
      loginUsername.value = ''
      loginPassword.value = ''
      authError.value = ''
      showToast('Welcome, Ananda! You have logged in successfully.')
    } else {
      authError.value = 'Invalid username or password. Access denied.'
    }
  } catch (err) {
    console.error('Cryptographic verification failed:', err)
    authError.value = 'Authentication error occurred. Please try again.'
  } finally {
    isLoggingIn.value = false
  }
}

function handleLogout() {
  isAuthenticated.value = false
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(AUTH_STORAGE_KEY)
  }
  showToast('You have been logged out.')
}

// Search and Filter in Admin
const searchQuery = ref('')
const filterStatus = ref<'all' | 'published' | 'draft'>('all')

const filteredAdminPosts = computed(() => {
  let list = blogStore.allPosts.value

  if (filterStatus.value !== 'all') {
    list = list.filter(p => p.status === filterStatus.value)
  }

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim()
    list = list.filter(p => 
      p.title.toLowerCase().includes(q) || 
      p.keywords.some(k => k.toLowerCase().includes(q)) ||
      p.categoryLabel.toLowerCase().includes(q)
    )
  }

  return list
})

// Editor Modal State
const isEditorOpen = ref(false)
const isEditing = ref(false)
const activeTab = ref<'write' | 'preview'>('write')
const toastMessage = ref('')
const keywordInput = ref('')

// Form State
const formData = ref<{
  id?: string
  title: string
  slug: string
  category: string
  categoryLabel: string
  keywords: string[]
  description: string
  image: string
  imageCaption: string
  content: string
  status: 'published' | 'draft'
  featured: boolean
  authorName: string
  authorRole: string
}>({
  title: '',
  slug: '',
  category: 'orthodontics',
  categoryLabel: 'Orthodontics & Arch Leveling',
  keywords: [],
  description: '',
  image: '',
  imageCaption: '',
  content: '',
  status: 'published',
  featured: false,
  authorName: 'Dr. Achal Agarwal',
  authorRole: 'MDS Orthodontist & Dentofacial Orthopaedist'
})

const categoryOptions = [
  { value: 'orthodontics', label: 'Orthodontics & Arch Leveling' },
  { value: 'aligners', label: 'Clear Aligners & Invisible Braces' },
  { value: 'smile-design', label: 'Smile Design & Gap Closure' },
  { value: 'dentofacial', label: 'Dentofacial Orthopaedics' },
  { value: 'pediatric', label: 'Pediatric Dental Health' },
  { value: 'oral-health', label: 'Preventative Oral Care & Hygiene' }
]

const suggestedKeywords = [
  'Clear Aligners', 
  'Orthodontist Pune', 
  'Arch Expansion', 
  'Teeth Gap Closure', 
  'Diastema', 
  'Braces Cost', 
  'Smile Makeover', 
  'Jaw Alignment', 
  'Dr. Achal Agarwal',
  'Dentofacial Orthopaedics'
]

// Open Creator
function openCreateModal() {
  isEditing.value = false
  isEditorOpen.value = true
  activeTab.value = 'write'
  formData.value = {
    title: '',
    slug: '',
    category: 'orthodontics',
    categoryLabel: 'Orthodontics & Arch Leveling',
    keywords: ['Orthodontics', 'Smile Care'],
    description: '',
    image: '/assets/transformations/case-4-arch-expansion.jpg',
    imageCaption: '',
    content: `## Introduction
Write an engaging introduction explaining the dental or aesthetic topic for your patients...

### Key Clinical Benefits
- Gentle, predictable treatment progress
- Enhanced smile display and tooth proportion
- Long-term stable oral health

### Treatment Process
Explain what patients can expect during consultations, digital scans, and milestone visits.

> "A beautiful, healthy smile improves confidence, chewing comfort, and overall wellness."

### Next Steps for Patients
Encourage readers to schedule a personalized clinical assessment at OneCare Aesthetix Clinic.`,
    status: 'published',
    featured: false,
    authorName: 'Dr. Achal Agarwal',
    authorRole: 'MDS Orthodontist & Dentofacial Orthopaedist'
  }
}

// Open Editor for existing post
function openEditModal(post: BlogPost) {
  isEditing.value = true
  isEditorOpen.value = true
  activeTab.value = 'write'
  formData.value = {
    id: post.id,
    title: post.title,
    slug: post.slug,
    category: post.category,
    categoryLabel: post.categoryLabel,
    keywords: [...post.keywords],
    description: post.description,
    image: post.image,
    imageCaption: post.imageCaption || '',
    content: post.content,
    status: post.status,
    featured: post.featured ?? false,
    authorName: post.author?.name || 'Dr. Achal Agarwal',
    authorRole: post.author?.role || 'MDS Orthodontist & Dentofacial Orthopaedist'
  }
}

function onCategoryChange() {
  const match = categoryOptions.find(c => c.value === formData.value.category)
  if (match) {
    formData.value.categoryLabel = match.label
  }
}

function handleAutoSlug() {
  if (formData.value.title) {
    formData.value.slug = generateSlug(formData.value.title)
  }
}

// Keywords handler
function addKeyword() {
  const trimmed = keywordInput.value.trim()
  if (trimmed) {
    // allow comma separated
    const parts = trimmed.split(',').map(p => p.trim()).filter(Boolean)
    parts.forEach(part => {
      if (!formData.value.keywords.includes(part)) {
        formData.value.keywords.push(part)
      }
    })
    keywordInput.value = ''
  }
}

function removeKeyword(index: number) {
  formData.value.keywords.splice(index, 1)
}

function addSuggestedKeyword(kw: string) {
  if (!formData.value.keywords.includes(kw)) {
    formData.value.keywords.push(kw)
  }
}

// File Upload Handler (reads image file directly as Base64)
const imageUploadError = ref('')

function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  if (!file.type.startsWith('image/')) {
    imageUploadError.value = 'Please select a valid image file (JPG, PNG, WebP).'
    return
  }

  // Check file size (recommend < 4MB for localStorage)
  if (file.size > 5 * 1024 * 1024) {
    imageUploadError.value = 'Image size is large (>5MB). Consider compressing for optimal loading.'
  } else {
    imageUploadError.value = ''
  }

  const reader = new FileReader()
  reader.onload = (e) => {
    if (e.target?.result) {
      formData.value.image = e.target.result as string
      showToast('Image uploaded and preview ready!')
    }
  }
  reader.readAsDataURL(file)
}

// Quick Preset Images from clinic
const presetImages = [
  { label: 'Arch Expansion Result', url: '/assets/transformations/case-4-arch-expansion.jpg' },
  { label: 'Braces Alignment Case', url: '/assets/transformations/case-1-braces-alignment.jpg' },
  { label: 'Smile Aesthetics Case', url: '/assets/transformations/case-2-smile-aesthetics.jpg' },
  { label: 'Diastema Gap Closure', url: '/assets/transformations/case-3-gap-closure-diastema.jpg' },
  { label: 'Complex Orthodontics', url: '/assets/transformations/case-5-complex-orthodontics.jpg' },
  { label: 'Profile Orthopaedics', url: '/assets/transformations/case-6-profile-orthopaedics.jpg' }
]

function selectPresetImage(url: string) {
  formData.value.image = url
  showToast('Preset image selected!')
}

// Markdown formatting helper buttons
function insertMarkdown(tag: string, placeholder: string = 'text') {
  const textarea = document.getElementById('blog-content-textarea') as HTMLTextAreaElement
  if (!textarea) return

  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const text = formData.value.content
  const selectedText = text.substring(start, end) || placeholder

  let replacement = ''
  if (tag === 'h2') replacement = `\n## ${selectedText}\n`
  else if (tag === 'h3') replacement = `\n### ${selectedText}\n`
  else if (tag === 'bold') replacement = `**${selectedText}**`
  else if (tag === 'italic') replacement = `*${selectedText}*`
  else if (tag === 'quote') replacement = `\n> "${selectedText}"\n`
  else if (tag === 'list') replacement = `\n- ${selectedText}\n- Next clinical point\n`

  formData.value.content = text.substring(0, start) + replacement + text.substring(end)
}

// Save Post
function handleSave() {
  if (!formData.value.title.trim()) {
    alert('Please enter a blog title.')
    return
  }
  if (!formData.value.description.trim()) {
    alert('Please enter a short description/summary for the article.')
    return
  }
  if (!formData.value.content.trim()) {
    alert('Please write some content for the article.')
    return
  }
  if (!formData.value.slug.trim()) {
    handleAutoSlug()
  }

  blogStore.savePost({
    id: formData.value.id,
    title: formData.value.title,
    slug: formData.value.slug,
    category: formData.value.category,
    categoryLabel: formData.value.categoryLabel,
    keywords: formData.value.keywords,
    description: formData.value.description,
    image: formData.value.image || '/assets/transformations/case-4-arch-expansion.jpg',
    imageCaption: formData.value.imageCaption,
    content: formData.value.content,
    status: formData.value.status,
    featured: formData.value.featured,
    author: {
      ...blogStore.defaultAuthor,
      name: formData.value.authorName,
      role: formData.value.authorRole
    }
  })

  isEditorOpen.value = false
  showToast(isEditing.value ? 'Article updated successfully!' : 'New article published successfully!')
}

// Delete Post
function confirmDelete(id: string, title: string) {
  if (confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) {
    blogStore.deletePost(id)
    showToast('Article deleted.')
  }
}

// Reset to Defaults
function handleResetDefaults() {
  if (confirm('Reset all blog articles to the original clinic sample guides? Your custom edits will be replaced.')) {
    blogStore.resetToDefaults()
    showToast('Blog articles reset to clinic defaults.')
  }
}

// Toast helper
function showToast(msg: string) {
  toastMessage.value = msg
  setTimeout(() => {
    toastMessage.value = ''
  }, 3500)
}

// Stats
const totalCount = computed(() => blogStore.allPosts.value.length)
const publishedCount = computed(() => blogStore.publishedPosts.value.length)
const draftCount = computed(() => totalCount.value - publishedCount.value)
</script>

<template>
  <div class="bg-brand-ivory min-h-screen py-10 sm:py-14">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Toast Alert Notification -->
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-2"
      >
        <div 
          v-if="toastMessage" 
          class="fixed bottom-6 right-6 z-50 bg-brand-charcoal text-white px-5 py-3 rounded-2xl shadow-float flex items-center gap-3 border border-brand-teal/40 text-sm font-semibold"
        >
          <CheckCircle2 class="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{{ toastMessage }}</span>
        </div>
      </transition>

      <!-- Secure Authentication Gate (Requires pre-defined Username & Password) -->
      <div v-if="!isAuthenticated" class="max-w-md mx-auto py-12 sm:py-20">
        <div class="bg-white rounded-3xl p-8 sm:p-10 border border-brand-border shadow-card relative overflow-hidden">
          
          <!-- Top clinic branding badge -->
          <div class="text-center mb-6">
            <div class="w-16 h-16 rounded-2xl bg-brand-mint text-brand-teal-dark flex items-center justify-center mx-auto mb-4 border border-brand-teal/20 shadow-soft">
              <Lock class="w-8 h-8 text-brand-teal-dark" />
            </div>
            <span class="px-3 py-1 rounded-full bg-brand-mint text-brand-teal-dark text-[11px] font-bold uppercase tracking-wider">
              Restricted Area
            </span>
            <h2 class="text-2xl font-extrabold text-brand-charcoal mt-2 mb-1">
              Admin Login Portal
            </h2>
            <p class="text-xs text-brand-muted leading-relaxed">
              Authorized clinical administration access only. Please sign in with your credentials.
            </p>
          </div>

          <!-- Error Alert Banner -->
          <div v-if="authError" class="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
            <AlertCircle class="w-4 h-4 text-red-600 shrink-0" />
            <span>{{ authError }}</span>
          </div>

          <!-- Login Form -->
          <form @submit.prevent="handleLogin" class="space-y-4">
            <!-- Username Input -->
            <div class="space-y-1.5 text-left">
              <label class="text-xs font-bold text-brand-charcoal uppercase tracking-wider">
                Username
              </label>
              <div class="relative">
                <User class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
                <input 
                  v-model="loginUsername"
                  type="text"
                  required
                  autocomplete="username"
                  placeholder="Enter admin username"
                  class="w-full pl-10 pr-4 py-3 rounded-xl border border-brand-border text-sm text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all"
                />
              </div>
            </div>

            <!-- Password Input -->
            <div class="space-y-1.5 text-left">
              <label class="text-xs font-bold text-brand-charcoal uppercase tracking-wider">
                Password
              </label>
              <div class="relative">
                <Key class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
                <input 
                  v-model="loginPassword"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  autocomplete="current-password"
                  placeholder="Enter admin password"
                  class="w-full pl-10 pr-11 py-3 rounded-xl border border-brand-border text-sm text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all"
                />
                <button 
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-charcoal"
                  :title="showPassword ? 'Hide password' : 'Show password'"
                >
                  <EyeOff v-if="showPassword" class="w-4 h-4" />
                  <Eye v-else class="w-4 h-4" />
                </button>
              </div>
            </div>

            <!-- Submit Button -->
            <button 
              type="submit"
              :disabled="isLoggingIn"
              class="w-full py-3.5 rounded-xl bg-brand-teal-dark hover:bg-brand-teal text-white text-sm font-bold shadow-soft hover:shadow-card transition-all flex items-center justify-center gap-2 mt-2"
            >
              <Unlock class="w-4 h-4" />
              <span>Log In to Admin Panel</span>
            </button>
          </form>

          <!-- Back to main site link -->
          <div class="mt-6 pt-4 border-t border-brand-border/60 text-center">
            <RouterLink to="/" class="text-xs text-brand-muted hover:text-brand-teal font-medium inline-flex items-center gap-1">
              <ArrowLeft class="w-3.5 h-3.5" />
              <span>Back to Clinic Website</span>
            </RouterLink>
          </div>

        </div>
      </div>

      <!-- Main Authenticated Admin Workspace -->
      <div v-else class="space-y-8">
        
        <!-- Header Bar -->
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-brand-border">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="px-2.5 py-0.5 rounded-md bg-brand-mint text-brand-teal-dark text-xs font-bold">
                Admin Management Portal
              </span>
              <span class="text-xs text-emerald-600 font-medium flex items-center gap-1">
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Active
              </span>
            </div>
            <h1 class="text-2xl sm:text-3xl font-extrabold text-brand-charcoal">
              Blog & Clinical Article Manager
            </h1>
            <p class="text-xs sm:text-sm text-brand-muted">
              Create, edit, upload images, and manage SEO keywords for OneCare Aesthetix Clinic articles.
            </p>
          </div>

          <div class="flex flex-wrap items-center gap-3">
            <!-- Logged In User Pill -->
            <div class="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-brand-border text-xs text-brand-charcoal shadow-2xs">
              <div class="w-6 h-6 rounded-full bg-brand-teal text-white flex items-center justify-center font-bold text-[11px]">
                A
              </div>
              <span class="font-bold">Ananda</span>
              <span class="text-[10px] text-brand-muted hidden sm:inline">(Admin)</span>
            </div>

            <RouterLink 
              to="/blog"
              class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-brand-mint text-brand-charcoal border border-brand-border text-xs font-semibold transition-all shadow-xs"
            >
              <Eye class="w-4 h-4 text-brand-teal" />
              <span>View Public Blog</span>
            </RouterLink>

            <button 
              @click="openCreateModal"
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-teal-dark hover:bg-brand-teal text-white text-xs sm:text-sm font-bold shadow-soft hover:shadow-card transition-all"
            >
              <Plus class="w-4 h-4" />
              <span>Upload / New Article</span>
            </button>

            <!-- Logout Button -->
            <button 
              @click="handleLogout"
              class="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-white hover:bg-red-50 text-brand-muted hover:text-red-600 border border-brand-border text-xs font-semibold transition-all shadow-xs"
              title="Sign out of admin session"
            >
              <LogOut class="w-3.5 h-3.5" />
              <span class="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        <!-- Dashboard Stats Grid -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div class="bg-white p-5 rounded-2xl border border-brand-border shadow-soft flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-brand-mint text-brand-teal-dark flex items-center justify-center shrink-0">
              <FileText class="w-6 h-6" />
            </div>
            <div>
              <div class="text-2xl font-black text-brand-charcoal">{{ totalCount }}</div>
              <div class="text-xs text-brand-muted font-medium">Total Articles</div>
            </div>
          </div>

          <div class="bg-white p-5 rounded-2xl border border-brand-border shadow-soft flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <CheckCircle2 class="w-6 h-6" />
            </div>
            <div>
              <div class="text-2xl font-black text-brand-charcoal">{{ publishedCount }}</div>
              <div class="text-xs text-brand-muted font-medium">Published Live</div>
            </div>
          </div>

          <div class="bg-white p-5 rounded-2xl border border-brand-border shadow-soft flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <Clock class="w-6 h-6" />
            </div>
            <div>
              <div class="text-2xl font-black text-brand-charcoal">{{ draftCount }}</div>
              <div class="text-xs text-brand-muted font-medium">Drafts / In Progress</div>
            </div>
          </div>

          <div class="bg-white p-5 rounded-2xl border border-brand-border shadow-soft flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
              <Tag class="w-6 h-6" />
            </div>
            <div>
              <div class="text-2xl font-black text-brand-charcoal">{{ categoryOptions.length }}</div>
              <div class="text-xs text-brand-muted font-medium">Clinical Topics</div>
            </div>
          </div>
        </div>

        <!-- Filter & Search Bar -->
        <div class="bg-white p-4 rounded-2xl border border-brand-border shadow-soft flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="relative w-full sm:w-96">
            <Search class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
            <input 
              v-model="searchQuery"
              type="text"
              placeholder="Search by title, category, keywords..."
              class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-brand-border text-xs sm:text-sm text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-teal"
            />
          </div>

          <div class="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            <div class="flex items-center gap-1 bg-brand-ivory p-1 rounded-xl border border-brand-border text-xs">
              <button 
                @click="filterStatus = 'all'"
                :class="['px-3 py-1.5 rounded-lg font-semibold transition-all', filterStatus === 'all' ? 'bg-white shadow-xs text-brand-charcoal' : 'text-brand-muted']"
              >
                All ({{ totalCount }})
              </button>
              <button 
                @click="filterStatus = 'published'"
                :class="['px-3 py-1.5 rounded-lg font-semibold transition-all', filterStatus === 'published' ? 'bg-white shadow-xs text-brand-charcoal' : 'text-brand-muted']"
              >
                Published ({{ publishedCount }})
              </button>
              <button 
                @click="filterStatus = 'draft'"
                :class="['px-3 py-1.5 rounded-lg font-semibold transition-all', filterStatus === 'draft' ? 'bg-white shadow-xs text-brand-charcoal' : 'text-brand-muted']"
              >
                Drafts ({{ draftCount }})
              </button>
            </div>

            <button 
              @click="handleResetDefaults"
              title="Reset all articles to original clinic samples"
              class="p-2.5 rounded-xl bg-white hover:bg-red-50 text-brand-muted hover:text-red-600 border border-brand-border transition-colors text-xs font-semibold flex items-center gap-1"
            >
              <RotateCcw class="w-3.5 h-3.5" />
              <span class="hidden md:inline">Reset Defaults</span>
            </button>
          </div>
        </div>

        <!-- Articles Table / List View -->
        <div class="bg-white rounded-3xl border border-brand-border shadow-soft overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-brand-ivory/60 border-b border-brand-border text-[11px] font-bold text-brand-muted uppercase tracking-wider">
                  <th class="py-4 px-6">Article & Image</th>
                  <th class="py-4 px-6">Category</th>
                  <th class="py-4 px-6">Keywords</th>
                  <th class="py-4 px-6">Status & Date</th>
                  <th class="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-brand-border text-xs sm:text-sm">
                <tr v-if="filteredAdminPosts.length === 0">
                  <td colspan="5" class="py-12 text-center text-brand-muted">
                    No articles found matching your query.
                  </td>
                </tr>

                <tr 
                  v-for="post in filteredAdminPosts" 
                  :key="post.id"
                  class="hover:bg-brand-mint/20 transition-colors group"
                >
                  <!-- Image + Title -->
                  <td class="py-4 px-6">
                    <div class="flex items-center gap-3">
                      <img 
                        :src="post.image" 
                        :alt="post.title"
                        class="w-16 h-12 rounded-xl object-cover border border-brand-border shrink-0 bg-brand-mint"
                      />
                      <div class="max-w-xs sm:max-w-md">
                        <div class="font-bold text-brand-charcoal group-hover:text-brand-teal transition-colors line-clamp-1">
                          {{ post.title }}
                        </div>
                        <div class="text-[11px] text-brand-muted font-mono truncate">
                          /blog/{{ post.slug }}
                        </div>
                      </div>
                    </div>
                  </td>

                  <!-- Category -->
                  <td class="py-4 px-6 whitespace-nowrap">
                    <span class="px-2.5 py-1 rounded-md bg-brand-mint text-brand-teal-dark text-xs font-semibold">
                      {{ post.categoryLabel }}
                    </span>
                  </td>

                  <!-- Keywords -->
                  <td class="py-4 px-6">
                    <div class="flex flex-wrap gap-1 max-w-xs">
                      <span 
                        v-for="kw in post.keywords.slice(0, 3)"
                        :key="kw"
                        class="px-2 py-0.5 rounded text-[10px] bg-brand-ivory border border-brand-border text-brand-charcoal"
                      >
                        {{ kw }}
                      </span>
                      <span v-if="post.keywords.length > 3" class="text-[10px] text-brand-muted self-center">
                        +{{ post.keywords.length - 3 }}
                      </span>
                    </div>
                  </td>

                  <!-- Status & Date -->
                  <td class="py-4 px-6 whitespace-nowrap">
                    <div class="flex flex-col gap-1">
                      <span 
                        :class="[
                          'inline-flex items-center gap-1 w-max px-2.5 py-0.5 rounded-full text-[11px] font-bold',
                          post.status === 'published' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-amber-100 text-amber-800'
                        ]"
                      >
                        <span :class="['w-1.5 h-1.5 rounded-full', post.status === 'published' ? 'bg-emerald-600' : 'bg-amber-600']"></span>
                        {{ post.status === 'published' ? 'Published' : 'Draft' }}
                      </span>
                      <span class="text-[11px] text-brand-muted">{{ post.publishedAt }}</span>
                    </div>
                  </td>

                  <!-- Actions -->
                  <td class="py-4 px-6 text-right whitespace-nowrap">
                    <div class="flex items-center justify-end gap-2">
                      <RouterLink 
                        :to="'/blog/' + post.slug"
                        target="_blank"
                        class="p-2 rounded-xl text-brand-muted hover:text-brand-teal hover:bg-brand-mint transition-colors"
                        title="View live article"
                      >
                        <Eye class="w-4 h-4" />
                      </RouterLink>

                      <button 
                        @click="openEditModal(post)"
                        class="p-2 rounded-xl text-brand-muted hover:text-brand-charcoal hover:bg-brand-mint transition-colors"
                        title="Edit article"
                      >
                        <Edit class="w-4 h-4" />
                      </button>

                      <button 
                        @click="confirmDelete(post.id, post.title)"
                        class="p-2 rounded-xl text-brand-muted hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete article"
                      >
                        <Trash2 class="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <!-- ============================================== -->
      <!-- ARTICLE EDITOR MODAL / DRAWER                  -->
      <!-- ============================================== -->
      <div 
        v-if="isEditorOpen"
        class="fixed inset-0 z-50 overflow-y-auto bg-brand-charcoal/70 backdrop-blur-sm flex justify-center p-3 sm:p-6"
        @click.self="isEditorOpen = false"
      >
        <div class="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-white/20 flex flex-col my-auto max-h-[92vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          <!-- Modal Header -->
          <div class="p-5 sm:p-6 border-b border-brand-border flex items-center justify-between bg-brand-ivory/50">
            <div>
              <span class="text-xs font-bold uppercase tracking-wider text-brand-teal">
                {{ isEditing ? 'Edit Existing Article' : 'Upload & Publish New Article' }}
              </span>
              <h2 class="text-xl sm:text-2xl font-extrabold text-brand-charcoal">
                {{ formData.title || 'Untitled Article' }}
              </h2>
            </div>

            <!-- Tab Switcher (Write vs Preview) -->
            <div class="flex items-center gap-3">
              <div class="flex bg-white p-1 rounded-xl border border-brand-border text-xs font-semibold">
                <button 
                  @click="activeTab = 'write'"
                  :class="['px-3 py-1.5 rounded-lg transition-all', activeTab === 'write' ? 'bg-brand-teal-dark text-white' : 'text-brand-muted hover:text-brand-charcoal']"
                >
                  Write & Upload
                </button>
                <button 
                  @click="activeTab = 'preview'"
                  :class="['px-3 py-1.5 rounded-lg transition-all', activeTab === 'preview' ? 'bg-brand-teal-dark text-white' : 'text-brand-muted hover:text-brand-charcoal']"
                >
                  Live Preview
                </button>
              </div>

              <button 
                @click="isEditorOpen = false"
                class="p-2 rounded-xl text-brand-muted hover:text-brand-charcoal hover:bg-brand-mint transition-colors"
              >
                <X class="w-5 h-5" />
              </button>
            </div>
          </div>

          <!-- Modal Body (Write Tab) -->
          <div v-show="activeTab === 'write'" class="p-6 sm:p-8 overflow-y-auto space-y-6 flex-grow">
            
            <!-- 1. Article Title & Slug -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="md:col-span-2 space-y-1.5">
                <label class="text-xs font-bold text-brand-charcoal uppercase tracking-wider flex items-center justify-between">
                  <span>Blog Title *</span>
                  <span class="text-[11px] text-brand-muted font-normal">Appears as primary H1 headline</span>
                </label>
                <input 
                  v-model="formData.title"
                  type="text"
                  @blur="handleAutoSlug"
                  placeholder="e.g. Modern Clear Aligners vs. Braces in Pune..."
                  class="w-full px-4 py-3 rounded-xl border border-brand-border text-sm font-semibold text-brand-charcoal focus:ring-2 focus:ring-brand-teal focus:outline-none"
                />
              </div>

              <div class="space-y-1.5">
                <label class="text-xs font-bold text-brand-charcoal uppercase tracking-wider flex items-center justify-between">
                  <span>URL Slug *</span>
                  <button type="button" @click="handleAutoSlug" class="text-[11px] text-brand-teal font-medium hover:underline">Auto-Gen</button>
                </label>
                <input 
                  v-model="formData.slug"
                  type="text"
                  placeholder="clear-aligners-pune"
                  class="w-full px-4 py-3 rounded-xl border border-brand-border text-xs font-mono text-brand-charcoal focus:ring-2 focus:ring-brand-teal focus:outline-none"
                />
              </div>
            </div>

            <!-- 2. Category & Keywords -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Category -->
              <div class="space-y-1.5">
                <label class="text-xs font-bold text-brand-charcoal uppercase tracking-wider">
                  Clinical Category *
                </label>
                <select 
                  v-model="formData.category" 
                  @change="onCategoryChange"
                  class="w-full px-4 py-3 rounded-xl border border-brand-border text-xs sm:text-sm text-brand-charcoal bg-white focus:ring-2 focus:ring-brand-teal focus:outline-none"
                >
                  <option v-for="cat in categoryOptions" :key="cat.value" :value="cat.value">
                    {{ cat.label }}
                  </option>
                </select>
              </div>

              <!-- Keywords Tag Input -->
              <div class="space-y-1.5">
                <label class="text-xs font-bold text-brand-charcoal uppercase tracking-wider flex items-center justify-between">
                  <span>Keywords & Tags *</span>
                  <span class="text-[11px] text-brand-muted font-normal">Press Enter or comma</span>
                </label>
                <div class="flex items-center gap-2">
                  <input 
                    v-model="keywordInput"
                    type="text"
                    @keydown.enter.prevent="addKeyword"
                    @keydown.comma.prevent="addKeyword"
                    placeholder="Type keyword and press Enter..."
                    class="w-full px-4 py-2.5 rounded-xl border border-brand-border text-xs text-brand-charcoal focus:ring-2 focus:ring-brand-teal focus:outline-none"
                  />
                  <button 
                    type="button" 
                    @click="addKeyword"
                    class="px-4 py-2.5 rounded-xl bg-brand-mint text-brand-teal-dark font-bold text-xs hover:bg-brand-teal hover:text-white transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            <!-- Active Keywords Chips & Suggestions -->
            <div class="p-3 rounded-xl bg-brand-ivory border border-brand-border/60">
              <div class="text-[11px] font-bold text-brand-muted uppercase mb-2">Active Keywords:</div>
              <div class="flex flex-wrap gap-1.5 mb-3">
                <span 
                  v-for="(kw, idx) in formData.keywords" 
                  :key="kw"
                  class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-brand-teal/30 text-xs font-medium text-brand-teal-dark"
                >
                  <span>{{ kw }}</span>
                  <button type="button" @click="removeKeyword(idx)" class="text-brand-muted hover:text-red-600 font-bold">×</button>
                </span>
                <span v-if="formData.keywords.length === 0" class="text-xs text-brand-muted italic">
                  No keywords added yet. Add tags above.
                </span>
              </div>

              <div class="text-[11px] font-bold text-brand-muted uppercase mb-1.5">Suggested Tags (Click to add):</div>
              <div class="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  v-for="sug in suggestedKeywords"
                  :key="sug"
                  @click="addSuggestedKeyword(sug)"
                  class="px-2 py-0.5 rounded text-[10px] bg-white hover:bg-brand-mint border border-brand-border text-brand-charcoal transition-colors"
                >
                  + {{ sug }}
                </button>
              </div>
            </div>

            <!-- 3. Blog Description / Summary -->
            <div class="space-y-1.5">
              <label class="text-xs font-bold text-brand-charcoal uppercase tracking-wider flex items-center justify-between">
                <span>Article Description & Meta Excerpt *</span>
                <span class="text-[11px] text-brand-muted">{{ formData.description.length }} characters</span>
              </label>
              <textarea 
                v-model="formData.description"
                rows="2"
                placeholder="A compelling, clear 1-3 sentence summary that explains what patients will learn in this clinical guide..."
                class="w-full px-4 py-2.5 rounded-xl border border-brand-border text-xs sm:text-sm text-brand-charcoal focus:ring-2 focus:ring-brand-teal focus:outline-none"
              ></textarea>
            </div>

            <!-- 4. Image Upload & Selection -->
            <div class="space-y-3 p-4 sm:p-5 rounded-2xl bg-brand-ivory/80 border border-brand-border">
              <div class="flex items-center justify-between">
                <div>
                  <label class="text-xs font-bold text-brand-charcoal uppercase tracking-wider flex items-center gap-1.5">
                    <ImageIcon class="w-4 h-4 text-brand-teal" />
                    <span>Upload Article Cover Image *</span>
                  </label>
                  <p class="text-[11px] text-brand-muted">
                    Upload an image directly from your computer or choose from clinic presets.
                  </p>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                <!-- Image Preview Area -->
                <div class="sm:col-span-1 relative aspect-[16/10] bg-white rounded-2xl overflow-hidden border border-brand-border flex items-center justify-center shadow-soft">
                  <img 
                    v-if="formData.image" 
                    :src="formData.image" 
                    alt="Preview"
                    class="w-full h-full object-cover"
                  />
                  <div v-else class="text-center p-3 text-brand-muted text-xs">
                    <ImageIcon class="w-8 h-8 mx-auto mb-1 opacity-40" />
                    <span>No image selected</span>
                  </div>
                </div>

                <!-- Upload Actions -->
                <div class="sm:col-span-2 space-y-3">
                  <!-- File input -->
                  <div>
                    <label class="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-teal text-white hover:bg-brand-teal-dark transition-all text-xs font-bold shadow-soft">
                      <Upload class="w-4 h-4" />
                      <span>Choose Image from Device</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        class="hidden" 
                        @change="handleFileUpload" 
                      />
                    </label>
                    <span v-if="imageUploadError" class="block text-xs text-red-600 mt-1 font-semibold">
                      {{ imageUploadError }}
                    </span>
                  </div>

                  <!-- Direct URL Input -->
                  <div class="space-y-1">
                    <span class="text-[11px] text-brand-muted font-medium">Or paste an Image URL / Path:</span>
                    <input 
                      v-model="formData.image"
                      type="text"
                      placeholder="https://... or /assets/transformations/..."
                      class="w-full px-3 py-1.5 rounded-lg border border-brand-border text-xs text-brand-charcoal focus:ring-2 focus:ring-brand-teal focus:outline-none"
                    />
                  </div>

                  <!-- Preset Case Photos -->
                  <div>
                    <span class="text-[11px] text-brand-muted font-medium block mb-1">Or choose a verified case photo:</span>
                    <div class="flex flex-wrap gap-1.5">
                      <button 
                        type="button"
                        v-for="preset in presetImages"
                        :key="preset.label"
                        @click="selectPresetImage(preset.url)"
                        class="px-2 py-1 rounded bg-white hover:bg-brand-mint border border-brand-border text-[10px] text-brand-charcoal transition-colors"
                      >
                        {{ preset.label }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Caption -->
              <div>
                <input 
                  v-model="formData.imageCaption"
                  type="text"
                  placeholder="Optional image caption / credit (e.g. Clinical Before and After case photo)"
                  class="w-full px-3 py-2 rounded-xl border border-brand-border text-xs text-brand-charcoal focus:outline-none"
                />
              </div>
            </div>

            <!-- 5. Content Editor with Formatting Toolbar -->
            <div class="space-y-2">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <label class="text-xs font-bold text-brand-charcoal uppercase tracking-wider">
                  Article Body Content *
                </label>
                
                <!-- Quick Formatting Toolbar -->
                <div class="flex flex-wrap items-center gap-1 bg-brand-ivory p-1 rounded-xl border border-brand-border text-xs">
                  <button type="button" @click="insertMarkdown('h2', 'Heading 2')" class="px-2 py-1 hover:bg-white rounded font-bold">H2</button>
                  <button type="button" @click="insertMarkdown('h3', 'Heading 3')" class="px-2 py-1 hover:bg-white rounded font-bold">H3</button>
                  <button type="button" @click="insertMarkdown('bold', 'Bold text')" class="px-2 py-1 hover:bg-white rounded font-bold">B</button>
                  <button type="button" @click="insertMarkdown('italic', 'Italic text')" class="px-2 py-1 hover:bg-white rounded italic">I</button>
                  <button type="button" @click="insertMarkdown('quote', 'Clinical quote')" class="px-2 py-1 hover:bg-white rounded">Quote</button>
                  <button type="button" @click="insertMarkdown('list', 'List item')" class="px-2 py-1 hover:bg-white rounded">• List</button>
                </div>
              </div>

              <textarea 
                id="blog-content-textarea"
                v-model="formData.content"
                rows="10"
                placeholder="Write your article content here using standard headings (## or ###), bullet points (- ), and bold (**text**)..."
                class="w-full p-4 rounded-2xl border border-brand-border text-xs sm:text-sm font-sans leading-relaxed text-brand-charcoal focus:ring-2 focus:ring-brand-teal focus:outline-none"
              ></textarea>
            </div>

            <!-- 6. Publishing Settings -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-brand-border">
              <!-- Status Toggle -->
              <div class="flex items-center gap-3">
                <label class="text-xs font-bold text-brand-charcoal uppercase">Status:</label>
                <div class="flex bg-brand-ivory p-1 rounded-xl border border-brand-border text-xs">
                  <button 
                    type="button" 
                    @click="formData.status = 'published'"
                    :class="['px-3 py-1.5 rounded-lg font-bold transition-all', formData.status === 'published' ? 'bg-emerald-600 text-white shadow-xs' : 'text-brand-muted']"
                  >
                    Published
                  </button>
                  <button 
                    type="button" 
                    @click="formData.status = 'draft'"
                    :class="['px-3 py-1.5 rounded-lg font-bold transition-all', formData.status === 'draft' ? 'bg-amber-600 text-white shadow-xs' : 'text-brand-muted']"
                  >
                    Draft
                  </button>
                </div>
              </div>

              <!-- Featured Checkbox -->
              <div class="flex items-center gap-2">
                <input 
                  id="featured-checkbox" 
                  v-model="formData.featured" 
                  type="checkbox" 
                  class="w-4 h-4 rounded text-brand-teal focus:ring-brand-teal"
                />
                <label for="featured-checkbox" class="text-xs font-bold text-brand-charcoal cursor-pointer">
                  Feature this article at the top of the blog page
                </label>
              </div>
            </div>

          </div>

          <!-- Modal Body (Preview Tab) -->
          <div v-show="activeTab === 'preview'" class="p-6 sm:p-10 overflow-y-auto space-y-6 flex-grow bg-brand-ivory">
            <div class="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-3xl border border-brand-border shadow-soft">
              <span class="px-3 py-1 rounded-full bg-brand-mint text-brand-teal-dark text-xs font-bold">
                {{ formData.categoryLabel }}
              </span>
              <h1 class="text-2xl sm:text-3xl font-extrabold text-brand-charcoal mt-3 mb-3">
                {{ formData.title || 'Untitled Article' }}
              </h1>
              <p class="text-xs text-brand-muted mb-4">{{ formData.description }}</p>

              <div class="flex flex-wrap gap-1.5 mb-6">
                <span v-for="kw in formData.keywords" :key="kw" class="text-[10px] bg-brand-mint px-2 py-0.5 rounded text-brand-teal-dark font-semibold">
                  #{{ kw }}
                </span>
              </div>

              <div v-if="formData.image" class="rounded-2xl overflow-hidden mb-6 aspect-[16/10] bg-brand-mint/40">
                <img :src="formData.image" alt="Preview" class="w-full h-full object-cover" />
              </div>

              <div class="text-xs sm:text-sm text-brand-charcoal leading-relaxed whitespace-pre-line">
                {{ formData.content }}
              </div>
            </div>
          </div>

          <!-- Modal Footer Actions -->
          <div class="p-4 sm:p-6 border-t border-brand-border bg-brand-ivory/60 flex items-center justify-between">
            <button 
              type="button" 
              @click="isEditorOpen = false"
              class="px-5 py-2.5 rounded-xl border border-brand-border text-xs font-bold text-brand-muted hover:text-brand-charcoal hover:bg-white transition-colors"
            >
              Cancel
            </button>

            <button 
              type="button" 
              @click="handleSave"
              class="px-6 py-2.5 rounded-xl bg-brand-teal-dark hover:bg-brand-teal text-white text-xs sm:text-sm font-bold shadow-soft transition-all"
            >
              {{ isEditing ? 'Save Changes' : 'Publish Article' }}
            </button>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>
