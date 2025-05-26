/* eslint-disable accessor-pairs */
import { Chords as CChords, Intervals as CIntervals, Pitches as CPitches, PitchSets as CPitchSets, Voicings as CVoicings } from "../src/chromatic";
import { Keys as CKeys } from "../src/keys/chromatic";
import { Funcs as CFuncs } from "../src/functions/chromatic";
import { Chords as AChords, Intervals as AIntervals, Pitches as APitches, PitchSets as APitchSets, Voicings as AVoicings } from "../src/alt";
import { Keys as AKeys } from "../src/keys/alt";
import { Funcs as AFuncs } from "../src/functions/alt";

export type TestCoreModule = {
  type: "Alt" | "Chromatic" | "Diatonic";
  Chords: typeof CChords;
  Pitches: typeof CPitches;
  PitchSets: typeof CPitchSets;
  Voicings: typeof CVoicings;
  Intervals: typeof CIntervals;
  Keys: typeof CKeys;
  Funcs: typeof CFuncs;
};

export const testCoreModules: TestCoreModule[] = [
  {
    type: "Chromatic",
    get Chords() { return CChords; },
    Pitches: CPitches,
    Voicings: CVoicings,
    Intervals: CIntervals,
    PitchSets: CPitchSets,
    get Keys() { return CKeys; },
    get Funcs() { return CFuncs; },
  },
  {
    type: "Alt",
    get Chords() { return AChords; },
    Pitches: APitches,
    Voicings: AVoicings,
    Intervals: AIntervals,
    PitchSets: APitchSets,
    get Keys() { return AKeys; },
    get Funcs() { return AFuncs; },
  } as any,
];
