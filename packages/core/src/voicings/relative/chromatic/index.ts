import type { Voicing } from "./Voicing";

import type { VoicingArray } from "./Array";

import type { fromIntraIntervals } from "./building/intraIntervals";
import type { fromPitches } from "./building/pitches";
import type { fromRootIntervals } from "./building/rootIntervals";

import type * as Constants from "./constants";

import * as Modifiers from "./modifiers";
import { createProxyBarrel } from "lazy-load";

const staticModule = {
  ...Modifiers,
};

type LazyType = typeof Constants & {
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
  // eslint-disable-next-line no-undef
  ].map(p=>`${__dirname}/${p}`),
} );

export {
  Voicing,
  VoicingArray,
  mod as Voicings,
};
