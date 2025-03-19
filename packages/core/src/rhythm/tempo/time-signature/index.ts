import type * as Building from "./building";
import { createProxyBarrel } from "datils/patterns/proxy";
import { TimeSignature } from "./TimeSignature";
import * as Constants from "./constants";

const staticModule = {
  ...Constants,
};

type LazyType = typeof Building;

const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    "building",
  ],
  // eslint-disable-next-line no-undef
  dirname: __dirname,
} );

export {
  mod as TimeSignatures,
  TimeSignature,
};
