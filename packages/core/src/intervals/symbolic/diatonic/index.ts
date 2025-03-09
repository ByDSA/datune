import type * as Constants from "./constants";
import type { IntervalArray } from "./Array";
import type { isMainInterval } from "./isMainInterval";
import type { abs } from "./modifiers/abs";
import type { add } from "./modifiers/add";
import type { neg } from "./modifiers/neg";
import type { simplify } from "./modifiers/simplify";
import type { sub } from "./modifiers/sub";
import { createProxyBarrel } from "lazy-load";
import { Interval } from "./Interval";
import { Direction } from "./Direction";
import { fromChromaticInterval, fromInt } from "./building";

const staticModule = {
  fromInt,
  fromChromaticInterval,
};

type LazyType = Omit<typeof Constants, "initialize"> & {
  isMainInterval: typeof isMainInterval;
  abs: typeof abs;
  add: typeof add;
  neg: typeof neg;
  simplify: typeof simplify;
  sub: typeof sub;
};

const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    "modifiers/abs",
    "modifiers/add",
    "modifiers/neg",
    "modifiers/simplify",
    "modifiers/sub",
    "isMainInterval",
    {
      path: "constants",
      omit: ["initialize"],
      hooks: {
        onLoadModule: (m: typeof Constants)=>!m.UNISON && m.initialize(),
      },
    },
  ],
  // eslint-disable-next-line no-undef
  dirname: __dirname,
} );

export {
  Interval,
  IntervalArray,
  mod as Intervals,
  Direction as IntervalDirection,
};
