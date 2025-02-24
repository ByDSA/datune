/* eslint-disable import/prefer-default-export */

import { from } from "./building";
import SingleStep from "./SingleStep";

export function index(obj: SingleStep, newIndex: number): SingleStep {
  return from(newIndex, obj.interval);
}
