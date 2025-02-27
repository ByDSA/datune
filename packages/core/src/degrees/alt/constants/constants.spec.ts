import { bVII } from ".";
import { TestInit } from "tests";

beforeAll(() => {
  TestInit.diatonicAltDegree();
} );

it("precalc not undefined", () => {
  expect(bVII).toBeDefined();
} );
