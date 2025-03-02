import { Chord } from "./Chord";
import * as Calcs from "./calcs";
import * as Building from "./building";

const mod = {
  ...Calcs,
  ...Building,
};

export {
  Chord,
  mod as Chords,
};
