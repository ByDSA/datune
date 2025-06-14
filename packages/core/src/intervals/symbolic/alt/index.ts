/* eslint-disable import/no-cycle */
import type { IntervalArray } from "./Array";
import type { between } from "./building/between";
import type { betweenNext } from "./building/betweenNext";
import type { fromIntervalQuality } from "./building/intervalQuality";
import type { fromIntervals } from "./building/intervals";
import type * as Constants from "./constants";
import type { abs } from "./modifiers/abs";
import type { shift } from "./modifiers/shift";
import type { cyclicOctave, degree } from "./modifiers/cyclic-octave";
import type { mult } from "./modifiers/mult";
import type { neg } from "./modifiers/neg";
import type { simplify } from "./modifiers/simplify";
import type { serie } from "./modifiers/calcSerie";
import type { shiftDown } from "./modifiers/shiftDown";
import { createProxyBarrel } from "datils/patterns/proxy";
import { Quality } from "./quality/Quality";
import { Interval } from "./Interval";
import * as QualityBuilding from "./quality/building";
import * as QualityConstants from "./quality/constants";
import * as QualityConversions from "./quality/conversions";
import { from } from "./building/fromDIntervalAlts";
import { fromChromaticInterval } from "./building/fromCInterval";

const qualityModStatic = {
  ...QualityBuilding,
  ...QualityConstants,
  ...QualityConversions,
};
const qualityMod = qualityModStatic;
const staticModule = {};

type LazyType = Omit<typeof Constants, "initialize"> & {
  between: typeof between;
  betweenNext: typeof betweenNext;
  fromIntervalQuality: typeof fromIntervalQuality;
  fromIntervals: typeof fromIntervals;
  from: typeof from;
  fromChromaticInterval: typeof fromChromaticInterval;
  abs: typeof abs;
  shift: typeof shift;
  cyclicOctave: typeof cyclicOctave;
  degree: typeof degree;
  mult: typeof mult;
  neg: typeof neg;
  simplify: typeof simplify;
  serie: typeof serie;
  shiftDown: typeof shiftDown;
};

const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    "building/between",
    "building/betweenNext",
    "building/intervalQuality",
    "building/intervals",
    "building",
    {
      path: "constants",
      omit: ["initialize"],
      hooks: {
        onLoadModule: (m: typeof Constants)=>!m.P1 && m.initialize(),
      },
    },
    "modifiers/calcSerie",
    "modifiers/abs",
    "modifiers/shift",
    "modifiers/cyclic-octave",
    "modifiers/mult",
    "modifiers/neg",
    "modifiers/simplify",
    "modifiers/shiftDown",
  ],
  // eslint-disable-next-line no-undef
  dirname: __dirname,
} );

export {
  IntervalArray,
  Interval,
  mod as Intervals,
  Quality as IntervalQuality,
  qualityMod as IntervalQualities,
};
