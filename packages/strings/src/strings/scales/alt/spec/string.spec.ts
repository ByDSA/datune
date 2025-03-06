import { Scales as S } from "@datune/core/scales/alt";
import { stringifyScale as stringifyCScale } from "strings/scales/chromatic";
import { TestLang } from "tests";
import { stringifyScale } from "..";
import { getAllCases, getManualCases } from "./Cases";

TestLang.loadAll();

describe.each(getManualCases())("tests", (langId, scale, str) => {
  const scaleName = scale.rootIntervals.map(String).join("-");

  it(`(${langId}, ${scaleName}) => "${str}"`, () => {
    const actual = stringifyScale(scale, {
      langId,
    } );

    expect(actual).toBe(str);
  } );
} );

describe.each(getAllCases())("aLL", (langId, scale, str) => {
  describe(`${str}`, () => {
    it("defined string", () => {
      expect(str).toBeDefined();
    } );

    if (scale !== S.BLUES_a4) {
      it("same string in chromatic", () => {
        const chromaticScale = S.toChromatic(scale);
        const actual = stringifyCScale(chromaticScale, {
          langId,
        } );

        expect(actual).toBe(str);
      } );
    }
  } );
} );
