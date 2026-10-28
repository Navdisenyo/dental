import { ref, computed } from 'vue'
import type { BlogPost } from '../types/blog'

const STORAGE_KEY = 'onecare_blog_posts_v1'

const defaultAuthor = {
  name: 'Dr. Achal Agarwal',
  role: 'MDS Orthodontist & Dentofacial Orthopaedist',
  clinic: 'OneCare Aesthetix Clinic, Kothrud, Pune',
  avatar: '/assets/logo.png',
  bio: 'Specialist Orthodontist with advanced training in digital clear aligners, adolescent dentofacial orthopaedics, and conservative aesthetic smile design.'
}

const initialPosts: BlogPost[] = [
  {
    id: 'post-1-clear-aligners-guide',
    slug: 'clear-aligners-vs-braces-pune-guide',
    title: 'Clear Aligners vs. Traditional Braces: The Definitive Clinical Comparison',
    keywords: ['Clear Aligners', 'Invisible Braces', 'Orthodontist Pune', 'Dr. Achal Agarwal', 'Teeth Straightening', 'Kothrud Dental'],
    description: 'Considering straightening your teeth? Explore the pros, cons, costs, treatment timelines, and clinical suitability of custom clear aligners versus modern low-profile braces.',
    image: '/assets/transformations/case-1-braces-alignment.jpg',
    imageCaption: 'Real orthodontic alignment achieved with custom digital orthodontic mechanics.',
    category: 'aligners',
    categoryLabel: 'Clear Aligners & Braces',
    author: defaultAuthor,
    publishedAt: '2026-10-24',
    readingTime: '5 min read',
    featured: true,
    status: 'published',
    content: `## Choosing the Ideal Orthodontic Path for Your Smile

For decades, orthodontic treatment was synonymous with noticeable metallic brackets and wires. Today, advances in 3D digital intraoral scanning and thermo-formed polymer engineering have transformed orthodontics into an aesthetic, comfortable, and discreet journey.

At **OneCare Aesthetix Clinic** in Kothrud, Pune, one of the most frequent consultations we conduct is helping adults and teenagers evaluate whether **Clear Aligners** or **Self-Ligating Braces** are the best fit for their anatomical goals and lifestyle.

---

### What Are Clear Aligners?

Clear aligners are a series of custom-fabricated, transparent, medical-grade polyurethane trays designed to gradually guide your teeth into optimal Class-I occlusion and aesthetic harmony. 

Each tray is worn for approximately 7 to 10 days before transitioning to the sequential tray. Key advantages include:

- **Virtually Invisible:** Colleagues and friends rarely notice you are wearing them during meetings or social gatherings.
- **Removable for Meals & Hygiene:** You can brush and floss normally without needing specialized floss threaders, drastically reducing plaque and gingivitis risks.
- **Zero Dietary Restrictions:** Enjoy your favorite foods without worrying about detached brackets or bent wires.
- **Predictable Digital 3D Simulation:** Before starting, patients preview a computer-generated 3D simulation of their exact tooth movements from day one to the final smile.

---

### When Are Modern Braces Still the Superior Choice?

While clear aligners can handle an extraordinary range of malocclusions today, high-precision fixed braces (such as ceramic tooth-colored braces or low-friction self-ligating brackets) excel in:

1. **Severe Skeletal Discrepancies:** Complex vertical bite adjustments and severe deep overbites.
2. **High Ectopic or Impacted Canines:** Requiring multi-vector directional pull mechanics.
3. **Severe Rotations & Premolar Extraction Closures:** Where continuous 24/7 force delivery is paramount.
4. **Patient Compliance:** Aligners require disciplined 20-22 hours of daily wear. For individuals who frequently misplace or forget their trays, fixed brackets guarantee steady progress.

---

### Clinical Takeaways from Dr. Achal Agarwal

> "The true success of orthodontic treatment is not dictated solely by the tool—whether plastic tray or ceramic bracket—but by the biological diagnosis, biomechanics planning, and bone boundary awareness of your orthodontist."

### What to Expect During Your Initial Consultation

During your visit to our Kothrud clinic, Dr. Achal Agarwal conducts:
- High-definition intraoral examination and photographic analysis
- Digital occlusion and jaw-joint (TMJ) evaluation
- Transparent breakdown of treatment timeline, expected appointments, and step-by-step pricing
- Personalized recommendation tailored to your facial profile and aesthetic aspirations`
  },
  {
    id: 'post-2-arch-expansion-aesthetics',
    slug: 'youthful-radiant-arch-expansion-facial-harmony',
    title: 'Narrow Arch Expansion: How Leveling & Arch Development Rejuvenates the Smile',
    keywords: ['Arch Expansion', 'Facial Aesthetics', 'Youthful Smile', 'Hollywood Smile Line', 'Non-Surgical Orthodontics', 'Buccal Corridors'],
    description: 'Learn how expanding a constricted dental arch broadens your smile, eliminates dark buccal corridors, supports natural lip fullness, and restores youthful facial harmony.',
    image: '/assets/transformations/case-4-arch-expansion.jpg',
    imageCaption: 'Youthful Radiant Arch Expansion case treated at OneCare Aesthetix Clinic.',
    category: 'orthodontics',
    categoryLabel: 'Orthodontics & Arch Leveling',
    author: defaultAuthor,
    publishedAt: '2026-10-18',
    readingTime: '4 min read',
    featured: false,
    status: 'published',
    content: `## The Anatomy of a Broad, Radiant Smile

When we smile, what creates that captivating "Hollywood" radiance? It is not just tooth shade or straightness; it is the **breadth and curvature of the upper dental arch**.

When an individual has a constricted or narrow upper arch, several aesthetic and functional consequences emerge:
- **Dark Buccal Corridors:** Deep black triangles visible at the corners of the mouth when smiling.
- **Crowded or Rotated Front Teeth:** Insufficient perimeter forcing incisors to overlap or tilt inward.
- **Reduced Lip Support:** Inwardly tipped teeth fail to properly drape the upper lip, causing premature thinning and aged facial appearance.

---

### How Orthodontic Arch Expansion Works

Rather than extracting healthy premolars to create space—which in narrow arch cases can unfortunately flatten the facial profile—modern orthodontics prioritizes **arch development and controlled transverse expansion**.

By utilizing broad-arch pre-formed orthodontic wires or specialized expansion clear aligners, we gently upright lingually-tipped posterior teeth and expand the arch perimeter within the safe physiological limits of the buccal cortical bone.

---

### Clinical Outcomes Achieved

1. **Illuminated Smile Display:** Teeth fill the corner of the lips gracefully, eliminating shadowy gaps.
2. **Natural Incisor Alignment:** Adequate spacing allows crowded front teeth to level seamlessly without enamel reduction.
3. **Enhanced Cheek and Lip Balance:** Gives fuller soft-tissue contouring and youthful dentofacial harmony.

If you have noticed your smile appears pinched or crowded inward, schedule an unhurried digital consultation at OneCare Aesthetix Clinic to evaluate your arch development options.`
  },
  {
    id: 'post-3-closing-front-teeth-gaps',
    slug: 'midline-diastema-aesthetic-gap-closure-options',
    title: 'Closing Front Teeth Gaps (Diastema): Fast, Gentle & Natural Solutions',
    keywords: ['Diastema Closure', 'Teeth Gap', 'Aesthetic Contouring', 'Composite Bonding', 'Dental Veneers', 'Midline Space'],
    description: 'Explore modern clinical approaches to closing midline diastema (front teeth gaps)—from targeted orthodontic alignment to same-day composite bonding and ceramic veneers.',
    image: '/assets/transformations/case-3-gap-closure-diastema.jpg',
    imageCaption: 'Aesthetic front teeth gap closure with golden-proportion natural symmetry.',
    category: 'smile-design',
    categoryLabel: 'Smile Design & Gap Closure',
    author: defaultAuthor,
    publishedAt: '2026-10-12',
    readingTime: '4 min read',
    featured: false,
    status: 'published',
    content: `## Understanding the Causes of Front Teeth Spacing

A midline diastema—a noticeable space between the two upper front central incisors—is a common aesthetic concern. While some celebrate it as a unique characteristic, many patients seek closure for confidence and food impaction relief.

Before selecting a treatment, identifying the root cause is crucial:

- **Labial Frenum Attachment:** A thick, fibrous labial frenum that inserts low between the front teeth, physically barring natural contact.
- **Tooth-to-Jaw Size Discrepancy:** Undersized teeth relative to a generous jawbone perimeter.
- **Missing or Microdont Lateral Incisors:** "Peg laterals" causing surrounding teeth to drift apart.
- **Tongue Thrust Habits:** Swallowing patterns that push against upper incisors.

---

### Modern Treatment Modalities

#### 1. Targeted Orthodontic Alignment (Clear Aligners or Short-Term Braces)
When teeth have healthy natural dimensions and simply need bodily movement, 3-6 months of discreet orthodontic mechanics gently close the gap and establish stable contact points.

#### 2. Same-Day Direct Composite Bonding
For patients with smaller teeth who desire an instantaneous, non-invasive enhancement:
- Zero enamel shaving is required.
- High-refractive aesthetic composite resin is seamlessly sculpted and polished in a single 60-minute appointment.
- Completely reversible and highly cost-effective.

#### 3. Ultra-Thin Ceramic Laminate Veneers
When diastema is accompanied by surface discoloration, irregular shape, or enamel wear, custom porcelain veneers deliver long-lasting lifelike translucency and stain resistance.

Book a consultation with Dr. Achal Agarwal at OneCare Aesthetix Clinic to review your smile photographs and select your personalized treatment pathway.`
  },
  {
    id: 'post-4-dentofacial-profile-harmony',
    slug: 'dentofacial-orthopaedics-jaw-alignment-profile-harmony',
    title: 'Dentofacial Orthopaedics: Harmonizing Jaw Alignment & Facial Profiles',
    keywords: ['Dentofacial Orthopaedics', 'Jaw Alignment', 'Retrognathic Mandible', 'Profile Realignment Pune', 'Class II Malocclusion'],
    description: 'A deep clinical look into how jaw-growth guidance and mandibular advancement balance facial profile projection, effortless lip closure, and healthy airway breathing.',
    image: '/assets/transformations/case-6-profile-orthopaedics.jpg',
    imageCaption: 'Mandibular advancement and profile realignment treated by Dr. Achal Agarwal.',
    category: 'dentofacial',
    categoryLabel: 'Dentofacial Orthopaedics',
    author: defaultAuthor,
    publishedAt: '2026-10-05',
    readingTime: '5 min read',
    featured: false,
    status: 'published',
    content: `## Beyond Straight Teeth: The Science of Dentofacial Orthopaedics

Orthodontics focuses primarily on moving teeth within the alveolar bone. **Dentofacial Orthopaedics**, on the other hand, guides the growth and relationship of the facial bones and jaws themselves.

As an MDS specialist in Dentofacial Orthopaedics, Dr. Achal Agarwal approaches each smile not merely from tooth-to-tooth relationships, but by analyzing the entire dentofacial complex—chin projection, lip competency, airway volume, and nasolabial angles.

---

### Understanding the "Weak Chin" (Retrognathic Mandible)

One of the most prevalent conditions treated at OneCare Aesthetix Clinic is Class-II skeletal malocclusion, characterized by:
- A receded lower jaw (retrognathia) giving the impression of an overly prominent nose or weak jawline.
- Excessive overjet ("buck teeth"), making it strenuous to achieve natural lip seal at rest.
- Increased susceptibility to airway restriction and sleep-disordered breathing.

---

### Treatment Approaches: Adolescents vs. Adults

- **In Growing Children and Teenagers (Ages 9 - 14):**
  We utilize functional orthopedic appliances (such as Twin Block or mandibular advancement aligners) to harness the patient's natural pubertal growth spurt. This gently encourages the lower jaw forward, transforming the facial profile non-surgically.

- **In Adults Post-Growth:**
  While skeletal growth has ceased, advanced biomechanical compensation—achieved through micro-implant-assisted orthodontics (TADs) or coordinated aligner mechanics—can significantly optimize profile aesthetics, lip drape, and bite stability without requiring invasive jaw surgery in moderate cases.

Consult our clinic to learn more about dentofacial orthopaedics for your family.`
  }
]

// State
const posts = ref<BlogPost[]>([])
const isInitialized = ref(false)

function loadPosts() {
  if (typeof window === 'undefined') return
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.length > 0) {
        posts.value = parsed
        isInitialized.value = true
        return
      }
    }
  } catch (err) {
    console.error('Failed to load blog posts from localStorage:', err)
  }
  // Fallback to initial
  posts.value = [...initialPosts]
  saveToStorage()
  isInitialized.value = true
}

function saveToStorage() {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts.value))
  } catch (err) {
    console.error('Failed to save blog posts to localStorage:', err)
  }
}

// Helpers
export function calculateReadingTime(text: string): string {
  const words = text.trim().split(/\s+/).length
  const minutes = Math.ceil(words / 180)
  return `${Math.max(1, minutes)} min read`
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Initialize immediately
loadPosts()

export function useBlogStore() {
  if (!isInitialized.value) {
    loadPosts()
  }

  const publishedPosts = computed(() => {
    return posts.value
      .filter(p => p.status === 'published')
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  })

  const allPosts = computed(() => {
    return [...posts.value].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  })

  const categories = computed(() => {
    const unique = new Map<string, string>()
    unique.set('all', 'All Insights')
    posts.value.forEach(p => {
      if (p.category && p.categoryLabel) {
        unique.set(p.category, p.categoryLabel)
      }
    })
    return Array.from(unique.entries()).map(([value, label]) => ({ value, label }))
  })

  function getPostBySlug(slug: string): BlogPost | undefined {
    return posts.value.find(p => p.slug === slug)
  }

  function getPostById(id: string): BlogPost | undefined {
    return posts.value.find(p => p.id === id)
  }

  function savePost(postData: Partial<BlogPost> & { title: string; description: string; content: string }): BlogPost {
    const now = new Date().toISOString().split('T')[0]
    const readingTime = postData.readingTime || calculateReadingTime(postData.content)
    const slug = postData.slug?.trim() || generateSlug(postData.title)

    if (postData.id) {
      // Update
      const index = posts.value.findIndex(p => p.id === postData.id)
      if (index !== -1) {
        const existing = posts.value[index]
        const updated: BlogPost = {
          ...existing,
          ...postData,
          id: existing.id,
          slug,
          readingTime,
          publishedAt: postData.publishedAt || existing.publishedAt || now,
          author: {
            ...defaultAuthor,
            ...(postData.author || {})
          }
        }
        posts.value[index] = updated
        saveToStorage()
        return updated
      }
    }

    // Create
    const newPost: BlogPost = {
      id: `post-${Date.now()}`,
      slug,
      title: postData.title,
      keywords: postData.keywords || [],
      description: postData.description,
      image: postData.image || '/assets/transformations/case-1-braces-alignment.jpg',
      imageCaption: postData.imageCaption || '',
      content: postData.content,
      category: postData.category || 'orthodontics',
      categoryLabel: postData.categoryLabel || 'Orthodontics & Aligners',
      author: {
        ...defaultAuthor,
        ...(postData.author || {})
      },
      publishedAt: postData.publishedAt || now,
      readingTime,
      featured: postData.featured ?? false,
      status: postData.status || 'published'
    }

    posts.value.unshift(newPost)
    saveToStorage()
    return newPost
  }

  function deletePost(id: string): boolean {
    const prevLen = posts.value.length
    posts.value = posts.value.filter(p => p.id !== id)
    if (posts.value.length !== prevLen) {
      saveToStorage()
      return true
    }
    return false
  }

  function resetToDefaults() {
    posts.value = [...initialPosts]
    saveToStorage()
  }

  function exportToJson(): string {
    return JSON.stringify(posts.value, null, 2)
  }

  function importFromJson(jsonStr: string): boolean {
    try {
      const parsed = JSON.parse(jsonStr)
      if (Array.isArray(parsed) && parsed.length > 0) {
        posts.value = parsed
        saveToStorage()
        return true
      }
    } catch (e) {
      console.error('Import failed:', e)
    }
    return false
  }

  return {
    posts,
    publishedPosts,
    allPosts,
    categories,
    getPostBySlug,
    getPostById,
    savePost,
    deletePost,
    resetToDefaults,
    exportToJson,
    importFromJson,
    defaultAuthor
  }
}
