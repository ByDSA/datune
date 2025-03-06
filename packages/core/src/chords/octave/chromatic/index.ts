import type { fromKeyFunc } from "./building/key-function";
import type { fromPitches } from "./building/pitches";
import type { fromRootVoicing } from "./building/root-voicing";
import type * as Constants from "./constants";
import type * as Conversions from "./conversions";
import { createProxyBarrel } from "lazy-load";
import * as Modifiers from "./modifiers";
import { Chord } from "./Chord";
import { ChordArray } from "./Array";

export const staticModule = {
  ...Modifiers,
};
type LazyType = Omit<typeof Constants, "initialize"> & typeof Conversions & {
  fromKeyFunc: typeof fromKeyFunc;
  fromPitches: typeof fromPitches;
  fromRootVoicing: typeof fromRootVoicing;
};

const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    "building/key-function",
    "building/pitches",
    "building/root-voicing",
    {
      path: "constants",
      omit: ["initialize"],
      hooks: {
        onLoadModule: (m: typeof Constants) => !m.C && m.initialize(),
      },
    },
    "conversions",
  ],
  // eslint-disable-next-line no-undef
  dirname: __dirname,
} );

export {
  Chord,
  ChordArray,
  mod as Chords,
};
