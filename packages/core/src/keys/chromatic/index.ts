import type { from } from "./building/rootScale";
import type * as Constants from "./constants";
import type { KeyArray } from "./Array";
import { createProxyBarrel } from "datils/patterns/proxy";
import { Key } from "./Key";
import * as Modifiers from "./modifiers";
import { fromAltKey } from "./building";

const staticModule = {
  ...Modifiers,
};

type LazyType = Omit<typeof Constants, "initialize"> & {
  from: typeof from;
  fromAltKey: typeof fromAltKey;
};

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
    "building/rootScale",
    "building/fromAltKey",
  ],
  // eslint-disable-next-line no-undef
  dirname: __dirname,
} );

export {
  Key,
  KeyArray,
  mod as Keys,
};
