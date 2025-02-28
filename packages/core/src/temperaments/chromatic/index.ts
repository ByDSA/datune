import type * as Constants from "./constants";

import { Temperament } from "./Temperament";
import { createProxyBarrel } from "lazy-load";

const staticModule = {};

type LazyType = typeof Constants;

const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    "constants",
  // eslint-disable-next-line no-undef
  ].map(p=>`${__dirname}/${p}`),
} );

export {
  Temperament,
  mod as Temperaments,
};
