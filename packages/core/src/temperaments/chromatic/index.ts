import type * as Constants from "./constants";
import { createProxyBarrel } from "datils/patterns/proxy";
import { Temperament } from "./Temperament";

const staticModule = {};

type LazyType = Omit<typeof Constants, "initialize">;

const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    {
      path: "constants",
      omit: ["initialize"],
      hooks: {
        onLoadModule: (m: typeof Constants)=>!m.ET12 && m.initialize(),
      },
    },
  ],
  // eslint-disable-next-line no-undef
  dirname: __dirname,
} );

export {
  Temperament,
  mod as Temperaments,
};
