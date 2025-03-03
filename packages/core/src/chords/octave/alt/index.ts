import type { Chord } from "./Chord";

import type { ChordArray } from "./Array";

import * as Building from "./building";

import type * as Constants from "./constants";

import type * as ConversionsType from "./conversions";

import * as Modifiers from "./modifiers";
import { createProxyBarrel } from "lazy-load";

const staticModule = {
  ...Building,
  ...Modifiers,
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
  Chord,
  ChordArray,
  mod as Chords,
};
