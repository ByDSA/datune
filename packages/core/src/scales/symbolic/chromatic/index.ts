import { default as Scale } from "./Scale";

import { default as ScaleArray } from "./Array";

import * as Building from "./building";

import * as Caching from "./caching";

import type * as ConversionsType from "./conversions";
import type * as Constants from "./constants";
import { createProxyBarrel } from "lazy-load";

const staticModule = {
  ...Building,
  ...Caching,
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
