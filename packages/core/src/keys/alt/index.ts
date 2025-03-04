import type * as Constants from "./constants";
import type * as Building from "./building";
import type * as Conversions from "./conversions";
import type { Key } from "./Key";
import type { KeyArray } from "./Array";
import { createProxyBarrel } from "lazy-load";
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
