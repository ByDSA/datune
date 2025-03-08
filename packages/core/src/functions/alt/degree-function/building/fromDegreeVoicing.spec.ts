import { Degrees as D } from "degrees/alt";
import { Voicings as V } from "voicings/alt";
import { Funcs as F } from "../..";
import { fromDegreeVoicing } from "./fromDegreeVoicing";

it("from: I + TRIAD_MINOR = Im", () => {
  const degreeFunc = fromDegreeVoicing(D.I, V.TRIAD_MINOR);
  const expected = F.Im;

  expect(degreeFunc).toEqual(expected);
} );
