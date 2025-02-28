import type { Interval } from "./Interval";
import type { IntervalArray } from "./Array";

import { fromInt } from "./building";

import type * as Constants from "./constants";

import { Direction } from "./Direction";

import type { isMainInterval } from "./isMainInterval"; // deps: modifiers

import type { abs } from "./modifiers/abs";
import type { add } from "./modifiers/add";
import type { neg } from "./modifiers/neg";
import type { simple } from "./modifiers/simple"; // pitches/diatonic
import type { sub } from "./modifiers/sub";

import { createProxyBarrel } from "lazy-load";

const staticModule = {
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
    "modifiers/abs",
    "modifiers/add",
    "modifiers/neg",
    "modifiers/simple",
    "modifiers/sub",
    "isMainInterval",
    "constants",
  // eslint-disable-next-line no-undef
  ].map(p=>`${__dirname}/${p}`),
} );

export {
  Interval,
  IntervalArray,
  mod as Intervals,
  Direction as IntervalDirection,
};
