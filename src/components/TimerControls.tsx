import React from 'react';
import { RotateCcw } from 'lucide-react';

interface TimerControlsProps {
  isRunning: boolean;
  onStartStop: () => void;
  onReset: () => void;
}

export const TimerControls: React.FC<TimerControlsProps> = ({
  isRunning,
  onStartStop,
  onReset
}) => {
  return (
    <div className="flex gap-3">
      <button
        onClick={onStartStop}
        className={`flex-1 minimal-button py-5 text-sm font-black transition-all ${
          isRunning ? 'bg-white text-[var(--text-primary)]' : 'primary'
        }`}
      >
        {isRunning ? 'Stop' : 'Start'}
      </button>
      <button
        onClick={onReset}
        className="w-16 minimal-button flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
      >
        <RotateCcw size={22} strokeWidth={2.5} />
      </button>
    </div>
  );
};
