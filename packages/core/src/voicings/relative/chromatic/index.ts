import type { VoicingArray } from "./Array";
import type * as Constants from "./constants";
import { createProxyBarrel } from "lazy-load";
import * as Modifiers from "./modifiers";
import * as Building from "./building";
import { Voicing } from "./Voicing";

const staticModule = {
  ...Modifiers,
};

type LazyType = Omit<
typeof Constants,
"initialize" |
"initializeN2" |
"initializeN3" |
"initializeN4" |
"initializeN5" |
"initializeN6" |
"initializeN7" |
"initializeSets"
> & typeof Building;

const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    "building",
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
        onLoadModule: (m: typeof Constants)=> !m.TRIAD_MAJOR && m.initialize(),
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
