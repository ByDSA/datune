import { DegreeFunction } from "./degree-function/DegreeFunction";
import { degrees as calcDegrees } from "./degree-function/calcs";
import HarmonicFunction from "./HarmonicFunction";
import type * as DegreeFunctionConstants from "./degree-function/constants";
import type * as CompoundFunctionConstants from "./compound-function/constants";
import type * as OthersFunctionConstants from "./others/constants";
import { compose } from "./compound-function/building/compose";
import { createProxyBarrel } from "lazy-load";

const staticModule = {
  calcDegrees,
  compose,
};

type LazyType = Omit<typeof CompoundFunctionConstants, "initialize"> & Omit<typeof DegreeFunctionConstants, "initialize"> & Omit<typeof OthersFunctionConstants, "initialize">;
const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    "degree-function/constants",
    "compound-function/constants",
    "others/constants",
  // eslint-disable-next-line no-undef
  ].map(p=>`${__dirname}/${p}`),
} );

export {
  DegreeFunction,
  HarmonicFunction,
  mod as Functions,
};
