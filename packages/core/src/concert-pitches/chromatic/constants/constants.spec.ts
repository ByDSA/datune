import { TestInit } from "tests";
import * as C from ".";

it("constants should be defined", () => {
  TestInit.chromaticConcertPitch();

  expect(C.A440).toBeDefined();
} );
