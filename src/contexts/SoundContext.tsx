import { createContext, useContext, ReactNode, useCallback, useRef, useState } from 'react';

type SoundType = 'click' | 'hover' | 'success' | 'toggle';

interface SoundContextType {
  playSound: (type: SoundType) => void;
  isSoundEnabled: boolean;
  toggleSound: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider = ({ children }: { children: ReactNode }) => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const [isSoundEnabled, setIsSoundEnabled] = useState(() => {
    const saved = localStorage.getItem('soundEnabled');
    return saved !== 'false';
  });

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playSound = useCallback((type: SoundType) => {
    if (!isSoundEnabled) return;

    try {
      const ctx = getAudioContext();
      
      // Resume audio context if suspended (needed for some browsers)
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      const now = ctx.currentTime;

      switch (type) {
        case 'click':
          oscillator.frequency.setValueAtTime(800, now);
          oscillator.frequency.exponentialRampToValueAtTime(600, now + 0.05);
          gainNode.gain.setValueAtTime(0.06, now);
          gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
          oscillator.type = 'sine';
          oscillator.start(now);
          oscillator.stop(now + 0.08);
          break;

        case 'hover':
          oscillator.frequency.setValueAtTime(1200, now);
          oscillator.frequency.exponentialRampToValueAtTime(1400, now + 0.02);
          gainNode.gain.setValueAtTime(0.02, now);
          gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
          oscillator.type = 'sine';
          oscillator.start(now);
          oscillator.stop(now + 0.03);
          break;

        case 'success':
          oscillator.frequency.setValueAtTime(523.25, now);
          oscillator.frequency.setValueAtTime(659.25, now + 0.08);
          oscillator.frequency.setValueAtTime(783.99, now + 0.16);
          gainNode.gain.setValueAtTime(0.08, now);
          gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
          oscillator.type = 'sine';
          oscillator.start(now);
          oscillator.stop(now + 0.3);
          break;

        case 'toggle':
          oscillator.frequency.setValueAtTime(600, now);
          oscillator.frequency.exponentialRampToValueAtTime(900, now + 0.05);
          gainNode.gain.setValueAtTime(0.04, now);
          gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
          oscillator.type = 'triangle';
          oscillator.start(now);
          oscillator.stop(now + 0.07);
          break;
      }
    } catch (error) {
      // Silently fail
    }
  }, [isSoundEnabled, getAudioContext]);

  const toggleSound = useCallback(() => {
    setIsSoundEnabled(prev => {
      const newValue = !prev;
      localStorage.setItem('soundEnabled', String(newValue));
      return newValue;
    });
  }, []);

  return (
    <SoundContext.Provider value={{ playSound, isSoundEnabled, toggleSound }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};
