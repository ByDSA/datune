import { Degrees as D } from "degrees/alt";
import { IntervalSets as IS } from "sets/interval-sets/alt";
import { Funcs as F } from "../..";
import { fromDegreeIntervalSet } from "./fromDegreeIntervalSet";

it("from: I + TRIAD_MINOR = Im", () => {
  const degreeFunc = fromDegreeIntervalSet(D.I, IS.TRIAD_MINOR);
  const expected = F.Im;

  expect(degreeFunc).toEqual(expected);
} );
