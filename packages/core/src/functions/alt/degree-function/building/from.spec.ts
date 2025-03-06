import { Degrees as D } from "degrees/alt";
import { Voicings as V } from "voicings/alt";
import { Funcs as F } from "../..";
import { from } from "./from";

it("from: I + TRIAD_MINOR = Im", () => {
  const degreeFunc = from( {
    degree: D.I,
    voicing: V.TRIAD_MINOR,
  } );
  const expected = F.Im;

  expect(degreeFunc).toEqual(expected);
} );
