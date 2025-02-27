import * as DegreeFunctions from "../degree-function/constants";
import { compose } from "./building/compose";
import { CompoundFunction } from "./CompoundFunction";
import { Degrees as C } from "degrees/chromatic";

export function initialize() {
  const { SUBV7, V, V7 } = DegreeFunctions;

  V_II = compose(V, C.II);
  V_III = compose(V, C.III);
  V_IV = compose(V, C.IV);
  V_V = compose(V, C.V);
  V_VI = compose(V, C.VI);

  V7_II = compose(V7, C.II);
  V7_III = compose(V7, C.III);
  V7_IV = compose(V7, C.IV);
  V7_V = compose(V7, C.V);
  V7_VI = compose(V7, C.VI);

  SUBV7_II = compose(SUBV7, C.II);
  SUBV7_III = compose(SUBV7, C.III);
  SUBV7_IV = compose(SUBV7, C.IV);
  SUBV7_V = compose(SUBV7, C.V);
  SUBV7_VI = compose(SUBV7, C.VI);
}

export let V_II: CompoundFunction;

export let V_III: CompoundFunction;

export let V_IV: CompoundFunction;

export let V_V: CompoundFunction;

export let V_VI: CompoundFunction;

export let V7_II: CompoundFunction;

export let V7_III: CompoundFunction;

export let V7_IV: CompoundFunction;

export let V7_V: CompoundFunction;

export let V7_VI: CompoundFunction;

export let SUBV7_II: CompoundFunction;

export let SUBV7_III: CompoundFunction;

export let SUBV7_IV: CompoundFunction;

export let SUBV7_V: CompoundFunction;

export let SUBV7_VI: CompoundFunction;
