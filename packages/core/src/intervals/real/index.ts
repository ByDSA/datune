/* eslint-disable no-undef */
import { default as Interval } from "./Interval";

import { default as IntervalArray } from "./Array";

import * as Building from "./building";

import type * as ConstantsType from "./constants";

import type * as ConversionsType from "./conversions";

import * as IndependentModifiers from "./modifiers/independentModifiers";
import type * as ModifierShiftOctaves from "./modifiers/shiftOctaves";
import type * as ModifierNeg from "./modifiers/neg";
import type * as ModifierMult from "./modifiers/mult";
import { createProxyBarrel } from "lazy-load";

const staticModule = {
  ...Building,
  ...IndependentModifiers,
};

type LazyType = Omit<typeof ConstantsType, "intialize">
  & typeof ConversionsType
  & typeof ModifierMult
  & typeof ModifierNeg
  & typeof ModifierShiftOctaves;

const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    "modifiers/shiftOctaves",
    "modifiers/mult",
    "modifiers/neg",
    "conversions",
    "constants",
  ].map(p=>`${__dirname}/${p}`),
} );

export {
  Interval,
  IntervalArray,
  mod as Intervals,
};
