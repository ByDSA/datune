import { hash as degreeHash } from "degrees/alt";
import { hash as voicingHash } from "voicings/alt";
import Dto from "./Dto";

export default function hash(obj: Dto): string {
  const voicingHashCode = voicingHash(obj.voicing);
  const degreeHashCode = degreeHash(obj.degree);

  return `(${degreeHashCode})|(${voicingHashCode})`;
}
