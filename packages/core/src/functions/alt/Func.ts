import type { Chord, Pitch } from "alt";
import type { IFunc } from "functions/IFunc";
import type { Func as CFunc } from "functions/chromatic/Func";

export type Func = IFunc<Pitch, Chord> & {
  toChromaticFunc(): CFunc;
};
