import type * as Constants from "./constants";
import { createProxyBarrel } from "datils/patterns/proxy";
import { Tuning } from "./Tuning";
import * as Calcs from "./calcs";
import * as Building from "./building";

const staticModule = {
  ...Building,
  ...Calcs,
};

type LazyType = Omit<typeof Constants, "initialize">;

const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    {
      path: "constants",
      omit: ["initialize"],
      hooks: {
        onLoadModule: (m: typeof Constants)=>!m.EQUAL_440 && m.initialize(),
      },
    },
  ],
  // eslint-disable-next-line no-undef
  dirname: __dirname,
} );

export {
  Tuning,
  mod as Tunings,
};
