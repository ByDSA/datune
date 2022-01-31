import { Options } from "parsing";
import { Scale } from "scales/chromatic";
import fromName from "./fromName";
import fromIntervals from "./intervals";

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
