import type * as DegreeFuncConstants from "./degree-function/constants";
import type * as CompoundFuncsConstants from "./compound-function/constants";
import type * as OtherFuncsConstants from "./others/constants";
import { createProxyBarrel } from "lazy-load";
import { Func } from "./Func";
import { compose } from "./compound-function/building/compose";
import { fromDegreeVoicing } from "./degree-function/building/fromDegreeVoicing";
import { fromDegrees } from "./degree-function/building/fromDegrees";
import { getDegrees } from "./degree-function/conversions";

const staticModule = {
  fromDegreeVoicing,
  fromDegrees,
  compose,
  getDegrees,
};

type LazyType = Omit<typeof CompoundFuncsConstants, "initialize"> & Omit<typeof DegreeFuncConstants, "initialize"> & Omit<typeof OtherFuncsConstants, "initialize">;
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
    {
      path: "others/constants",
      omit: ["initialize"],
      hooks: {
        onLoadModule: (m: typeof OtherFuncsConstants)=>!m.V7ALT && m.initialize(),
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
