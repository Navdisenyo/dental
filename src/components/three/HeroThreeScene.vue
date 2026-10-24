<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const canvasContainer = ref<HTMLDivElement | null>(null)
const isSupported = ref(true)

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let toothGroup: THREE.Group
let animationFrameId: number
let mouseX = 0
let mouseY = 0
let targetRotationX = 0
let targetRotationY = 0

// Build parametric aesthetic tooth shape
function createToothGeometry(): THREE.BufferGeometry {
  const geom = new THREE.CylinderGeometry(0.85, 0.45, 1.8, 32, 24, true)
  const pos = geom.attributes.position

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i)
    const y = pos.getY(i)
    const z = pos.getZ(i)

    // Crown cusp shaping
    if (y > 0.3) {
      const angle = Math.atan2(z, x)
      const cuspFactor = Math.sin(angle * 2) * 0.18 + Math.cos(angle * 4) * 0.05
      pos.setX(i, x * (1 + cuspFactor * 0.3))
      pos.setZ(i, z * (1 + cuspFactor * 0.3))
      // Slight dip in center of occlusal table
      if (Math.abs(x) < 0.4 && Math.abs(z) < 0.4) {
        pos.setY(i, y - 0.12)
      }
    } else {
      // Root taper & bifurcated hint
      const rootFactor = Math.sin(x * 3) * 0.1
      pos.setX(i, x * 0.85 + rootFactor)
      pos.setZ(i, z * 0.85)
    }
  }

  geom.computeVertexNormals()
  return geom
}

onMounted(() => {
  if (!canvasContainer.value) return

  // Detect low performance or reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    isSupported.value = false
    return
  }

  try {
    const width = canvasContainer.value.clientWidth || 380
    const height = canvasContainer.value.clientHeight || 380

    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100)
    camera.position.z = 4.8

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.1

    canvasContainer.value.appendChild(renderer.domElement)

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9)
    scene.add(ambientLight)

    const keyLight = new THREE.DirectionalLight(0x72b2ab, 2.2)
    keyLight.position.set(3, 4, 3)
    scene.add(keyLight)

    const rimLight = new THREE.DirectionalLight(0xeaf5f2, 1.8)
    rimLight.position.set(-3, -2, -2)
    scene.add(rimLight)

    const goldAccent = new THREE.PointLight(0xc89b3c, 1.2, 10)
    goldAccent.position.set(0, 3, 2)
    scene.add(goldAccent)

    // Group
    toothGroup = new THREE.Group()

    // Tooth Material (Enamel Pearlescent)
    const enamelMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.15,
      metalness: 0.05,
      transmission: 0.4,
      ior: 1.52,
      reflectivity: 0.8,
      clearcoat: 0.9,
      clearcoatRoughness: 0.1,
      sheen: 0.6,
      sheenColor: new THREE.Color(0x72b2ab),
    })

    const toothGeom = createToothGeometry()
    const toothMesh = new THREE.Mesh(toothGeom, enamelMaterial)
    toothMesh.position.y = -0.1
    toothGroup.add(toothMesh)

    // Outer Aura Ring (representing Smile Harmony & Aesthetic Care)
    const ringGeom = new THREE.TorusGeometry(1.45, 0.02, 16, 80)
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x72b2ab,
      metalness: 0.4,
      roughness: 0.2,
      transparent: true,
      opacity: 0.65
    })
    const ringMesh = new THREE.Mesh(ringGeom, ringMat)
    ringMesh.rotation.x = Math.PI / 3.2
    toothGroup.add(ringMesh)

    // Second Thin Golden Orbital Ring
    const goldRingGeom = new THREE.TorusGeometry(1.65, 0.015, 16, 80)
    const goldRingMat = new THREE.MeshStandardMaterial({
      color: 0xc89b3c,
      metalness: 0.7,
      roughness: 0.3,
      transparent: true,
      opacity: 0.45
    })
    const goldRingMesh = new THREE.Mesh(goldRingGeom, goldRingMat)
    goldRingMesh.rotation.y = Math.PI / 4
    goldRingMesh.rotation.x = Math.PI / 6
    toothGroup.add(goldRingMesh)

    scene.add(toothGroup)

    // Mouse listener
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvasContainer.value?.getBoundingClientRect()
      if (!rect) return
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
      targetRotationY = mouseX * 0.4
      targetRotationX = -mouseY * 0.3
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })

    // Resize listener
    const onResize = () => {
      if (!canvasContainer.value) return
      const w = canvasContainer.value.clientWidth
      const h = canvasContainer.value.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    window.addEventListener('resize', onResize)

    // Render loop with smooth damping
    let clock = new THREE.Clock()
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()

      // Idle float & subtle rotation
      toothGroup.rotation.y += (targetRotationY + elapsedTime * 0.25 - toothGroup.rotation.y) * 0.05
      toothGroup.rotation.x += (targetRotationX + Math.sin(elapsedTime * 0.8) * 0.1 - toothGroup.rotation.x) * 0.05
      toothGroup.position.y = Math.sin(elapsedTime * 1.2) * 0.08

      ringMesh.rotation.z = elapsedTime * 0.2
      goldRingMesh.rotation.z = -elapsedTime * 0.15

      renderer.render(scene, camera)
    }

    animate()
  } catch (e) {
    console.warn('WebGL / Three.js fallback active:', e)
    isSupported.value = false
  }
})

onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
  if (renderer && renderer.domElement && canvasContainer.value) {
    canvasContainer.value.innerHTML = ''
    renderer.dispose()
  }
})
</script>

<template>
  <div class="relative w-full h-full flex items-center justify-center pointer-events-none select-none">
    <!-- Interactive Canvas -->
    <div 
      v-show="isSupported"
      ref="canvasContainer" 
      class="w-full h-full min-h-[320px] sm:min-h-[380px] pointer-events-auto"
      title="Interactive 3D Smile Sculptural Art"
    ></div>

    <!-- Graceful Fallback if WebGL is disabled or reduced motion -->
    <div 
      v-if="!isSupported" 
      class="w-64 h-64 rounded-full bg-gradient-to-tr from-brand-mint via-brand-teal/20 to-brand-gold/20 flex items-center justify-center p-8 border border-brand-teal/30 shadow-card animate-pulse"
    >
      <img 
        src="/assets/logo.png" 
        alt="OneCare Aesthetix" 
        class="w-full h-auto object-contain drop-shadow-md"
      />
    </div>

    <!-- Interactive subtle hint on desktop -->
    <div class="absolute bottom-1 right-2 text-[10px] text-brand-muted/70 tracking-widest uppercase hidden md:flex items-center gap-1.5 pointer-events-none">
      <span class="w-1.5 h-1.5 rounded-full bg-brand-teal animate-ping"></span>
      <span>Interactive 3D Enamel Model</span>
    </div>
  </div>
</template>
