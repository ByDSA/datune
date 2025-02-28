import type { Pitch } from "./Pitch";
import type { PitchArray } from "./Array";

import type * as BuildingType from "./building";

import * as Constants from "./constants";

import type * as ConversionsType from "./conversions"; // deps: pitches/chromatic

import type * as ModifiersType from "./modifiers"; // deps: intervals/diatonic
import { createProxyBarrel } from "lazy-load";

const staticModule = {
  ...Constants,
};

type LazyType = typeof BuildingType & typeof ConversionsType & typeof ModifiersType;
const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    "building",
    "conversions",
    "modifiers",
  // eslint-disable-next-line no-undef
  ].map(p=>`${__dirname}/${p}`),
} );

export {
  mod as Pitches,
  Pitch,
  PitchArray,
};
