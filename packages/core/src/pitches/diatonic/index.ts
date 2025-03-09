import type { PitchArray } from "./Array";
import type * as Building from "./building";
import type * as Modifiers from "./modifiers";
import { createProxyBarrel } from "lazy-load";
import { Pitch } from "./Pitch";
import * as Constants from "./constants";

const staticModule = {
  ...Constants,
};

type LazyType = typeof Building & typeof Modifiers;
const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    "building",
    "modifiers",
  ],
  // eslint-disable-next-line no-undef
  dirname: __dirname,
} );

export {
  mod as Pitches,
  Pitch,
  PitchArray,
};
