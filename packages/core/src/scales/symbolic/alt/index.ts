import type * as Building from "./building";
import type * as Constants from "./constants";
import type * as Modifiers from "./modifiers";
import type { ScaleArray } from "./Array";
import { createProxyBarrel } from "lazy-load";
import { Scale } from "./Scale";

const staticModule = {};

type LazyType = Omit<typeof Constants, "initialize" | "initializeConstants" | "initializeSets">
& typeof Building & typeof Modifiers;
const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    "building",
    "modifiers",
    {
      path: "constants",
      omit: ["initialize", "initializeSets", "initializeConstants"],
      hooks: {
        onLoadModule: (m: typeof Constants)=>!m.MAJOR && m.initialize(),
      },
    },
  ],
  // eslint-disable-next-line no-undef
  dirname: __dirname,
} );

export {
  Scale,
  ScaleArray,
  mod as Scales,
};
