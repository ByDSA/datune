import { Voicing } from "@datune/core/voicings/alt";
import { parseFromIntervals } from "./intervals";
import { parseFromName } from "./name";
import { Options } from "parsing";

export function parseVoicing(input: string, options?: Options): Voicing | null {
  let voicing = parseFromName(input, options);

  if (voicing)
    return voicing;

  voicing = parseFromIntervals(input);

  if (voicing)
    return voicing;

  return null;
}
