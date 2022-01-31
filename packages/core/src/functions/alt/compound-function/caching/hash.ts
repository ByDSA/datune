import { hash as degreeHash } from "degrees/alt";
import { hash as degreeFunctionHashCode } from "../../degree-function";
import Dto from "./Dto";

export default function hash(obj: Dto): string {
  const degreeFunction = degreeFunctionHashCode(obj.degreeFunction);
  const degreeChain = obj.degreeChain.map(degreeHash).join("-");

  return `(${degreeFunction}|${degreeChain})`;
}
