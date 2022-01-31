import { hash as degreeHashCode } from "degrees/chromatic";
import { hash as degreeFunctionHashCode } from "../../degree-function";
import Dto from "./Dto";

export default function hash(obj: Dto): string {
  const degreeFunction = degreeFunctionHashCode(obj.degreeFunction);
  const degreeChain = obj.degreeChain.map(degreeHashCode).join("-");

  return `(${degreeFunction}|${degreeChain})`;
}
