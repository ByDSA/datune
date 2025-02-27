import { default as ConcertPitch } from "./ConcertPitch";

import { fromFrequencySPN } from "./building/frequencySPN";

import type * as Constants from "./constants";
import { createProxyBarrel } from "lazy-load";

const staticModule = {
  fromFrequencySPN,
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
  ConcertPitch,
  mod as ConcertPitches,
};
