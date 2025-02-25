import { hash as degreeHash } from "degrees/chromatic";
import { hash as voicingHash } from "voicings/chromatic";
import Dto from "./Dto";

export default function hash(obj: Dto): string {
  return `(${degreeHash(obj.degree)}|${voicingHash(obj.voicing)})`;
}
