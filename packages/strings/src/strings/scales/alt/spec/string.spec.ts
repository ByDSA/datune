/* eslint-disable camelcase */
import { BLUES_a4, toChromatic } from "@datune/core/scales/alt";
import chromaticStringify from "strings/scales/chromatic";
import { TestInit, TestLang } from "tests";
import stringify from "..";
import { getAllCases, getManualCases } from "./Cases";

TestInit.diatonicAltScale();
TestLang.loadAll();
describe.each(getManualCases())("tests", (langId, scale, str) => {
  const scaleName = scale.rootIntervals.map(String).join("-");

  it(`(${langId}, ${scaleName}) => "${str}"`, () => {
    const actual = stringify(scale, {
      langId,
    } );

    expect(actual).toBe(str);
  } );
} );

describe.each(getAllCases())("ALL", (langId, scale, str) => {
  describe(`${str}`, () => {
    it("defined string", () => {
      expect(str).toBeDefined();
    } );

    if (scale !== BLUES_a4) {
      it("same in chromatic", () => {
        const chromaticScale = toChromatic(scale);
        const actual = chromaticStringify(chromaticScale, {
          langId,
        } );

        expect(actual).toBe(str);
      } );
    }
  } );
} );
