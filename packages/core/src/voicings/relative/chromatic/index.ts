/* eslint-disable no-undef */
import { default as Voicing } from "./Voicing";

import { default as VoicingArray } from "./Array";

import type { fromIntraIntervals } from "./building/intraIntervals";
import type { fromPitches } from "./building/pitches";
import type { fromRootIntervals } from "./building/rootIntervals";

import type * as Constants from "./constants";

import type * as ConversionsType from "./conversions";

import * as Modifiers from "./modifiers";
import { createProxyBarrel } from "lazy-load";

const staticModule = {
  ...Modifiers,
};

type LazyType = typeof Constants & typeof ConversionsType & {
  fromIntraIntervals: typeof fromIntraIntervals;
  fromPitches: typeof fromPitches;
  fromRootIntervals: typeof fromRootIntervals;
};

const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    "building/intraIntervals",
    "building/rootIntervals",
    "building/pitches",
    "constants",
    "conversions",
  ].map(p=>`${__dirname}/${p}`),
} );

export {
  Voicing,
  VoicingArray,
  mod as Voicings,
};
