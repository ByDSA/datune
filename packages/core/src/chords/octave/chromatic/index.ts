import type { fromKeyFunc } from "./building/keyFunc";
import type { from } from "./building/from";
import type { fromPitches } from "./building/pitches";
import type { fromRootVoicing } from "./building/rootVoicing";
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
  from: typeof from;
  fromRootVoicing: typeof fromRootVoicing;
  fromAltChord: typeof fromAltChord;
};

const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    "building/from",
    "building/fromAltChord",
    "building/keyFunc",
    "building/pitches",
    "building/rootVoicing",
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
