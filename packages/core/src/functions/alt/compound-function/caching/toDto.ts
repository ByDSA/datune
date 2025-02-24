/* eslint-disable import/prefer-default-export */
import { Dto } from ".";
import CompoundFunction from "../CompoundFunction";

export default function toDto(obj: CompoundFunction): Dto {
  return {
    degreeFunction: obj.degreeFunction,
    degreeChain: obj.degreeChain,
  };
}
