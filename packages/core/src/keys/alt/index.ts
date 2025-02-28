import type { Key } from "./Key";

import type { KeyArray } from "./Array";

import type * as BuildingType from "./building";

import type * as Constants from "./constants";
import type * as Conversions from "./conversions";

import * as Modifiers from "./modifiers";
import { createProxyBarrel } from "lazy-load";

const staticModule = {
  ...Modifiers,
};

type LazyType = typeof BuildingType & typeof Constants & typeof Conversions;
const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    "building",
    "conversions",
    "constants",
  // eslint-disable-next-line no-undef
  ].map(p=>`${__dirname}/${p}`),
} );

export {
  Key,
  KeyArray,
  mod as Keys,
};
