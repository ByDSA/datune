import { hash } from "../building/dto";
import Degree from "../Degree";

export default function hashCode(obj: Degree): string {
  return hash(obj);
}
