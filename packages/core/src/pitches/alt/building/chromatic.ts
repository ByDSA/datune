import type { Pitch } from "../Pitch";
import type { Pitch as CPitch } from "pitches/chromatic";
import { ProcessCache } from "@datune/utils";
import { DiatonicAltBuilder as Builder } from "./builders/DiatonicAltBuilder";

export function fromChromatic(c: CPitch): Pitch {
  return cache.getOrProcess(c);
}

const cache = new ProcessCache<CPitch, Pitch>(
  (c: CPitch) => Builder.create()
    .setNote(c)
    .build() as Pitch,
);
