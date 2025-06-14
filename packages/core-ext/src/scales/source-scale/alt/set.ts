import type { Scale } from "@datune/core/scales/symbolic/alt/Scale";
import { Scales as S } from "@datune/core/scales/symbolic/alt";
import { freeze } from "datils/datatypes/objects";
import { assertNotInitialized } from "@datune/utils/errors/not-initialized";
import { cache } from "./cache";

export let SOURCE_SCALES: Set<Scale>;

export function initialize() {
  assertNotInitialized(SOURCE_SCALES);

  SOURCE_SCALES = new Set([
    S.MAJOR,
    S.HARMONIC_MINOR,
    S.MELODIC_MINOR,
    S.HARMONIC_MAJOR,
    S.DOUBLE_HARMONIC,
    S.PENTATONIC,
  ]);

  freeze(SOURCE_SCALES);

  for (const sourceScale of SOURCE_SCALES)
    cache.getOrProcess(sourceScale);
}
