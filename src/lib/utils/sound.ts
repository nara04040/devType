class SoundManager {
  private audioContext: AudioContext | null = null;
  private volume: number = 0.5;
  private enabled: boolean = true;

  constructor() {
    if (typeof window !== 'undefined') {
      this.audioContext = new AudioContext();
    }
  }

  setVolume(volume: number) {
    this.volume = volume / 100;
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  private createOscillator(frequency: number, duration: number) {
    if (!this.audioContext || !this.enabled) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);

    gainNode.gain.setValueAtTime(this.volume, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

    oscillator.start();
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  playKeyPress() {
    this.createOscillator(600, 0.05);
  }

  playError() {
    this.createOscillator(200, 0.1);
  }

  playComplete() {
    if (!this.audioContext || !this.enabled) return;
    
    const now = this.audioContext.currentTime;
    
    // Play a simple melody
    [400, 500, 600].forEach((freq, i) => {
      setTimeout(() => {
        this.createOscillator(freq, 0.15);
      }, i * 150);
    });
  }
}

export const soundManager = typeof window !== 'undefined' ? new SoundManager() : null; 