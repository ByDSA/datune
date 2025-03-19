import type { Degree } from "./Degree";
import type * as Conversions from "./conversions";
import { createProxyBarrel } from "datils/patterns/proxy";
import { DegreeArray } from "./Array";
import * as Building from "./building";
import * as Contants from "./constants";

const staticModule = {
  ...Building,
  ...Contants,
};

type LazyType = typeof Conversions;
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
