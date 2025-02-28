import { DegreeArray } from "./Array";

import type { Degree } from "./Degree";

import * as Building from "./building";

import type * as Constants from "./constants";

import type * as ConversionsType from "./conversions";

import * as Modifiers from "./modifiers";
import { createProxyBarrel } from "lazy-load";

const staticModule = {
  ...Building,
  ...Modifiers,
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
  Degree,
  DegreeArray,
  mod as Degrees,
};
