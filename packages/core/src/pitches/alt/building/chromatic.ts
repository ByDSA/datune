import { ProcessCache } from "@datune/utils";
import type { Pitch } from "../Pitch";
import { DiatonicAltBuilder as Builder } from "./builders/DiatonicAltBuilder";
import type { Pitch as CPitch } from "pitches/chromatic";

export function fromChromatic(c: CPitch): Pitch {
  return cache.getOrProcess(c);
}

export const cache = new ProcessCache<CPitch, Pitch>(
  (c: CPitch) => Builder.create()
    .setNote(c)
    .build() as Pitch,
);
