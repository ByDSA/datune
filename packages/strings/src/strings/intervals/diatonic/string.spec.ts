import { UNISON } from "intervals/diatonic";
import { TestInit, TestLang } from "tests/index";
import stringify from ".";

TestLang.loadAll();
TestInit.diatonicInterval();
it("toString() - ENG", () => {
  const actual: string = stringify(UNISON);
  const expected = "UNISON";

  expect(actual).toEqual(expected);
} );
