import { IntervalSet, IntervalSets as IS } from "@datune/core/intervalSets/alt";
import { stringifyIntervalSet as stringifyLongName } from "strings/intervalSets/alt";
import { stringifyShortName } from "strings/intervalSets/alt/shortName";
import { Options } from "parsing";
import { normalizeInput } from "../normalizeInput";

export function parseFromName(input: string, options?: Options): IntervalSet | null {
  const normalizedInput = normalizeInput(input);

  for (const intervalSet of IS.COMMON) {
    const normalizedLongName = normalizeInput(stringifyLongName(intervalSet, options));

    if (normalizedInput === normalizedLongName)
      return intervalSet;

    const normalizedShortName = normalizeInput(stringifyShortName(intervalSet, options));

    if (normalizedInput === normalizedShortName)
      return intervalSet;
  }

  return null;
}
