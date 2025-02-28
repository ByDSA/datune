import { Pitch } from "./Pitch";
import type { PitchArray } from "./Array";

import * as Building from "./building";

import * as Constants from "./constants";

import type * as ModifiersType from "./modifiers"; // deps: intervals/chromatic

import { createProxyBarrel } from "lazy-load";

const staticModule = {
  ...Building,
  ...Constants,
};

type LazyType = typeof ModifiersType;

const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    // eslint-disable-next-line no-undef
    __dirname + "/modifiers",
  ],
} );

export {
  mod as Pitches,
  Pitch,
  PitchArray,
};
