/* eslint-disable no-undef */
import { default as IntervalArray } from "./Array";

import { fromInt } from "./building";

import * as Caching from "./caching";

import type * as Constants from "./constants";

import IntervalDirection from "./Direction";

import Interval from "./Interval";

import type { isMainInterval } from "./isMainInterval"; // deps: modifiers

import type { abs } from "./modifiers/abs";
import type { add } from "./modifiers/add";
import type { neg } from "./modifiers/neg";
import type { simple } from "./modifiers/simple"; // pitches/diatonic
import type { sub } from "./modifiers/sub";

import { createProxyBarrel } from "lazy-load";

const staticModule = {
  ...Caching,
  fromInt,
};

type LazyType = Omit<typeof Constants, "initialize"> & {
  isMainInterval: typeof isMainInterval;
  abs: typeof abs;
  add: typeof add;
  neg: typeof neg;
  simple: typeof simple;
  sub: typeof sub;
};

const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    __dirname + "/modifiers/abs",
    __dirname + "/modifiers/add",
    __dirname + "/modifiers/neg",
    __dirname + "/modifiers/simple",
    __dirname + "/modifiers/sub",
    __dirname + "/isMainInterval",
    __dirname + "/constants",
  ],
} );

export {
  Interval,
  IntervalArray,
  mod as Intervals,
  IntervalDirection,
};
