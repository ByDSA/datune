/* eslint-disable import/no-cycle */
import type { IntervalSetArray } from "./Array";
import type * as Constants from "./constants";
import { createProxyBarrel } from "datils/patterns/proxy";
import { IntervalSet } from "./IntervalSet";
import * as Building from "./building";
import * as Modifiers from "./modifiers";

const staticModule = {
  ...Building,
  ...Modifiers,
};

type LazyType = Omit<typeof Constants, "initialize">;

const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    {
      path: "constants",
      omit: ["initialize"],
      hooks: {
        onLoadModule: (m: typeof Constants)=> !m.TRIAD && m.initialize(),
      },
    },
  ],
  // eslint-disable-next-line no-undef
  dirname: __dirname,
} );

export {
  IntervalSet,
  IntervalSetArray,
  mod as IntervalSets,
};
