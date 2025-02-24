/* eslint-disable camelcase */
import { TestInit, TestLang } from "tests";
import stringify from "..";
import { getAllCases, getManualCases } from "./Cases";

TestInit.chromaticScale();
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
  it(`defined string: ${str}`, () => {
    expect(str).toBeDefined();
  } );
} );
