/* eslint-disable @typescript-eslint/naming-convention */
import type { DegreeFunc } from "./DegreeFunc";
import type { Degree } from "degrees/alt";
import type { Voicing } from "voicings/alt";
import { Degrees as D } from "degrees/alt";
import { Voicings as V } from "voicings/alt";
import { Funcs as F } from "..";
import { getDegrees } from "./conversions";

const { I, I0, Im, IVMaj7, VII0 } = F;
const { SEVENTH_MAJ7, TRIAD_DIMINISHED, TRIAD_MAJOR, TRIAD_MINOR } = V;

describe.each([
  [I, D.I, TRIAD_MAJOR, [D.I, D.III, D.V]],
  [I0, D.I, TRIAD_DIMINISHED, [D.I, D.bIII, D.bV]],
  [Im, D.I, TRIAD_MINOR, [D.I, D.bIII, D.V]],
  [VII0, D.VII, TRIAD_DIMINISHED, [D.VII, D.II, D.IV]],
  [IVMaj7, D.IV, SEVENTH_MAJ7, [D.IV, D.VI, D.I, D.III]],
])("constants", (
  degreeFunc: DegreeFunc,
  expectedDegree: Degree,
  expectedVoicing: Voicing,
  expectedDegrees: Degree[],
) => {
  describe(`${String(degreeFunc)}`, () => {
    it(`degree => ${String(expectedDegree)}`, () => {
      expect(degreeFunc.degree).toBe(expectedDegree);
    } );

    it(`voicing => ${expectedVoicing}`, () => {
      expect(degreeFunc.voicing).toBe(expectedVoicing);
    } );

    it(`degrees => ${expectedDegrees.map(String).join("-")}`, () => {
      const degrees = getDegrees(degreeFunc);
      const expected = expectedDegrees;

      expect(degrees).toStrictEqual(expected);
    } );
  } );
} );
