import { hash as degreeFunctionHash } from "../../degree-function/caching";
import Dto from "./Dto";
import { Degrees } from "degrees/alt";

export default function hash(obj: Dto): string {
  const degreeFunction = degreeFunctionHash(obj.degreeFunction);
  const degreeChain = obj.degreeChain.map(Degrees.hash).join("-");

  return `(${degreeFunction}|${degreeChain})`;
}
