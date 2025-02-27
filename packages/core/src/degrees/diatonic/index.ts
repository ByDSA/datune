/* eslint-disable no-undef */
import { default as DegreeArray } from "./Array";

import { default as Degree } from "./Degree";

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
    __dirname + "/conversions",
  ],
} );

export {
  Degree,
  DegreeArray,
  mod as Degrees,
};
