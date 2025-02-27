import { ProcessCache } from "@datune/utils";
import Pitch from "../Pitch";
import Builder from "./builders/DiatonicAltBuilder";
import { Pitch as CPitch } from "pitches/chromatic";

export function fromChromatic(c: CPitch): Pitch {
  return cache.getOrProcess(c);
}

const cache = new ProcessCache<CPitch, Pitch>(
  (c: CPitch) => Builder.create()
    .setNote(c)
    .build() as Pitch,
);
