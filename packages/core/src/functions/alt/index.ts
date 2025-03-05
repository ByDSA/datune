import type { Func } from "./Func";
import type * as DegreeFuncConstants from "./degree-function/constants";
import type * as CompoundFuncsConstants from "./compound-function/constants";
import type * as OtherFuncsConstants from "./others/constants";
import { createProxyBarrel } from "lazy-load";
import { compose } from "./compound-function/building/compose";
import { calcDegrees } from "./degree-function/calcs";

const staticModule = {
  calcDegrees,
  compose,
};

type LazyType = Omit<typeof CompoundFuncsConstants, "initialize"> & Omit<typeof DegreeFuncConstants, "initialize"> & Omit<typeof OtherFuncsConstants, "initialize">;
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
  Func,
  mod as Funcs,
};
