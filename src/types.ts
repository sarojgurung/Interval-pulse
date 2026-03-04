export type TimerMode = 'INTERVAL' | 'GAP';

export interface TimerConfigState {
  minInterval: number;
  maxInterval: number;
  minGap: number;
  maxGap: number;
  totalReps: number;
}
