import { stringifyScale } from "..";
import { getAllCases, getManualCases } from "./Cases";
import { TestInit, TestLang } from "tests";

TestInit.chromaticScale();
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

describe.each(getAllCases())("aLL", (_langId, _scale, str) => {
  it(`defined string: ${str}`, () => {
    expect(str).toBeDefined();
  } );
} );
