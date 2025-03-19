/* eslint-disable import/no-cycle */
import type { fromKeyFunc } from "./building/key-function";
import type { fromPitches } from "./building/pitches";
import type { fromRootVoicing } from "./building/root-voicing";
import type * as Constants from "./constants";
import type * as Modifiers from "./modifiers";
import { createProxyBarrel } from "datils/patterns/proxy";
import { Chord } from "./Chord";
import { ChordArray } from "./Array";
import { fromAltChord } from "./building/fromAltChord";

export const staticModule = {};
type LazyType = Omit<typeof Constants, "initialize"> & typeof Modifiers & {
  fromKeyFunc: typeof fromKeyFunc;
  fromPitches: typeof fromPitches;
  fromRootVoicing: typeof fromRootVoicing;
  fromAltChord: typeof fromAltChord;
};

const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    "building/key-function",
    "building/pitches",
    "building/root-voicing",
    "building/fromAltChord",
    "modifiers",
    {
      path: "constants",
      omit: ["initialize"],
      hooks: {
        onLoadModule: (m: typeof Constants) => !m.C && m.initialize(),
      },
    },
  ],
  // eslint-disable-next-line no-undef
  dirname: __dirname,
} );

export {
  Chord,
  ChordArray,
  mod as Chords,
};
