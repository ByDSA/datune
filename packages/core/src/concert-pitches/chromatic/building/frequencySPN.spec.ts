import { fromFrequencySPN } from "./frequencySPN";
import { TestInit } from "tests";
import { SPNs } from "spns/chromatic";

TestInit.chromaticConcertPitch();

it("fromFrequencySPN", () => {
  const spn = SPNs.A4;

  expect(spn).toBeDefined();

  const actual = fromFrequencySPN(440, spn);

  expect(actual).toBeDefined();

  expect(actual.spn).toBe(spn);
  expect(actual.frequency).toBe(440);
} );
