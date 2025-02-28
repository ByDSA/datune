import { lock } from "@datune/utils/immutables";
import { DOUBLE_HARMONIC, HARMONIC_MAJOR, HARMONIC_MINOR, MAJOR, MELODIC_MINOR, PENTATONIC } from "@datune/core/scales/symbolic/alt/constants";
import type { Scale } from "@datune/core/scales/symbolic/alt/Scale";
import { cache } from "./cache";

export let SOURCE_SCALES: Set<Scale>;

export function initialize() {
  if (SOURCE_SCALES)
    return;

  SOURCE_SCALES = new Set([
    MAJOR,
    HARMONIC_MINOR,
    MELODIC_MINOR,
    HARMONIC_MAJOR,
    DOUBLE_HARMONIC,
    PENTATONIC,
  ]);

  lock(SOURCE_SCALES);

  for (const sourceScale of SOURCE_SCALES)
    cache.getOrProcess(sourceScale);
}
