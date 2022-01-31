import { MusicalDuration, QUARTER } from "../musical-duration";
import BPM from "./BPM";

/* eslint-disable import/prefer-default-export */
export function from(bpm: number, beat: MusicalDuration = QUARTER): BPM {
  return (BPM as any).create(bpm, beat);
}
