import { Voicing, Voicings as V } from "@datune/core/voicings/alt";
import { Options } from "parsing";
import { stringifyVoicing as stringifyLongName } from "strings/voicings/alt";
import { stringifyShortName } from "strings/voicings/alt/shortName";
import { normalizeInput } from "../normalizeInput";

export function parseFromName(input: string, options?: Options): Voicing | null {
  const normalizedInput = normalizeInput(input);

  for (const voicing of V.COMMON) {
    const normalizedLongName = normalizeInput(stringifyLongName(voicing, options));

    if (normalizedInput === normalizedLongName)
      return voicing;

    const normalizedShortName = normalizeInput(stringifyShortName(voicing, options));

    if (normalizedInput === normalizedShortName)
      return voicing;
  }

  return null;
}
