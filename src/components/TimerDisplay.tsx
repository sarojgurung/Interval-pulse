import React from 'react';
import { motion } from 'motion/react';
import { TimerMode } from '../types';

interface TimerDisplayProps {
  timeLeft: number;
  targetInterval: number;
  timerMode: TimerMode;
  currentRep: number;
  totalReps: number;
  isRunning: boolean;
}

export const TimerDisplay: React.FC<TimerDisplayProps> = ({
  timeLeft,
  targetInterval,
  timerMode,
  currentRep,
  totalReps,
  isRunning
}) => {
  const formatTime = (seconds: number) => {
    const displaySeconds = Math.max(0, seconds);
    const mins = Math.floor(displaySeconds / 60);
    const secs = displaySeconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative w-[320px] h-[320px] sm:w-[380px] h-[380px] flex items-center justify-center">
      <svg className="absolute inset-0 w-full h-full overflow-visible">
        <circle
          cx="50%"
          cy="50%"
          r="45%"
          fill="none"
          stroke="var(--border-color)"
          strokeWidth="8"
        />
        {isRunning && (
          <motion.circle
            key={`${timerMode}-${targetInterval}-${isRunning}`}
            cx="50%"
            cy="50%"
            r="45%"
            fill="none"
            stroke="var(--accent-dark)"
            strokeWidth="12"
            strokeLinecap="round"
            initial={{ 
              pathLength: timerMode === 'INTERVAL' 
                ? 1 - (timeLeft / targetInterval) 
                : (timeLeft / targetInterval) 
            }}
            animate={{ 
              pathLength: timerMode === 'INTERVAL' ? 1 : 0 
            }}
            style={{ 
              rotate: -90,
              originX: "50%",
              originY: "50%"
            }}
            transition={{ 
              duration: timeLeft, 
              ease: "linear" 
            }}
          />
        )}
      </svg>
      
      {/* Inner Content */}
      <div className="relative w-full h-full flex items-center justify-center z-10 -top-[5%]">
        <div 
          className="text-8xl sm:text-9xl font-black tracking-tighter leading-none text-[var(--text-primary)]"
        >
          {formatTime(timeLeft)}
        </div>
        
        <div className="absolute translate-y-[88px] sm:translate-y-[104px] flex flex-col items-center">
          <div className="text-[11px] uppercase tracking-[0.5em] font-black text-[var(--text-primary)] opacity-30">
            {timerMode === 'GAP' ? 'REST' : timerMode}
          </div>
          <div className="text-[9px] uppercase tracking-[0.3em] font-bold mt-2 text-[var(--text-primary)] opacity-20">
            Rep {timerMode === 'INTERVAL' ? currentRep + 1 : currentRep} / {totalReps}
          </div>
        </div>
      </div>

      {/* Subtle Pulse Effect */}
      {isRunning && (
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.08, 0.03, 0.08] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full border-[24px] border-[var(--accent)] pointer-events-none"
        />
      )}
    </div>
  );
};
