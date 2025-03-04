import type * as Constants from "./constants";
import { createProxyBarrel } from "lazy-load";
import { Temperament } from "./Temperament";

const staticModule = {};

type LazyType = Omit<typeof Constants, "initialize">;

const mod = createProxyBarrel<LazyType & typeof staticModule>( {
  staticModule,
  paths: [
    {
      path: "constants",
      omit: ["initialize"],
    },
  ],
  // eslint-disable-next-line no-undef
  dirname: __dirname,
} );

export {
  Temperament,
  mod as Temperaments,
};
