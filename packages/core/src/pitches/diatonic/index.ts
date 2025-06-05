/* eslint-disable import/no-cycle */
import type { PitchArray } from "./Array";
import type * as Building from "./building";
import type * as Modifiers from "./modifiers";
import { createProxyBarrel } from "datils/patterns/proxy";
import { Pitch } from "./Pitch";
import * as Constants from "./constants";

const staticModule = {};

type LazyType = typeof Building & typeof Constants & typeof Modifiers;
const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    "building",
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
