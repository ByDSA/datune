export {
  Chord as ChordAlt,
} from "chords/alt";

export {
  Chord,
} from "chords/chromatic";

export {
  Interval as IntervalAlt,
} from "intervals/alt";

export {
  Interval,
} from "intervals/chromatic";

export {
  Interval as DiatonicInterval,
} from "intervals/diatonic";

export {
  Quality,
} from "intervals/quality";

export {
  Pitch as PitchAlt,
} from "pitches/alt";

export {
  Pitch,
} from "pitches/chromatic";

export {
  Pitch as DiatonicPitch,
} from "pitches/diatonic";

export * from "voicings";

export {
  initialize as init, load, loadSync,
} from "./initialization";

export {
  BPM,
  MusicalDuration,
  RhythmPattern,
  TimeSignature,
} from "./time";

export * from "./keys/chromatic";

export {
  Key as KeyAlt,
  KeyArray as KeyAltArray,
} from "./keys/alt";

export {
  IKey,
} from "./keys/Key";
