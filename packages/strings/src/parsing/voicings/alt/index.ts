import { Options } from "parsing";
import { Voicing } from "@datune/core/voicings/alt";
import fromIntervals from "./intervals";
import fromName from "./name";

export default function parse(input: string, options?: Options): Voicing | null {
  let voicing = fromName(input, options);

  if (voicing)
    return voicing;

  voicing = fromIntervals(input);

  if (voicing)
    return voicing;

  return null;
}
