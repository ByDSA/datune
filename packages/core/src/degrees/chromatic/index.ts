import type { DegreeArray } from "./Array";
import { createProxyBarrel } from "datils/patterns/proxy";
import { Degree } from "./Degree";
import * as Building from "./building";
import * as Constants from "./constants";
import * as Modifiers from "./modifiers";

const staticModule = {
  ...Building,
  ...Modifiers,
  ...Constants,
};

type LazyType = typeof Constants;
const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
  ],
  // eslint-disable-next-line no-undef
  dirname: __dirname,
} );

export {
  Degree,
  DegreeArray,
  mod as Degrees,
};
