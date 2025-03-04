import { Voicing } from "@datune/core/voicings/chromatic";
import { Options } from "parsing";
import { parseFromIntervals } from "./intervals";
import { parseFromName } from "./name";

export function parseVoicing(input: string, options?: Options): Voicing | null {
  let voicing = parseFromName(input, options);

  if (voicing)
    return voicing;

  voicing = parseFromIntervals(input);

  if (voicing)
    return voicing;

  return null;
}
