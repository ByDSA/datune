/* eslint-disable camelcase */
import { Scales } from "@datune/core/scales/alt";
import { stringifyScale } from "..";
import { getAllCases, getManualCases } from "./Cases";
import { stringifyScale as stringifyCScale } from "strings/scales/chromatic";
import { TestInit, TestLang } from "tests";

TestInit.diatonicAltScale();
TestLang.loadAll();

// eslint-disable-next-line @typescript-eslint/naming-convention
const { BLUES_a4, toChromatic } = Scales;

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

    if (scale !== BLUES_a4) {
      it("same in chromatic", () => {
        const chromaticScale = toChromatic(scale);
        const actual = stringifyCScale(chromaticScale, {
          langId,
        } );

        expect(actual).toBe(str);
      } );
    }
  } );
} );
