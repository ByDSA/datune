/* eslint-disable no-undef */
import DegreeArray from "./Array";

import Degree from "./Degree";

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
    __dirname + "/conversions",
    __dirname + "/constants",
  ],
} );

export {
  Degree,
  DegreeArray,
  mod as Degrees,
};
