import { Howl } from 'howler';

class EliteSoundscapes {
  private sounds: Record<string, Howl> = {};
  private isEnabled: boolean = true;

  constructor() {
    if (typeof window !== 'undefined') {
      this.init();
    }
  }

  private init() {
    // High-fidelity Elite Sound Assets
    // Using premium-grade royalty-free sounds via CDN for consistency and quality
    this.sounds = {
      chime: new Howl({
        src: ['https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'], // Keeping Template Sound
        volume: 0.4,
        rate: 1.2
      }),
      cosmic: new Howl({
        src: ['https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3'], // High-tech Cosmic Pulse
        volume: 0.3,
        rate: 0.8
      }),
      whir: new Howl({
        src: ['https://assets.mixkit.co/active_storage/sfx/2562/2562-preview.mp3'],
        volume: 0.2,
        loop: false
      }),
      reverb: new Howl({
        src: ['https://assets.mixkit.co/active_storage/sfx/2190/2190-preview.mp3'],
        volume: 0.3,
        rate: 0.8
      }),
      quantum: new Howl({
        src: ['https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3'],
        volume: 0.5,
        rate: 1.5
      })
    };
  }

  public enable(state: boolean) {
    this.isEnabled = state;
  }

  // Template/Purchase Sound (Keep as is)
  public playChime() {
    if (!this.isEnabled) return;
    this.sounds.chime?.play();
  }

  // Cosmic Interaction Sound
  public playCosmic() {
    if (!this.isEnabled) return;
    this.sounds.cosmic?.play();
  }

  // Legacy mappings for consistency
  public playWhir() { this.playCosmic(); }
  public playReverb() { this.playCosmic(); }
  public playQuantum() { this.playCosmic(); }
}

export const soundscapes = new EliteSoundscapes();
