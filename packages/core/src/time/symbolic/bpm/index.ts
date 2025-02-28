import { BPM } from "./BPM";

import type * as BuildingType from "./building";

import type * as ConstantsType from "./constants";
import { createProxyBarrel } from "lazy-load";

const staticModule = {};

type LazyType = Omit<typeof ConstantsType, "initialize"> & typeof BuildingType;

const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    "building",
    "constants",
  // eslint-disable-next-line no-undef
  ].map(p=>`${__dirname}/${p}`),
} );

export {
  BPM,
  mod as BPMs,
};
