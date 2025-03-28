import type * as Building from "./building";
import type * as Constants from "./constants";
import { createProxyBarrel } from "datils/patterns/proxy";
import { BPM } from "./BPM";

const staticModule = {};

type LazyType = Omit<typeof Constants, "initialize"> & typeof Building;

const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    "building",
    {
      path: "constants",
      omit: ["initialize"],
      hooks: {
        onLoadModule: (m: typeof Constants)=>!m.QUARTER_120 && m.initialize(),
      },
    },
  ],
  // eslint-disable-next-line no-undef
  dirname: __dirname,
} );

export {
  BPM,
  mod as BPMs,
};
