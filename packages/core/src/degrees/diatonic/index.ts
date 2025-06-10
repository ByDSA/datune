import type { Degree } from "./Degree";
import type * as Constants from "./constants";
import { createProxyBarrel } from "datils/patterns/proxy";
import { DegreeArray } from "./Array";

const staticModule = {};

type LazyType = Omit<typeof Constants, "initialize">;
const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    {
      path: "constants",
      omit: ["initialize"],
      hooks: {
        onLoadModule: (m: typeof Constants) => !m.I && m.initialize(),
      },
    },
  ],
  // eslint-disable-next-line no-undef
  dirname: __dirname,
} );

export {
  Degree,
  DegreeArray,
  mod as Degrees,
};
