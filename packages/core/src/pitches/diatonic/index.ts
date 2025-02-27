/* eslint-disable no-undef */
import { default as Array } from "./Array";

import { default as Pitch } from "./Diatonic";

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
    __dirname + "/building",
    __dirname + "/conversions",
    __dirname + "/modifiers",
  ],
} );

export {
  mod as Pitches,
  Pitch,
  Array as PitchArray,
};
