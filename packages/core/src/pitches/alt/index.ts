import type { PitchArray } from "./Array";
import type { fromChromatic } from "./building/chromatic";
import type { fromDiatonicAlts } from "./building/diatonicAlts";
import type * as Constants from "./constants";
import type * as Conversions from "./conversions";
import { createProxyBarrel } from "lazy-load";
import * as Modifiers from "./modifiers";
import { Pitch } from "./Pitch";

const staticModule = {
  ...Modifiers,
};

type LazyType = Omit<typeof Constants, "initialize"> & typeof Conversions & {
  fromChromatic: typeof fromChromatic;
  fromDiatonicAlts: typeof fromDiatonicAlts;
};
const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    "conversions",
    {
      path: "constants",
      omit: ["initialize"],
    },
    "building/chromatic",
    "building/diatonicAlts",
  ],
  // eslint-disable-next-line no-undef
  dirname: __dirname,
} );

export {
  Pitch,
  PitchArray,
  mod as Pitches,
};
