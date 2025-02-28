import { Scale } from "./Scale";

import { ScaleArray } from "./Array";

import * as Building from "./building";

import type * as ConversionsType from "./conversions";
import type * as Constants from "./constants";
import { createProxyBarrel } from "lazy-load";

const staticModule = {
  ...Building,
};

type LazyType = typeof Constants & typeof ConversionsType;
const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    "conversions",
    "constants",
  // eslint-disable-next-line no-undef
  ].map(p=>`${__dirname}/${p}`),
} );

export {
  Scale,
  ScaleArray,
  mod as Scales,
};
