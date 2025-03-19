/* eslint-disable import/no-cycle */
import type { VoicingArray } from "./Array";
import type * as Constants from "./constants";
import type * as Conversions from "./conversions";
import { createProxyBarrel } from "datils/patterns/proxy";
import { Voicing } from "./Voicing";
import * as Building from "./building";
import * as Modifiers from "./modifiers";

const staticModule = {
  ...Building,
  ...Modifiers,
};

type LazyType = Omit<
typeof Constants,
"initialize"
| "initializeN2"
| "initializeN3"
| "initializeN4"
| "initializeN5"
| "initializeN6"
| "initializeN7"
| "initializeSets"
> & typeof Conversions;

const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    "conversions",
    {
      path: "constants",
      omit: [
        "initialize",
        "initializeN2",
        "initializeN3",
        "initializeN4",
        "initializeN5",
        "initializeN6",
        "initializeN7",
        "initializeSets",
      ],
      hooks: {
        onLoadModule: (m: typeof Constants)=>!m.TRIAD_MAJOR && m.initialize(),
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
