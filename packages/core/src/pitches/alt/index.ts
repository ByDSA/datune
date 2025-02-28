import type { Pitch } from "./Pitch";
import type { PitchArray } from "./Array";
import { fixAlts } from "./fixAlts";
import type { fromChromatic } from "./building/chromatic";
import type { fromDiatonicAlts } from "./building/diatonicAlts";
import type * as Constants from "./constants";
import type * as ConversionsType from "./conversions";
import * as Modifiers from "./modifiers";
import { calcAlts } from "./calcAlts";
import { createProxyBarrel } from "lazy-load";

const staticModule = {
  ...Modifiers,
  calcAlts,
  fixAlts,
};

type LazyType = typeof Constants & typeof ConversionsType & {
  fromChromatic: typeof fromChromatic;
  fromDiatonicAlts: typeof fromDiatonicAlts;
};
const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    "conversions",
    "constants",
    "building/chromatic",
    "building/diatonicAlts",
  // eslint-disable-next-line no-undef
  ].map(p=>`${__dirname}/${p}`),
} );

export {
  Pitch,
  PitchArray,
  mod as Pitches,
};
