import type * as Building from "./building";
import type { TimeSignature } from "./TimeSignature";
import { createProxyBarrel } from "lazy-load";
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
