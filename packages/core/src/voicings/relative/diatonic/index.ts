import type { Voicing } from "./Voicing";

import type { VoicingArray } from "./Array";

import * as Building from "./building";
import * as Modifiers from "./modifiers";

import type * as Constants from "./constants";
import { createProxyBarrel } from "lazy-load";

const staticModule = {
  ...Building,
  ...Modifiers,
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
  Voicing,
  VoicingArray,
  mod as Voicings,
};
