import type { MusicalDuration } from "../musical-duration";
import { QUARTER } from "../musical-duration/constants";
import { BPM } from "./BPM";

export type Key = {
  bpm: number;
  beat: MusicalDuration;
};

export function from(bpm: number, beat: MusicalDuration = QUARTER): BPM {
  const key: Key = {
    bpm,
    beat,
  };

  return new (BPM as any)(key);
}
