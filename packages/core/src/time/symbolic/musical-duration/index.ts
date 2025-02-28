import type * as fromType from "./building/from";

import type * as fromMillisAndBPMType from "./building/fromMillisAndBPM";

import type * as ConstantsType from "./constants";

import * as Modifiers from "./modifiers";

import type { MusicalDuration } from "./MusicalDuration";

import { createProxyBarrel } from "lazy-load";

const staticModule = {
  ...Modifiers,
};

type LazyType = Omit<typeof ConstantsType, "initialize"> & typeof fromMillisAndBPMType & typeof fromType;

const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    "building/from",
    "building/fromMillisAndBPM",
    "constants",
  // eslint-disable-next-line no-undef
  ].map(p=>`${__dirname}/${p}`),
} );

export {
  MusicalDuration,
  mod as MusicalDurations,
};
