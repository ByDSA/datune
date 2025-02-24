import { hash as pitchHash } from "pitches/alt";
import { hash as scaleHash } from "scales/alt";
import Dto from "./Dto";

export default function hash(obj: Dto): string {
  const rootHashCode = pitchHash(obj.root);
  const scaleHashCode = scaleHash(obj.scale);

  return `${rootHashCode}|(${scaleHashCode})`;
}
