import type * as Building from "./building";
import type * as Constants from "./constants";
import type * as Conversions from "./conversions";
import type * as Modifiers from "./modifiers";
import type { ScaleArray } from "./Array";
import type { Scale } from "./Scale";
import { createProxyBarrel } from "lazy-load";

const staticModule = {};

type LazyType = Omit<typeof Constants, "initialize" | "initializeConstants" | "initializeSets">
& typeof Building & typeof Conversions & typeof Modifiers;
const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    "building",
    "modifiers",
    "conversions",
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
