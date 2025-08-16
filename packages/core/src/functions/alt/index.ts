import type * as DegreeFuncConstants from "./degree-function/constants";
import type * as CompoundFuncsConstants from "./compound-function/constants";
import { createProxyBarrel } from "datils/patterns/proxy";
import { DegreeFunc } from "./degree-function/DegreeFunc";
import { CompoundFunc } from "./compound-function/CompoundFunc";
import { Func } from "./Func";
import { compose } from "./compound-function/building/compose";
import { fromDegreeIntervalSet } from "./degree-function/building/fromDegreeIntervalSet";
import { fromDegrees } from "./degree-function/building/fromDegrees";
import { getDegrees } from "./degree-function/conversions";

const staticModule = {
  fromDegreeIntervalSet,
  fromDegrees,
  compose,
  getDegrees,
};

type LazyType = Omit<typeof CompoundFuncsConstants, "initialize"> & Omit<typeof DegreeFuncConstants, "initialize">;
const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    {
      path: "degree-function/constants",
      omit: ["initialize"],
      hooks: {
        onLoadModule: (m: typeof DegreeFuncConstants)=>!m.I && m.initialize(),
      },
    },
    {
      path: "compound-function/constants",
      omit: ["initialize"],
      hooks: {
        onLoadModule: (m: typeof CompoundFuncsConstants)=>!m.V_V && m.initialize(),
      },
    },
  ],
  // eslint-disable-next-line no-undef
  dirname: __dirname,
} );

export {
  Func,
  DegreeFunc,
  CompoundFunc,
  mod as Funcs,
};
