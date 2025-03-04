import type { RhythmPattern } from "@datune/core/rhythm/pattern";

export function stringifyPattern(obj: RhythmPattern): string {
  let stringBuilder = "";

  stringBuilder += "[";
  let first = true;

  for (const i of obj.values) {
    if (first)
      first = false;
    else
      stringBuilder += ", ";

    stringBuilder += i;
  }

  stringBuilder += "]";

  return stringBuilder.toString();
}
