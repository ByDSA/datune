import type { fromPitchOctave } from "./building/pitch-octave";
import type * as Constants from "./constants";
import { createProxyBarrel } from "lazy-load";
import * as Modifiers from "./modifiers";
import { SPN } from "./SPN";
import { SPNArray } from "./Array";

const staticModule = {
  ...Modifiers,
};

type LazyType = Omit<typeof Constants, "initialize" | "initializeAll" | "initializeValues"> & {
  fromPitchOctave: typeof fromPitchOctave;
};

const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    {
      path: "constants",
      omit: ["initialize", "initializeAll", "initializeValues"],
      hooks: {
        onLoadModule: (m: typeof Constants)=>!m.C0 && m.initialize(),
      },
    },
    "building/pitch-octave",
  ],
  // eslint-disable-next-line no-undef
  dirname: __dirname,
} );

export {
  SPN,
  SPNArray,
  mod as SPNs,
};
