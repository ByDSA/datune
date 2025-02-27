import { default as Scale } from "./ScalePitch";

import { default as ScaleArray } from "./Array";

import * as Building from "./building";

import type * as Constants from "./constants";
import { createProxyBarrel } from "lazy-load";

const staticModule = {
  ...Building,
};

type LazyType = typeof Constants;
const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    "constants",
  // eslint-disable-next-line no-undef
  ].map(p=>`${__dirname}/${p}`),
} );

export {
  Scale,
  ScaleArray,
  mod as Scales,
};
