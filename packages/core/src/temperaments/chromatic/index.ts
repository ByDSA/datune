import type * as Constants from "./constants";

import type * as Conversions from "./conversions";

import { default as Temperament } from "./Temperament";
import { createProxyBarrel } from "lazy-load";

const staticModule = {};

type LazyType = typeof Constants & typeof Conversions;

const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    "constants",
    "conversions",
  // eslint-disable-next-line no-undef
  ].map(p=>`${__dirname}/${p}`),
} );

export {
  Temperament,
  mod as Temperaments,
};
