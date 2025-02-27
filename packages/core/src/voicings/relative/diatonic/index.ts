/* eslint-disable no-undef */
import { default as Voicing } from "./DiatonicVoicing";

import { default as VoicingArray } from "./Array";

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
  ].map(p=>`${__dirname}/${p}`),
} );

export {
  Voicing,
  VoicingArray,
  mod as Voicings,
};
