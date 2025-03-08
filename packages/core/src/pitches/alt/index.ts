import type { PitchArray } from "./Array";
import type { fromChromatic } from "./building/chromatic";
import type { fromDPitchAlts } from "./building/diatonicAlts";
import type { fromChromaticInPitchArray } from "./building/chromaticInPitchArray";
import type * as Constants from "./constants";
import type * as Conversions from "./conversions";
import { createProxyBarrel } from "lazy-load";
import * as Modifiers from "./modifiers";
import { Pitch } from "./Pitch";
import { fromChromaticAndDiatonic } from "./building/chromaticAndDiatonic";

const staticModule = {
  ...Modifiers,
};

type LazyType = Omit<typeof Constants, "initialize"> & typeof Conversions & {
  fromChromatic: typeof fromChromatic;
  fromChromaticAndDiatonic: typeof fromChromaticAndDiatonic;
  fromDPitchAlts: typeof fromDPitchAlts;
  fromChromaticInPitchArray: typeof fromChromaticInPitchArray;
};
const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    "conversions",
    {
      path: "constants",
      omit: ["initialize"],
      hooks: {
        onLoadModule: (m: typeof Constants) => !m.C && m.initialize(),
      },
    },
    "building/chromatic",
    "building/chromaticAndDiatonic",
    "building/diatonicAlts",
    "building/chromaticInPitchArray",
  ],
  // eslint-disable-next-line no-undef
  dirname: __dirname,
} );

export {
  Pitch,
  PitchArray,
  mod as Pitches,
};
