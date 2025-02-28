import { TimeSignature } from "@datune/core";
import { S4_4 } from "@datune/core/time/symbolic/rhythm/signature/constants";

export type ConstructorObjType = {
  initial: {
    timeSignature: TimeSignature;
  };
};

export const DEFAULT_CONSTRUCTOR_OBJ: ConstructorObjType = {
  initial: {
    timeSignature: S4_4,
  },
};
