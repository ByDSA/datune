import { SPNArray } from "./Array";

import type { fromPitchOctave } from "./building/pitch-octave";

import type * as ConstantsType from "./constants";

import type * as ConversionsType from "./conversions";

import * as Modifiers from "./modifiers";
import { SPN } from "./SPN";
import { createProxyBarrel } from "lazy-load";

const staticModule = {
  ...Modifiers,
};

type LazyType = typeof ConstantsType & typeof ConversionsType & {
  fromPitchOctave: typeof fromPitchOctave;
};

const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    "conversions",
    "constants",
    "building/pitch-octave",
  // eslint-disable-next-line no-undef
  ].map(p=>`${__dirname}/${p}`),
} );

export {
  SPN,
  SPNArray,
  mod as SPNs,
};
