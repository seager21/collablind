// Sound manager for CollaBlind game
// Handles all audio effects and background music

class SoundManager {
  private sounds: Map<string, HTMLAudioElement> = new Map()
  private volume: number = 0.5
  private muted: boolean = false

  constructor() {
    this.loadSounds()
  }

  private loadSounds() {
    // Create audio objects for different sound effects
    // Note: You'll need to add actual audio files to your public folder
    const soundEffects = {
      click: this.createAudio(
        'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvGkfCEibyvLOeS8FI3TC7OCRRAoSW7Pl7bBREg1NoOvxu2AUCD6X2PTPMS4FJXfE8d2QQgtTuPXtx2AcBz+V2/jBPSAGK4XG8OOUPw0VWLzr9a1SF',
      ) as HTMLAudioElement,

      correct: this.createAudio(
        'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvGkfCEybvLKOeS8FI3TC7OCRRAoSW7Pl7bBREg1NoOvxu2AUCD6X2PTPMS4FJXfE8d2QQgtTr+ixsWAfBT',
      ) as HTMLAudioElement,

      wrong: this.createAudio(
        'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvGkfCEybVLeMeS8FI3TC7OCRRAoSW7Pl7bBREg1NoOvxu2AUCD6X2PTPMS4FJXfE8d2QQgtTr+ixsWAfBT',
      ) as HTMLAudioElement,

      gameOver: this.createAudio(
        'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvGkfCEybvLKOeS8FI3TC7OCRRAoSW7Pl7bBREg1NoOvxu2AUCD6X2PTPMS4FJXfE8d2QQgtTr+ixsWAfBT',
      ) as HTMLAudioElement,

      whoosh: this.createAudio(
        'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvGkfCEybvLKOeS8FI3TC7OCRRAoSW7Pl7bBREg1NoOvxu2AUCD6X2PTPMS4FJXfE8d2QQgtTr+ixsWAfBT',
      ) as HTMLAudioElement,
    }

    Object.entries(soundEffects).forEach(([name, audio]) => {
      audio.volume = this.volume
      this.sounds.set(name, audio)
    })
  }

  private createAudio(src: string): HTMLAudioElement {
    const audio = new Audio(src)
    audio.preload = 'auto'
    return audio
  }

  // Generate a simple beep sound using Web Audio API
  private generateBeep(frequency: number, duration: number, type: OscillatorType = 'sine'): void {
    if (this.muted) return

    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const audioContext = new AudioContextClass()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.value = frequency
      oscillator.type = type

      gainNode.gain.setValueAtTime(this.volume * 0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + duration)
    } catch {
      console.warn('Web Audio API not supported')
    }
  }

  public playClick(): void {
    this.generateBeep(800, 0.1, 'square')
  }

  public playCorrect(): void {
    // Happy ascending beep
    this.generateBeep(523, 0.15, 'sine') // C
    setTimeout(() => this.generateBeep(659, 0.15, 'sine'), 100) // E
    setTimeout(() => this.generateBeep(784, 0.2, 'sine'), 200) // G
  }

  public playWrong(): void {
    // Descending error sound
    this.generateBeep(400, 0.2, 'sawtooth')
    setTimeout(() => this.generateBeep(300, 0.3, 'sawtooth'), 150)
  }

  public playGameOver(): void {
    // Dramatic descending sequence
    this.generateBeep(523, 0.3, 'sine')
    setTimeout(() => this.generateBeep(415, 0.3, 'sine'), 200)
    setTimeout(() => this.generateBeep(330, 0.3, 'sine'), 400)
    setTimeout(() => this.generateBeep(262, 0.5, 'sine'), 600)
  }

  public playWhoosh(): void {
    // Page transition sound
    this.generateBeep(600, 0.05, 'sine')
    setTimeout(() => this.generateBeep(800, 0.05, 'sine'), 50)
    setTimeout(() => this.generateBeep(1000, 0.1, 'sine'), 100)
  }

  public playSuccess(): void {
    // Victory fanfare
    this.generateBeep(523, 0.2, 'sine') // C
    setTimeout(() => this.generateBeep(659, 0.2, 'sine'), 100) // E
    setTimeout(() => this.generateBeep(784, 0.2, 'sine'), 200) // G
    setTimeout(() => this.generateBeep(1047, 0.4, 'sine'), 300) // C high
  }

  public setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume))
    this.sounds.forEach((audio) => {
      audio.volume = this.volume
    })
  }

  public toggleMute(): void {
    this.muted = !this.muted
  }

  public isMuted(): boolean {
    return this.muted
  }

  public getVolume(): number {
    return this.volume
  }
}

// Create singleton instance
export const soundManager = new SoundManager()

// Vue composable for using sound manager
export function useSound() {
  return {
    playClick: () => soundManager.playClick(),
    playCorrect: () => soundManager.playCorrect(),
    playWrong: () => soundManager.playWrong(),
    playGameOver: () => soundManager.playGameOver(),
    playWhoosh: () => soundManager.playWhoosh(),
    playSuccess: () => soundManager.playSuccess(),
    setVolume: (volume: number) => soundManager.setVolume(volume),
    toggleMute: () => soundManager.toggleMute(),
    isMuted: () => soundManager.isMuted(),
    getVolume: () => soundManager.getVolume(),
  }
}
