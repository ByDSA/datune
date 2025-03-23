import { TimeSignature } from "@datune/core";
import { TimeSignatures as TS } from "@datune/core";

export type ConstructorObjType = {
  initial: {
    timeSignature: TimeSignature;
  };
};

export const DEFAULT_CONSTRUCTOR_OBJ: ConstructorObjType = {
  initial: {
    timeSignature: TS.S4_4,
  },
};
