import type * as BuildingType from "./building";

import * as Constants from "./constants";

import { TimeSignature } from "./TimeSignature";
import { createProxyBarrel } from "lazy-load";

const staticModule = {
  ...Constants,
};

type LazyType = typeof BuildingType;

const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    "building",
  // eslint-disable-next-line no-undef
  ].map(p=>`${__dirname}/${p}`),
} );

export {
  mod as TimeSignatures,
  TimeSignature,
};
