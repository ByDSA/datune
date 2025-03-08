import type { Scale } from "@datune/core/scales/alt";
import { Scales } from "@datune/core/scales/alt";
import { TestInit } from "tests";
import { initialize } from "./set";
import { findSourceScale } from ".";

TestInit.loadAll();

initialize();

const { COMMON, DORIAN, MAJOR, MINOR } = Scales;

describe.each([
  [MINOR, MAJOR, 6],
  [DORIAN, MAJOR, 2],
  [MAJOR, MAJOR, 1],
])("getSourceScale", (scale: Scale, expectedSourceScale: Scale, expectedMode: number) => {
  describe("Scale: " + String(scale), () => {
    const result = findSourceScale(scale);

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

it("getSourceScaleFrom:", () => {
  for (const scale of COMMON) {
    const sourceScale = findSourceScale(scale);

    expect(sourceScale).toBeDefined();
  }
} );
