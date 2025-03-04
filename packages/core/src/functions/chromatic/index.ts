import type * as DegreeFunctionConstants from "./degree-function/constants";
import type * as CompoundFunctionConstants from "./compound-function/constants";
import type * as OthersFunctionConstants from "./others/constants";
import { createProxyBarrel } from "lazy-load";
import { compose } from "./compound-function/building/compose";
import { HarmonicFunction } from "./HarmonicFunction";
import { from } from "./degree-function/building/from";

const staticModule = {
  from,
  compose,
};

type LazyType = Omit<typeof CompoundFunctionConstants, "initialize"> & Omit<typeof DegreeFunctionConstants, "initialize"> & Omit<typeof OthersFunctionConstants, "initialize">;
const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    {
      path: "degree-function/constants",
      omit: ["initialize"],
    },
    {
      path: "compound-function/constants",
      omit: ["initialize"],
    },
    {
      path: "others/constants",
      omit: ["initialize"],
    },
  ],
  // eslint-disable-next-line no-undef
  dirname: __dirname,
} );

export {
  HarmonicFunction,
  mod as Functions,
};
