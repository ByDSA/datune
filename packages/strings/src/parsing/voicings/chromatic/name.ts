import { IntervalSet, IntervalSets as IS } from "@datune/core/intervalSets/chromatic";
import { stringifyLongName } from "strings/intervalSets/chromatic/longName";
import { stringifyShortName } from "strings/intervalSets/chromatic/shortName";
import { Options } from "parsing";
import { normalizeInput } from "../normalizeInput";

export function parseFromName(input: string, options?: Options): IntervalSet | null {
  const normalizedInput = normalizeInput(input);

  for (const intervalSet of IS.COMMON) {
    const longName = stringifyLongName(intervalSet, options);
    const normalizedLongName = longName ? normalizeInput(longName) : null;

    if (normalizedInput === normalizedLongName)
      return intervalSet;

    const shortName = stringifyShortName(intervalSet, options);
    const normalizedShortName = normalizeInput(shortName);

    if (normalizedInput === normalizedShortName)
      return intervalSet;
  }

  return null;
}
