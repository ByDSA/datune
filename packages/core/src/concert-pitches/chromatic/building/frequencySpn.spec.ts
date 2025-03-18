import { Spns as N } from "spns/chromatic";
import { fromFrequencySpn } from "./frequencySpn";

it("fromFrequencySpn", () => {
  const spn = N.A4;

  expect(spn).toBeDefined();

  const actual = fromFrequencySpn(440, spn);

  expect(actual).toBeDefined();

  expect(actual.spn).toBe(spn);
  expect(actual.frequency).toBe(440);
} );
