import type { MusicalDuration } from "../musical-duration";
import { QUARTER } from "../musical-duration/constants";
import { BPM } from "./BPM";

export function from(bpm: number, beat: MusicalDuration = QUARTER): BPM {
  return (BPM as any).create(bpm, beat);
}
