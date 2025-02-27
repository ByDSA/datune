import { OCTAVE } from "../constants";
import Interval from "../Interval";
import add from "./add";
import { mult } from "./mult";
import sub from "./sub";

export function shiftOctaves(self: Interval, octaves: number): Interval {
  const octavesInterval = mult(OCTAVE, Math.abs(octaves));

  if (octaves > 0)
    return add(self, octavesInterval);

  return sub(self, octavesInterval);
}
