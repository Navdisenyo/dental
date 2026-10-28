import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BlogView from '../views/BlogView.vue'
import BlogDetailView from '../views/BlogDetailView.vue'
import AdminBlogView from '../views/AdminBlogView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'OneCare Aesthetix Clinic | Best Dentist & Orthodontist in Kothrud, Pune'
    }
  },
  {
    path: '/blog',
    name: 'blog',
    component: BlogView,
    meta: {
      title: 'Dental Insights & Orthodontic Care Guides | OneCare Aesthetix Clinic'
    }
  },
  {
    path: '/blog/:slug',
    name: 'blog-detail',
    component: BlogDetailView
  },
  {
    path: '/admin',
    name: 'admin-blog',
    component: AdminBlogView,
    meta: {
      title: 'Admin Management Portal | OneCare Aesthetix Clinic'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
    return { top: 0 }
  }
})

router.beforeEach((to, _from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title as string
  }
  next()
})

export default router
