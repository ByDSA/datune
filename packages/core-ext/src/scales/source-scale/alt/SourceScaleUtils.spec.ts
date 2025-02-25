import { COMMON, DORIAN, MAJOR, MINOR, Scale } from "@datune/core/scales/alt";
import { TestInit } from "tests";
import getFromScale from ".";
import { initialize } from "./set";

TestInit.loadAll();

initialize();

describe.each([
  [MINOR, MAJOR, 6],
  [DORIAN, MAJOR, 2],
  [MAJOR, MAJOR, 1],
])("getSourceScale", (scale: Scale, expectedSourceScale: Scale, expectedMode: number) => {
  describe(String(scale), () => {
    const result = getFromScale(scale);

    it(`sourceScale => ${String(expectedSourceScale)}`, () => {
      const actual = result.sourceScale;

      expect(actual).toBe(expectedSourceScale);
    } );
    it(`mode => ${expectedMode}`, () => {
      const actual = result.mode;

      expect(actual).toBe(expectedMode);
    } );
  } );
} );
it("getSourceScaleFrom: ", () => {
  for (const scale of COMMON) {
    const sourceScale = getFromScale(scale);

    expect(sourceScale).toBeDefined();
  }
} );
