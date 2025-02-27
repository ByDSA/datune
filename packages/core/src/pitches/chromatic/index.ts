/* eslint-disable no-undef */
import { Array } from "./Array";

import * as Building from "./building";

import * as Constants from "./constants";

import * as Conversions from "./conversions";

import type * as ModifiersType from "./modifiers"; // deps: intervals/chromatic

import Pitch from "./Pitch";
import { createProxyBarrel } from "lazy-load";

const staticModule = {
  ...Building,
  ...Constants,
  ...Conversions,
};

type LazyType = typeof ModifiersType;

const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    __dirname + "/modifiers",
  ],
} );

export {
  mod as Pitches,
  Pitch,
  Array as PitchArray,
};
