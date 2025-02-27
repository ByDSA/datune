/* eslint-disable no-undef */
import { default as IntervalArray } from "./Array";

import { default as Interval } from "./Interval";

import * as Building from "./building";

import * as Constants from "./constants";

import type * as ConversionsType from "./conversions";

import * as Modifiers from "./modifiers";
import { createProxyBarrel } from "lazy-load";

const staticModule = {
  ...Building,
  ...Constants,
  ...Modifiers,
};

type LazyType = typeof ConversionsType;

const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    __dirname + "/conversions",
  ],
} );

export {
  Interval,
  IntervalArray,
  mod as Intervals,
};
