import type * as Constants from "./constants";
import type * as Building from "./building";
import type * as Conversions from "./conversions";
import type { KeyArray } from "./Array";
import { createProxyBarrel } from "lazy-load";
import { Key } from "./Key";
import * as Modifiers from "./modifiers";

const staticModule = {
  ...Modifiers,
};

type LazyType = Omit<typeof Constants, "initialize"> & typeof Building & typeof Conversions;
const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    "building",
    "conversions",
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
  Key,
  KeyArray,
  mod as Keys,
};
