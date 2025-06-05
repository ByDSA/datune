/* eslint-disable import/no-cycle */
import type * as Constants from "./constants";
import type { IntervalArray } from "./Array";
import type { isMainInterval } from "./isMainInterval";
import type { abs } from "./modifiers/abs";
import type { shift } from "./modifiers/shift";
import type { neg } from "./modifiers/neg";
import type { simplify } from "./modifiers/simplify";
import type { shiftDown } from "./modifiers/shiftDown";
import { createProxyBarrel } from "datils/patterns/proxy";
import { fromInt } from "./building/int";
import { Interval } from "./Interval";
import { Direction } from "./Direction";
import { fromChromaticInterval } from "./building";

const staticModule = {
  fromChromaticInterval,
  fromInt,
};

type LazyType = Omit<typeof Constants, "initialize"> & {
  isMainInterval: typeof isMainInterval;
  abs: typeof abs;
  shift: typeof shift;
  neg: typeof neg;
  simplify: typeof simplify;
  shiftDown: typeof shiftDown;
};

const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    "modifiers/abs",
    "modifiers/shift",
    "modifiers/neg",
    "modifiers/simplify",
    "modifiers/shiftDown",
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
