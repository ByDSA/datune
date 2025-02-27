/* eslint-disable no-undef */
import Interval from "./Interval";

import IntervalArray from "./Array";

import type { betweenMin } from "./building/betweenMin";
import type { betweenNext } from "./building/betweenNext";
import type { fromIntervalQuality } from "./building/intervalQuality";
import type { fromIntervals } from "./building/intervals";

import type { hash } from "./caching/hash"; // intervals/diatonic, intervals/quality

import type * as Constants from "./constants";

import type * as ConversionsType from "./conversions";

import type { abs } from "./modifiers/abs";
import type { add } from "./modifiers/add";
import type { cyclic } from "./modifiers/cyclic";
import type { mult } from "./modifiers/mult";
import type { neg } from "./modifiers/neg";
import type { simple } from "./modifiers/simple";
import type { serie } from "./modifiers/calcSerie";
import type { sub } from "./modifiers/sub";
import { createProxyBarrel } from "lazy-load";

const staticModule = {};

type LazyType = typeof Constants & typeof ConversionsType & {
  betweenMin: typeof betweenMin;
  betweenNext: typeof betweenNext;
  fromIntervalQuality: typeof fromIntervalQuality;
  fromIntervals: typeof fromIntervals;
  hash: typeof hash;
  abs: typeof abs;
  add: typeof add;
  cyclic: typeof cyclic;
  mult: typeof mult;
  neg: typeof neg;
  simple: typeof simple;
  serie: typeof serie;
  sub: typeof sub;
};

const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    "building/betweenMin",
    "building/betweenNext",
    "building/intervalQuality",
    "building/intervals",
    "constants",
    "caching/hash",
    "modifiers/calcSerie",
    "modifiers/abs",
    "modifiers/add",
    "modifiers/cyclic",
    "modifiers/mult",
    "modifiers/neg",
    "modifiers/simple",
    "modifiers/sub",
    "conversions",
  ].map(p=>`${__dirname}/${p}`),
} );

export {
  IntervalArray,
  Interval,
  mod as Intervals,
};
