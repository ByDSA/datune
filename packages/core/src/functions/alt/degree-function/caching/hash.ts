import { Degrees } from "degrees/alt";
import { Voicings } from "voicings/alt";
import Dto from "./Dto";

export default function hash(obj: Dto): string {
  const voicingHashCode = Voicings.hash(obj.voicing);
  const degreeHashCode = Degrees.hash(obj.degree);

  return `(${degreeHashCode})|(${voicingHashCode})`;
}
