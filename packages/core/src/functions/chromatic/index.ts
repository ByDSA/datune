import type * as DegreeFuncConstants from "./degree-function/constants";
import type * as CompoundFuncConstants from "./compound-function/constants";
import type * as OthersFuncConstants from "./others/constants";
import { createProxyBarrel } from "lazy-load";
import { compose } from "./compound-function/building/compose";
import { Func } from "./Func";
import { from } from "./degree-function/building/from";

const staticModule = {
  from,
  compose,
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
