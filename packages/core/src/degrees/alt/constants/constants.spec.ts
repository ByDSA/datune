import { TestInit } from "tests";
import { bVII } from ".";

beforeAll(() => {
  TestInit.diatonicAltDegree();
} );
it("precalc not undefined", () => {
  expect(bVII).toBeDefined();
} );
