/* eslint-disable camelcase */
import { TestInit } from "tests";
import { COMMON_NON_INVERSIONS } from "./constants/sets";
import { inv } from "./modifiers";

TestInit.chromaticVoicing();

it("allNonInversions is fine", () => {
  const voicings = COMMON_NON_INVERSIONS;

  for (const v of voicings) {
    let pInv = v;

    for (let i = 1; i < v.length; i++) {
      pInv = inv(pInv);

      if (pInv === v) // simétrico
        break;

      expect(voicings).not.toContain(pInv);
    }
  }
} );
