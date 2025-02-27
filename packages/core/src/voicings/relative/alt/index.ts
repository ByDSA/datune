/* eslint-disable no-undef */
import { default as Voicing } from "./Voicing";

import { default as VoicingArray } from "./Array";

import { fromVoicings } from "./building/voicings";
import { fromIntraIntervals } from "./building/intraIntervals";
import { fromRootIntervals } from "./building/rootIntervals";

import { hash as hashDto, hashObj as hash } from "./caching";

import type * as Constants from "./constants";

import type * as ConversionsType from "./conversions";

import { inv } from "./modifiers/inv";
import { createProxyBarrel } from "lazy-load";

const staticModule = {
  fromIntraIntervals,
  fromRootIntervals,
  fromVoicings,
  hashDto,
  hash,
  inv,
};

type LazyType = typeof Constants & typeof ConversionsType;

const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    "conversions",
    "constants",
  ].map(p=>`${__dirname}/${p}`),
} );

export {
  Voicing,
  VoicingArray,
  mod as Voicings,
};
