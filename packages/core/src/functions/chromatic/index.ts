import type * as DegreeFuncConstants from "./degree-function/constants";
import type * as CompoundFuncConstants from "./compound-function/constants";
import type * as OthersFuncConstants from "./others/constants";
import { createProxyBarrel } from "datils/patterns/proxy";
import { compose } from "./compound-function/building/compose";
import { Func } from "./Func";
import { fromDegreeVoicing } from "./degree-function/building/fromDegreeVoicing";
import { fromDegrees } from "./degree-function/building/fromDegrees";
import { getDegrees } from "./degree-function/conversions";

const staticModule = {
  fromDegreeVoicing,
  fromDegrees,
  compose,
  getDegrees,
};

type LazyType = Omit<typeof CompoundFuncConstants, "initialize"> & Omit<typeof DegreeFuncConstants, "initialize"> & Omit<typeof OthersFuncConstants, "initialize">;
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
        onLoadModule: (m: typeof CompoundFuncConstants)=>!m.V_V && m.initialize(),
      },
    },
    {
      path: "others/constants",
      omit: ["initialize"],
      hooks: {
        onLoadModule: (m: typeof OthersFuncConstants)=>!m.V7ALT && m.initialize(),
      },
    },
  ],
  // eslint-disable-next-line no-undef
  dirname: __dirname,
} );

export {
  Func,
  mod as Funcs,
};
