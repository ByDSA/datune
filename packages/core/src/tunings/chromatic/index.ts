import { Tuning } from "./Tuning";

import * as Calcs from "./calcs";

import type * as Constants from "./constants";
import { createProxyBarrel } from "lazy-load";

const staticModule = {
  ...Calcs,
};

type LazyType = typeof Constants ;

const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    "constants",
  // eslint-disable-next-line no-undef
  ].map(p=>`${__dirname}/${p}`),
} );

export {
  Tuning,
  mod as Tunings,
};
