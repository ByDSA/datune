import { Voicing, Voicings as V } from "@datune/core/voicings/chromatic";
import { Options } from "parsing";
import { stringifyLongName } from "strings/voicings/chromatic/longName";
import { stringifyShortName } from "strings/voicings/chromatic/shortName";
import { normalizeInput } from "../normalizeInput";

export function parseFromName(input: string, options?: Options): Voicing | null {
  const normalizedInput = normalizeInput(input);

  for (const voicing of V.COMMON) {
    const longName = stringifyLongName(voicing, options);
    const normalizedLongName = longName ? normalizeInput(longName) : null;

    if (normalizedInput === normalizedLongName)
      return voicing;

    const shortName = stringifyShortName(voicing, options);
    const normalizedShortName = normalizeInput(shortName);

    if (normalizedInput === normalizedShortName)
      return voicing;
  }

  return null;
}
