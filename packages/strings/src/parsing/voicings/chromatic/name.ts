import { Options } from "parsing";
import longName from "strings/voicings/chromatic";
import shortName from "strings/voicings/chromatic/shortName";
import { COMMON, Voicing } from "@datune/core/voicings/chromatic";
import normalizeInput from "../normalizeInput";

export default function fromName(input: string, options?: Options): Voicing | null {
  const normalizedInput = normalizeInput(input);

  for (const voicing of COMMON) {
    const normalizedLongName = normalizeInput(longName(voicing, options));

    if (normalizedInput === normalizedLongName)
      return voicing;

    const normalizedShortName = normalizeInput(shortName(voicing, options));

    if (normalizedInput === normalizedShortName)
      return voicing;
  }

  return null;
}
