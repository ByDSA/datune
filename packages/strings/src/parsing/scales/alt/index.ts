import { Options } from "parsing";
import { Scale } from "@datune/core/scales/alt";
import fromIntervals from "./intervals";
import fromName from "./name";

export default function parse(input: string, options?: Options): Scale | null {
  let scale: Scale | null;

  scale = fromName(input, options);

  if (scale)
    return scale;

  scale = fromIntervals(input);

  if (scale)
    return scale;

  return null;
}
