import React from 'react';

interface TimerConfigProps {
  minInterval: number;
  setMinInterval: (val: number) => void;
  maxInterval: number;
  setMaxInterval: (val: number) => void;
  minGap: number;
  setMinGap: (val: number) => void;
  maxGap: number;
  setMaxGap: (val: number) => void;
  totalReps: number;
  setTotalReps: (val: number) => void;
}

export const TimerConfig: React.FC<TimerConfigProps> = ({
  minInterval,
  setMinInterval,
  maxInterval,
  setMaxInterval,
  minGap,
  setMinGap,
  maxGap,
  setMaxGap,
  totalReps,
  setTotalReps
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-5 gap-3">
        <div className="col-span-2 flex flex-col gap-2">
          <div className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] font-black text-left">Interval (sec)</div>
          <div className="flex gap-2">
            <input 
              type="number" value={minInterval || ''} placeholder="Min"
              onChange={(e) => setMinInterval(parseInt(e.target.value) || 0)}
              className="minimal-input py-3 w-full"
            />
            <input 
              type="number" value={maxInterval || ''} placeholder="Max"
              onChange={(e) => setMaxInterval(parseInt(e.target.value) || 0)}
              className="minimal-input py-3 w-full"
            />
          </div>
        </div>
        <div className="col-span-2 flex flex-col gap-2">
          <div className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] font-black text-left">Rest (sec)</div>
          <div className="flex gap-2">
            <input 
              type="number" value={minGap || ''} placeholder="Min"
              onChange={(e) => setMinGap(parseInt(e.target.value) || 0)}
              className="minimal-input py-3 w-full"
            />
            <input 
              type="number" value={maxGap || ''} placeholder="Max"
              onChange={(e) => setMaxGap(parseInt(e.target.value) || 0)}
              className="minimal-input py-3 w-full"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] font-black text-left">Reps</div>
          <input 
            type="number" value={totalReps || ''} placeholder="Rep"
            onChange={(e) => setTotalReps(parseInt(e.target.value) || 0)}
            className="minimal-input py-3 w-full"
          />
        </div>
      </div>
    </div>
  );
};
