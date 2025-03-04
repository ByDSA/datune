import type * as Building from "./building";
import type * as Constants from "./constants";
import { createProxyBarrel } from "lazy-load";
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
    },
  ],
  // eslint-disable-next-line no-undef
  dirname: __dirname,
} );

export {
  BPM,
  mod as BPMs,
};
