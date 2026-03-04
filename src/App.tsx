/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useTimer } from './hooks/useTimer';
import { TimerDisplay } from './components/TimerDisplay';
import { TimerControls } from './components/TimerControls';
import { TimerConfig } from './components/TimerConfig';

export default function App() {
  // Configuration State
  const [minInterval, setMinInterval] = useState(5);
  const [maxInterval, setMaxInterval] = useState(15);
  const [minGap, setMinGap] = useState(2);
  const [maxGap, setMaxGap] = useState(5);
  const [totalReps, setTotalReps] = useState(10);
  
  // Timer Logic Hook
  const {
    isRunning,
    timerMode,
    currentRep,
    timeLeft,
    targetInterval,
    startTimer,
    stopTimer,
    resetTimer
  } = useTimer(minInterval, maxInterval, minGap, maxGap, totalReps);

  return (
    <div className="min-h-screen bg-[var(--bg-color)] flex flex-col items-center justify-center p-6 sm:p-8">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[340px] flex flex-col items-center gap-10 sm:gap-14"
      >
        <TimerDisplay
          timeLeft={timeLeft}
          targetInterval={targetInterval}
          timerMode={timerMode}
          currentRep={currentRep}
          totalReps={totalReps}
          isRunning={isRunning}
        />

        <div className="w-full space-y-6">
          <TimerControls
            isRunning={isRunning}
            onStartStop={isRunning ? stopTimer : startTimer}
            onReset={resetTimer}
          />

          <TimerConfig
            minInterval={minInterval}
            setMinInterval={setMinInterval}
            maxInterval={maxInterval}
            setMaxInterval={setMaxInterval}
            minGap={minGap}
            setMinGap={setMinGap}
            maxGap={maxGap}
            setMaxGap={setMaxGap}
            totalReps={totalReps}
            setTotalReps={setTotalReps}
          />
        </div>
      </motion.div>
    </div>
  );
}
