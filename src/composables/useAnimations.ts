import { onMounted, onUnmounted, ref, type Ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useAnimations(scopeRef?: Ref<HTMLElement | null>) {
  let ctx: gsap.Context | null = null
  const prefersReducedMotion = ref(false)

  onMounted(() => {
    prefersReducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (scopeRef?.value) {
      ctx = gsap.context(() => {}, scopeRef.value)
    }
  })

  onUnmounted(() => {
    if (ctx) {
      ctx.revert()
    }
  })

  /**
   * Helper to animate section headers on scroll with line and text reveals
   */
  const animateHeader = (target: string | Element, trigger?: string | Element) => {
    if (prefersReducedMotion.value) return

    return gsap.from(target, {
      scrollTrigger: {
        trigger: (trigger || target) as any,
        start: 'top 85%',
        toggleActions: 'play none none none',
        once: true
      },
      y: 30,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out'
    })
  }

  /**
   * Helper to animate grid cards with staggered entrance
   */
  const animateStagger = (targets: string | Element[] | NodeList, trigger?: string | Element, stagger = 0.12) => {
    if (prefersReducedMotion.value) return

    const triggerEl = trigger || (Array.isArray(targets) ? targets[0] : (typeof targets === 'string' ? targets : (targets as any)[0]))

    return gsap.from(targets as any, {
      scrollTrigger: {
        trigger: triggerEl as any,
        start: 'top 85%',
        toggleActions: 'play none none none',
        once: true
      },
      y: 40,
      opacity: 0,
      stagger,
      duration: 0.8,
      ease: 'power3.out'
    })
  }

  /**
   * Image reveal effect with subtle scale & clip
   */
  const animateImageReveal = (target: string | Element, trigger?: string | Element) => {
    if (prefersReducedMotion.value) return

    return gsap.from(target, {
      scrollTrigger: {
        trigger: (trigger || target) as any,
        start: 'top 80%',
        toggleActions: 'play none none none',
        once: true
      },
      scale: 0.95,
      opacity: 0,
      duration: 1.1,
      ease: 'power2.out'
    })
  }

  return {
    gsap,
    ScrollTrigger,
    prefersReducedMotion,
    animateHeader,
    animateStagger,
    animateImageReveal
  }
}
