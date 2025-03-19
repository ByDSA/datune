import type * as Constants from "./constants";
import type * as Conversions from "./conversions";
import { createProxyBarrel } from "datils/patterns/proxy";
import { Spn } from "./Spn";
import { SpnArray } from "./Array";
import * as Building from "./building";
import * as Modifiers from "./modifiers";

const staticModule = {
  ...Building,
  ...Modifiers,
};

type LazyType = Omit<typeof Constants, "initialize"> & typeof Conversions;

const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    {
      path: "constants",
      omit: ["initialize"],
      hooks: {
        onLoadModule: (m: typeof Constants)=>!m.C0 && m.initialize(),
      },
    },
    "conversions",
  ],
  // eslint-disable-next-line no-undef
  dirname: __dirname,
} );

export {
  Spn,
  SpnArray,
  mod as Spns,
};
