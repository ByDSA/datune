import type { VoicingArray } from "./Array";
import type * as Constants from "./constants";
import { createProxyBarrel } from "lazy-load";
import { Voicing } from "./Voicing";
import * as Building from "./building";
import * as Modifiers from "./modifiers";

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
        onLoadModule: (m: typeof Constants)=> !m.TRIAD && m.initialize(),
      },
    },
  ],
  // eslint-disable-next-line no-undef
  dirname: __dirname,
} );

export {
  Voicing,
  VoicingArray,
  mod as Voicings,
};
