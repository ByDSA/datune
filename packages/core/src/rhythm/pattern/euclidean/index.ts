import type { RhythmPattern } from "../Pattern";
import { EuclideanRhythmCalculator } from "./EuclideanRhythmCalculator";

export function calculateEuclideanRhythm(onNotes: number, totalNotes: number): RhythmPattern {
  return EuclideanRhythmCalculator.calculate(onNotes, totalNotes);
}
