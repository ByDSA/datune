import type { fromRootScale } from "./building/rootScale";
import type * as Constants from "./constants";
import { createProxyBarrel } from "lazy-load";
import { Key } from "./Key";
import { KeyArray } from "./Array";
import * as Modifiers from "./modifiers";

const staticModule = {
  ...Modifiers,
};

type LazyType = Omit<typeof Constants, "initialize"> & {
  fromRootScale: typeof fromRootScale;
};

const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    {
      path: "constants",
      omit: ["initialize"],
    },
    "building/rootScale",
  ],
  // eslint-disable-next-line no-undef
  dirname: __dirname,
} );

export {
  Key,
  KeyArray,
  mod as Keys,
};
