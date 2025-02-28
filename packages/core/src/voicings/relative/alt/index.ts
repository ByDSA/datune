import { Voicing } from "./Voicing";

import type { VoicingArray } from "./Array";

import { fromVoicings } from "./building/voicings";
import { fromIntraIntervals } from "./building/intraIntervals";
import { fromRootIntervals } from "./building/rootIntervals";

import type * as Constants from "./constants";

import type * as ConversionsType from "./conversions";

import { inv } from "./modifiers/inv";
import { createProxyBarrel } from "lazy-load";

const staticModule = {
  fromIntraIntervals,
  fromRootIntervals,
  fromVoicings,
  inv,
};

type LazyType = typeof Constants & typeof ConversionsType;

const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    "conversions",
    "constants",
  // eslint-disable-next-line no-undef
  ].map(p=>`${__dirname}/${p}`),
} );

export {
  Voicing,
  VoicingArray,
  mod as Voicings,
};
