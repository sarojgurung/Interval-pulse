import { useState, useEffect, useRef, useCallback } from 'react';
import { TimerMode } from '../types';

export function useTimer(
  minInterval: number,
  maxInterval: number,
  minGap: number,
  maxGap: number,
  totalReps: number
) {
  const [isRunning, setIsRunning] = useState(false);
  const [timerMode, setTimerMode] = useState<TimerMode>('INTERVAL');
  const [currentRep, setCurrentRep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [targetInterval, setTargetInterval] = useState(0);
  const [isMuted] = useState(false);

  const audioContextRef = useRef<AudioContext | null>(null);

  const playBeep = useCallback((frequency: number = 880, duration: number = 0.1) => {
    if (isMuted) return;
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.error("Audio failed", e);
    }
  }, [isMuted]);

  const generateRandom = useCallback((minVal: number, maxVal: number) => {
    const min = Math.min(minVal, maxVal);
    const max = Math.max(minVal, maxVal);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }, []);

  const startTimer = () => {
    const safeReps = Math.max(1, totalReps);
    if (currentRep >= safeReps) {
      setCurrentRep(0);
    }
    const nextInterval = Math.max(1, generateRandom(minInterval, maxInterval));
    setTimerMode('INTERVAL');
    setTargetInterval(nextInterval);
    setTimeLeft(nextInterval);
    setIsRunning(true);
    playBeep(440, 0.2);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    stopTimer();
    setCurrentRep(0);
    setTimeLeft(0);
    setTargetInterval(0);
    setTimerMode('INTERVAL');
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  useEffect(() => {
    if (!isRunning) return;

    if (timeLeft === 0) {
      const safeReps = Math.max(1, totalReps);
      if (timerMode === 'INTERVAL') {
        playBeep(880, 0.3);
        const nextRep = currentRep + 1;
        setCurrentRep(nextRep);

        if (nextRep < safeReps) {
          setTimerMode('GAP');
          const nextGap = Math.max(1, generateRandom(minGap, maxGap));
          setTargetInterval(nextGap);
          setTimeLeft(nextGap);
          playBeep(660, 0.2);
        } else {
          setIsRunning(false);
          playBeep(1200, 0.5);
        }
      } else {
        playBeep(440, 0.2);
        setTimerMode('INTERVAL');
        const nextInterval = Math.max(1, generateRandom(minInterval, maxInterval));
        setTargetInterval(nextInterval);
        setTimeLeft(nextInterval);
      }
    }
  }, [isRunning, timeLeft, timerMode, currentRep, totalReps, minInterval, maxInterval, minGap, maxGap, generateRandom, playBeep]);

  return {
    isRunning,
    timerMode,
    currentRep,
    timeLeft,
    targetInterval,
    startTimer,
    stopTimer,
    resetTimer
  };
}
