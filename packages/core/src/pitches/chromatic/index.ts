/* eslint-disable import/no-cycle */
import type { PitchArray } from "./Array";
import type * as Modifiers from "./modifiers";
import type * as Constants from "./constants";
import { createProxyBarrel } from "datils/patterns/proxy";
import { Pitch } from "./Pitch";
import * as Building from "./building";

const staticModule = {
  ...Building,
};

type LazyType = typeof Constants & typeof Modifiers;

const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    "modifiers",
    "constants",
  ],
  // eslint-disable-next-line no-undef
  dirname: __dirname,
} );

export {
  mod as Pitches,
  Pitch,
  PitchArray,
};
