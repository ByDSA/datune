/* eslint-disable import/prefer-default-export */
import { Dto } from ".";
import TimeSignature from "../TimeSignature";

export default function toDto(obj: TimeSignature): Dto {
  return {
    nums: obj.numerators,
    beat: obj.denominatorBeat,
  };
}
