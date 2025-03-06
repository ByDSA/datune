import type * as Constants from "./constants";
import type { Scale } from "./Scale";
import type { ScaleArray } from "./Array";
import { createProxyBarrel } from "lazy-load";
import * as Building from "./building";

const staticModule = {
  ...Building,
};

type LazyType = Omit<typeof Constants, "initialize">;
const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    {
      path: "constants",
      omit: ["initialize"],
      hooks: {
        onLoadModule: (m: typeof Constants)=>!m.ET12_MAJOR && m.initialize(),
      },
    },
  ],
  // eslint-disable-next-line no-undef
  dirname: __dirname,
} );

export {
  Scale,
  ScaleArray,
  mod as Scales,
};
