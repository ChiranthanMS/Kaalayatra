// Web Audio API Sound Synthesizer for Kalayatra (no external audio files needed)

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.ambientNodes = null;
    this.waterNodes = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopAmbient();
      this.stopWater();
    } else {
      this.startAmbient();
    }
    return this.isMuted;
  }

  // Ancient Indian Drone Ambience (Tanpura chord harmonics)
  startAmbient() {
    if (this.isMuted || this.ambientNodes) return;
    this.init();
    if (!this.ctx) return;

    try {
      const masterGain = this.ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.08, this.ctx.currentTime + 3);
      masterGain.connect(this.ctx.destination);

      // Frequencies for ancient meditative Indian Sa-Pa-Sa drone (C#3, G#3, C#4)
      const freqs = [138.59, 207.65, 277.18, 415.30];
      const oscillators = freqs.map((f, i) => {
        const osc = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const oscGain = this.ctx.createGain();

        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(f, this.ctx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(600 + i * 200, this.ctx.currentTime);

        oscGain.gain.setValueAtTime(0.25 / (i + 1), this.ctx.currentTime);

        // LFO for breathing swell
        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();
        lfo.frequency.setValueAtTime(0.15 + i * 0.05, this.ctx.currentTime);
        lfoGain.gain.setValueAtTime(0.04, this.ctx.currentTime);
        lfo.connect(lfoGain.gain);
        lfo.start();

        osc.connect(filter);
        filter.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start();

        return { osc, lfo };
      });

      this.ambientNodes = { masterGain, oscillators };
    } catch (e) {
      console.warn("Audio initialization notice:", e);
    }
  }

  stopAmbient() {
    if (!this.ambientNodes || !this.ctx) return;
    try {
      this.ambientNodes.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1);
      setTimeout(() => {
        if (this.ambientNodes) {
          this.ambientNodes.oscillators.forEach(o => {
            try { o.osc.stop(); o.lfo.stop(); } catch(e){}
          });
          this.ambientNodes = null;
        }
      }, 1000);
    } catch(e) {
      this.ambientNodes = null;
    }
  }

  // Stone / Wooden Button Click
  playClick() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(280, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.08);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.09);
  }

  // Pipe Rotation Sound (Clay/Stone friction)
  playRotate() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(460, this.ctx.currentTime + 0.05);
    osc.frequency.linearRampToValueAtTime(380, this.ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.13);
  }

  // Dialogue Typewriter soft blip
  playDialogueBeep() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(520 + Math.random() * 60, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  // Decision Select Gong/Bell
  playDecisionSelect() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const freqs = [440, 660, 880];
    freqs.forEach((f, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = idx === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(f, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.12 / (idx + 1), this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 1.3);
    });
  }

  // XP / Reward Ascending Chime
  playReward() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const startTime = this.ctx.currentTime + idx * 0.09;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.15, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.38);
    });
  }

  // Grand Victory Fanfare
  playVictory() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const chordNotes = [
      { f: 261.63, t: 0, d: 0.3 },    // C4
      { f: 329.63, t: 0.12, d: 0.3 }, // E4
      { f: 392.00, t: 0.24, d: 0.3 }, // G4
      { f: 523.25, t: 0.36, d: 0.9 }, // C5
      { f: 659.25, t: 0.42, d: 0.9 }, // E5
      { f: 783.99, t: 0.48, d: 1.2 }  // G5
    ];

    chordNotes.forEach(n => {
      const startTime = this.ctx.currentTime + n.t;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(n.f, startTime);

      gain.gain.setValueAtTime(0.2, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + n.d);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + n.d + 0.05);
    });
  }

  // Water flow streaming sound
  startWater() {
    if (this.isMuted || this.waterNodes) return;
    this.init();
    if (!this.ctx) return;

    try {
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(450, this.ctx.currentTime);
      filter.Q.setValueAtTime(2.5, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      whiteNoise.start();

      this.waterNodes = { whiteNoise, gain };
    } catch(e){}
  }

  stopWater() {
    if (!this.waterNodes) return;
    try {
      this.waterNodes.gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);
      setTimeout(() => {
        if (this.waterNodes) {
          this.waterNodes.whiteNoise.stop();
          this.waterNodes = null;
        }
      }, 600);
    } catch(e) {
      this.waterNodes = null;
    }
  }
}

export const sound = new SoundEngine();
export default sound;
