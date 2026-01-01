import { useCallback, useRef } from 'react';

type SoundType = 'click' | 'hover' | 'success' | 'toggle';

export const useSoundEffects = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const isEnabledRef = useRef(true);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playSound = useCallback((type: SoundType) => {
    if (!isEnabledRef.current) return;

    try {
      const ctx = getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      const now = ctx.currentTime;

      switch (type) {
        case 'click':
          oscillator.frequency.setValueAtTime(800, now);
          oscillator.frequency.exponentialRampToValueAtTime(600, now + 0.05);
          gainNode.gain.setValueAtTime(0.08, now);
          gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
          oscillator.type = 'sine';
          oscillator.start(now);
          oscillator.stop(now + 0.08);
          break;

        case 'hover':
          oscillator.frequency.setValueAtTime(1200, now);
          oscillator.frequency.exponentialRampToValueAtTime(1400, now + 0.03);
          gainNode.gain.setValueAtTime(0.03, now);
          gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
          oscillator.type = 'sine';
          oscillator.start(now);
          oscillator.stop(now + 0.04);
          break;

        case 'success':
          oscillator.frequency.setValueAtTime(523.25, now); // C5
          oscillator.frequency.setValueAtTime(659.25, now + 0.1); // E5
          oscillator.frequency.setValueAtTime(783.99, now + 0.2); // G5
          gainNode.gain.setValueAtTime(0.1, now);
          gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
          oscillator.type = 'sine';
          oscillator.start(now);
          oscillator.stop(now + 0.4);
          break;

        case 'toggle':
          oscillator.frequency.setValueAtTime(600, now);
          oscillator.frequency.exponentialRampToValueAtTime(900, now + 0.06);
          gainNode.gain.setValueAtTime(0.05, now);
          gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
          oscillator.type = 'triangle';
          oscillator.start(now);
          oscillator.stop(now + 0.08);
          break;
      }
    } catch (error) {
      // Silently fail if audio context is not available
      console.log('Audio not available');
    }
  }, [getAudioContext]);

  const toggleSounds = useCallback((enabled: boolean) => {
    isEnabledRef.current = enabled;
  }, []);

  return { playSound, toggleSounds };
};

export default useSoundEffects;
