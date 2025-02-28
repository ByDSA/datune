import { DegreeArray } from "./Array";

import type { Degree } from "./Degree";

import * as Building from "./building";

import * as Contants from "./constants";

import type * as ConversionsType from "./conversions";
import { createProxyBarrel } from "lazy-load";

const staticModule = {
  ...Building,
  ...Contants,
};

type LazyType = typeof ConversionsType;
const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    // eslint-disable-next-line no-undef
    __dirname + "/conversions",
  ],
} );

export {
  Degree,
  DegreeArray,
  mod as Degrees,
};
