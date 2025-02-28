import { ChordArray } from "./Array";

import { Chord } from "./Chord";

import type { fromKeyFunction } from "./building/key-function"; // chords/chromatic, functions/chromatic, keys/chromatic
import type { fromPitches } from "./building/pitches"; // pitches/chromatic, pitches/chromatic/caching
import type { fromRootVoicing } from "./building/root-voicing"; // fromPitches, pitches/chromatic, voicings/chromatic

import type * as Constants from "./constants";

import type * as ConversionsType from "./conversions";

import * as Modifiers from "./modifiers";
import { createProxyBarrel } from "lazy-load";

export const staticModule = {
  ...Modifiers,
};
type LazyType = typeof Constants & typeof ConversionsType & {
  fromKeyFunction: typeof fromKeyFunction;
  fromPitches: typeof fromPitches;
  fromRootVoicing: typeof fromRootVoicing;
};

const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    "building/key-function",
    "building/pitches",
    "building/root-voicing",
    "constants",
    "conversions",
  // eslint-disable-next-line no-undef
  ].map(p=>`${__dirname}/${p}`),
} );

export {
  Chord,
  ChordArray,
  mod as Chords,
};
