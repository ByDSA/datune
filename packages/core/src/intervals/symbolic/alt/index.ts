import type { Interval } from "./Interval";
import type { IntervalArray } from "./Array";
import type { between } from "./building/between";
import type { betweenNext } from "./building/betweenNext";
import type { fromIntervalQuality } from "./building/intervalQuality";
import type { fromIntervals } from "./building/intervals";
import type * as Constants from "./constants";
import type * as Conversions from "./conversions";
import type { abs } from "./modifiers/abs";
import type { add } from "./modifiers/add";
import type { cyclic } from "./modifiers/cyclic";
import type { mult } from "./modifiers/mult";
import type { neg } from "./modifiers/neg";
import type { simplify } from "./modifiers/simplify";
import type { serie } from "./modifiers/calcSerie";
import type { sub } from "./modifiers/sub";
import type { Quality } from "./quality/Quality";
import { createProxyBarrel } from "lazy-load";
import * as QualityBuilding from "./quality/building";
import * as QualityConstants from "./quality/constants";
import * as QualityConversions from "./quality/conversions";

const qualityModStatic = {
  ...QualityBuilding,
  ...QualityConstants,
  ...QualityConversions,
};
const qualityMod = qualityModStatic;

export {
  Quality as IntervalQuality,
  qualityMod as IntervalQualities,
};

const staticModule = {};

type LazyType = Omit<typeof Constants, "initialize"> & typeof Conversions & {
  between: typeof between;
  betweenNext: typeof betweenNext;
  fromIntervalQuality: typeof fromIntervalQuality;
  fromIntervals: typeof fromIntervals;
  abs: typeof abs;
  add: typeof add;
  cyclic: typeof cyclic;
  mult: typeof mult;
  neg: typeof neg;
  simplify: typeof simplify;
  serie: typeof serie;
  sub: typeof sub;
};

const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    "building/between",
    "building/betweenNext",
    "building/intervalQuality",
    "building/intervals",
    {
      path: "constants",
      omit: ["initialize"],
      hooks: {
        onLoadModule: (m: typeof Constants)=>!m.P1 && m.initialize(),
      },
    },
    "modifiers/calcSerie",
    "modifiers/abs",
    "modifiers/add",
    "modifiers/cyclic",
    "modifiers/mult",
    "modifiers/neg",
    "modifiers/simplify",
    "modifiers/sub",
    "conversions",
  ],
  // eslint-disable-next-line no-undef
  dirname: __dirname,
} );

export {
  IntervalArray,
  Interval,
  mod as Intervals,
};
