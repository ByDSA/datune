import { Intervals } from "@datune/core/intervals/diatonic";
import { stringifyInterval } from ".";
import { TestInit, TestLang } from "tests/index";

TestLang.loadAll();
TestInit.diatonicInterval();

it("toString() - ENG", () => {
  const actual: string = stringifyInterval(Intervals.UNISON);
  const expected = "UNISON";

  expect(actual).toEqual(expected);
} );
