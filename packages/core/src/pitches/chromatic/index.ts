import type { PitchArray } from "./Array";
import type * as Modifiers from "./modifiers";
import { createProxyBarrel } from "lazy-load";
import { Pitch } from "./Pitch";
import * as Building from "./building";
import * as Constants from "./constants";

const staticModule = {
  ...Building,
  ...Constants,
};

type LazyType = typeof Modifiers;

const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
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
