import { Voicing } from "@datune/core/voicings/alt";
import { COMMON } from "@datune/core/voicings/relative/alt/constants";
import { normalizeInput } from "../normalizeInput";
import { Options } from "parsing";
import { stringifyVoicing as longName } from "strings/voicings/alt";
import { stringifyShortName } from "strings/voicings/alt/shortName";

export function parseFromName(input: string, options?: Options): Voicing | null {
  const normalizedInput = normalizeInput(input);

  for (const voicing of COMMON) {
    const normalizedLongName = normalizeInput(longName(voicing, options));

    if (normalizedInput === normalizedLongName)
      return voicing;

    const normalizedShortName = normalizeInput(stringifyShortName(voicing, options));

    if (normalizedInput === normalizedShortName)
      return voicing;
  }

  return null;
}
