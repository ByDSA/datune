import type { DegreeArray } from "./Array";
import type { Degree } from "./Degree";
import type * as Conversions from "./conversions";
import { createProxyBarrel } from "lazy-load";
import * as Building from "./building";
import * as Constants from "./constants";
import * as Modifiers from "./modifiers";

const staticModule = {
  ...Building,
  ...Modifiers,
  ...Constants,
};

type LazyType = typeof Constants & typeof Conversions;
const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    "conversions",
  ],
  // eslint-disable-next-line no-undef
  dirname: __dirname,
} );

export {
  Degree,
  DegreeArray,
  mod as Degrees,
};
