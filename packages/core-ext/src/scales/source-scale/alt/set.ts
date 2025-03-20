import type { Scale } from "@datune/core/scales/symbolic/alt/Scale";
import { DOUBLE_HARMONIC, HARMONIC_MAJOR, HARMONIC_MINOR, MAJOR, MELODIC_MINOR, PENTATONIC } from "@datune/core/scales/symbolic/alt/constants";
import { freeze } from "datils/datatypes/objects";
import { cache } from "./cache";

export let SOURCE_SCALES: Set<Scale>;

export function initialize() {
  if (SOURCE_SCALES)
    throw new Error("Already initialized");

  SOURCE_SCALES = new Set([
    MAJOR,
    HARMONIC_MINOR,
    MELODIC_MINOR,
    HARMONIC_MAJOR,
    DOUBLE_HARMONIC,
    PENTATONIC,
  ]);

  freeze(SOURCE_SCALES);

  for (const sourceScale of SOURCE_SCALES)
    cache.getOrProcess(sourceScale);
}
