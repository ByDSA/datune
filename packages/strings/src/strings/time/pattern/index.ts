import type { RhythmPattern } from "@datune/core/rhythm/pattern";

export function stringifyPattern(obj: RhythmPattern): string {
  return `[${obj.values.join(", ")}]`;
}
