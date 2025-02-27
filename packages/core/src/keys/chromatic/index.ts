import { Key } from "./Key";

import { KeyArray } from "./Array";

import type { fromRootScale } from "./building/rootScale";

import type * as Constants from "./constants";

import * as Modifiers from "./modifiers";

import { createProxyBarrel } from "lazy-load";

const staticModule = {
  ...Modifiers,
};

type LazyType = typeof Constants & {
  fromRootScale: typeof fromRootScale;
};

const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    "constants",
    "building/rootScale",
  // eslint-disable-next-line no-undef
  ].map(p=>`${__dirname}/${p}`),
} );

export {
  Key,
  KeyArray,
  mod as Keys,
};
