import { Scale } from "./Scale";

import { ScaleArray } from "./Array";

import type * as BuildingType from "./building";

import type * as Constants from "./constants";

import type * as ConversionsType from "./conversions";

import type * as Modifiers from "./modifiers";
import { createProxyBarrel } from "lazy-load";

const staticModule = {};

type LazyType = typeof BuildingType & typeof Constants & typeof ConversionsType & typeof Modifiers;
const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    "building",
    "modifiers",
    "conversions",
    "constants",
  // eslint-disable-next-line no-undef
  ].map(p=>`${__dirname}/${p}`),
} );

export {
  Scale,
  ScaleArray,
  mod as Scales,
};
