// Advanced mobile interactions composable
import { ref, onMounted, onUnmounted, readonly, type Ref } from 'vue'

export interface SwipeDirection {
  x: number
  y: number
  direction: 'left' | 'right' | 'up' | 'down' | null
}

export interface TapGesture {
  x: number
  y: number
  duration: number
}

export function useMobileInteractions(element: Ref<HTMLElement | null>) {
  const isTouch = ref(false)
  const isSwiping = ref(false)
  const touchStart = ref<{ x: number; y: number; time: number } | null>(null)
  const touchEnd = ref<{ x: number; y: number; time: number } | null>(null)
  
  // Gesture thresholds
  const SWIPE_THRESHOLD = 50 // Minimum distance for swipe
  const TAP_MAX_DURATION = 200 // Maximum duration for tap (ms)
  const TAP_MAX_DISTANCE = 10 // Maximum distance for tap (px)
  
  // Event handlers
  const onTouchStart = (e: TouchEvent) => {
    isTouch.value = true
    const touch = e.touches[0]
    touchStart.value = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    }
    touchEnd.value = null
    isSwiping.value = false
  }
  
  const onTouchMove = (e: TouchEvent) => {
    if (!touchStart.value) return
    
    const touch = e.touches[0]
    const deltaX = Math.abs(touch.clientX - touchStart.value.x)
    const deltaY = Math.abs(touch.clientY - touchStart.value.y)
    
    // If moved significantly, it's a swipe
    if (deltaX > TAP_MAX_DISTANCE || deltaY > TAP_MAX_DISTANCE) {
      isSwiping.value = true
    }
  }
  
  const onTouchEnd = (e: TouchEvent) => {
    if (!touchStart.value) return
    
    const touch = e.changedTouches[0]
    touchEnd.value = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    }
    
    const deltaX = touchEnd.value.x - touchStart.value.x
    const deltaY = touchEnd.value.y - touchStart.value.y
    const duration = touchEnd.value.time - touchStart.value.time
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
    
    // Determine gesture type
    if (duration <= TAP_MAX_DURATION && distance <= TAP_MAX_DISTANCE) {
      // It's a tap
      onTap({
        x: touchEnd.value.x,
        y: touchEnd.value.y,
        duration
      })
    } else if (distance >= SWIPE_THRESHOLD) {
      // It's a swipe
      const direction = getSwipeDirection(deltaX, deltaY)
      onSwipe({
        x: deltaX,
        y: deltaY,
        direction
      })
    }
    
    // Reset state
    touchStart.value = null
    touchEnd.value = null
    isSwiping.value = false
  }
  
  const getSwipeDirection = (deltaX: number, deltaY: number): SwipeDirection['direction'] => {
    const absDeltaX = Math.abs(deltaX)
    const absDeltaY = Math.abs(deltaY)
    
    if (absDeltaX > absDeltaY) {
      return deltaX > 0 ? 'right' : 'left'
    } else {
      return deltaY > 0 ? 'down' : 'up'
    }
  }
  
  // Gesture callbacks (can be overridden)
  const onSwipe = (swipe: SwipeDirection) => {
    console.log('Swipe detected:', swipe)
  }
  
  const onTap = (tap: TapGesture) => {
    console.log('Tap detected:', tap)
  }
  
  // Prevent context menu on long press (better for games)
  const onContextMenu = (e: Event) => {
    if (isTouch.value) {
      e.preventDefault()
    }
  }
  
  // Setup event listeners
  const setupListeners = () => {
    if (!element.value) return
    
    element.value.addEventListener('touchstart', onTouchStart, { passive: true })
    element.value.addEventListener('touchmove', onTouchMove, { passive: true })
    element.value.addEventListener('touchend', onTouchEnd, { passive: true })
    element.value.addEventListener('contextmenu', onContextMenu)
    
    // Also handle mouse events for desktop testing
    element.value.addEventListener('mousedown', () => {
      isTouch.value = false
    })
  }
  
  const removeListeners = () => {
    if (!element.value) return
    
    element.value.removeEventListener('touchstart', onTouchStart)
    element.value.removeEventListener('touchmove', onTouchMove)
    element.value.removeEventListener('touchend', onTouchEnd)
    element.value.removeEventListener('contextmenu', onContextMenu)
    element.value.removeEventListener('mousedown', () => {})
  }
  
  onMounted(() => {
    setupListeners()
  })
  
  onUnmounted(() => {
    removeListeners()
  })
  
  return {
    isTouch: readonly(isTouch),
    isSwiping: readonly(isSwiping),
    onSwipe,
    onTap,
    setupListeners,
    removeListeners
  }
}

// Device detection utilities
export function useDeviceDetection() {
  const isMobile = ref(false)
  const isTablet = ref(false)
  const isTouch = ref(false)
  const orientation = ref<'portrait' | 'landscape'>('portrait')
  
  const updateDeviceInfo = () => {
    // Check for touch capability
    isTouch.value = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    
    // Check screen size
    const width = window.innerWidth
    isMobile.value = width <= 768
    isTablet.value = width > 768 && width <= 1024
    
    // Check orientation
    orientation.value = window.innerHeight > window.innerWidth ? 'portrait' : 'landscape'
  }
  
  const onOrientationChange = () => {
    setTimeout(updateDeviceInfo, 100) // Small delay for orientation change
  }
  
  onMounted(() => {
    updateDeviceInfo()
    window.addEventListener('resize', updateDeviceInfo)
    window.addEventListener('orientationchange', onOrientationChange)
  })
  
  onUnmounted(() => {
    window.removeEventListener('resize', updateDeviceInfo)
    window.removeEventListener('orientationchange', onOrientationChange)
  })
  
  return {
    isMobile: readonly(isMobile),
    isTablet: readonly(isTablet),
    isTouch: readonly(isTouch),
    orientation: readonly(orientation)
  }
}

// Haptic feedback for mobile devices
export function useHaptics() {
  const isSupported = ref(false)
  
  onMounted(() => {
    isSupported.value = 'vibrate' in navigator
  })
  
  const vibrate = (pattern: number | number[] = 50) => {
    if (isSupported.value) {
      navigator.vibrate(pattern)
    }
  }
  
  const tapFeedback = () => vibrate(25)       // Light tap
  const successFeedback = () => vibrate([50, 25, 50])  // Success pattern
  const errorFeedback = () => vibrate([100, 50, 100, 50, 100]) // Error pattern
  
  return {
    isSupported: readonly(isSupported),
    vibrate,
    tapFeedback,
    successFeedback,
    errorFeedback
  }
}