import * as C from ".";
import { TestInit } from "tests";

it("constants should be defined", () => {
  TestInit.chromaticConcertPitch();

  expect(C.A440).toBeDefined();
} );
