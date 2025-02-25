import { ProcessCache } from "@datune/utils";
import { Pitch as Chromatic } from "pitches/chromatic";
import Pitch from "../Pitch";
import Builder from "./builders/DiatonicAltBuilder";

export default function fromNote(c: Chromatic): Pitch {
  return cache.getOrProcess(c);
}

const cache = new ProcessCache<Chromatic, Pitch>(
  (c: Chromatic) => Builder.create()
    .setNote(c)
    .build() as Pitch,
);
