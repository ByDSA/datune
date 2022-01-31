import Interval from "./Interval";

/* eslint-disable import/prefer-default-export */
export function isInterval<E>(obj: any): obj is Interval<E> {
  return obj && typeof obj.from === "number" && typeof obj.to === "number";
}
