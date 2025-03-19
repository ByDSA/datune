import type { ChordArray } from "./Array";
import type * as Constants from "./constants";
import { createProxyBarrel } from "datils/patterns/proxy";
import { Chord } from "./Chord";
import * as Modifiers from "./modifiers";
import * as Building from "./building";

const staticModule = {
  ...Building,
  ...Modifiers,
};

type LazyType = Omit<typeof Constants, "initialize">;
const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    {
      path: "constants",
      omit: ["initialize"],
      hooks: {
        onLoadModule: (m: typeof Constants)=>!m.C && m.initialize(),
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
