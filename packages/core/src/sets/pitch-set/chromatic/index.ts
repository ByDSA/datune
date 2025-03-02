import { PitchSet } from "./PitchSet";

import * as Building from "./building";

import type * as Constants from "./constants";

import * as Modifiers from "./modifiers";
import { createProxyBarrel } from "lazy-load";

const staticModule = {
  ...Building,
  ...Modifiers,
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
  PitchSet as NoteSet,
  mod as PitchSets,
};
