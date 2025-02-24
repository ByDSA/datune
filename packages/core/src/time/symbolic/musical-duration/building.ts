import BPM from "../bpm/BPM";
import MusicalDuration from "./MusicalDuration";

export function from(value: number): MusicalDuration {
  return value;
}

export function fromMillisAndBPM(millis: number, bpm: BPM): MusicalDuration {
  const millisBeat = bpm.getMillis(bpm.beat);
  const millisWhole = millisBeat / +bpm.beat;
  const value = millis / millisWhole;

  return from(value);
}
