import type { Interval } from "../Interval";
import { OCTAVE } from "../constants";
import { shift } from "./shift";
import { mult } from "./mult";
import { shiftDown } from "./shiftDown";

export function shiftOctaves(self: Interval, octaves: number): Interval {
  const octavesInterval = mult(OCTAVE, Math.abs(octaves));

  if (octaves > 0)
    return shift(self, octavesInterval);

  return shiftDown(self, octavesInterval);
}
