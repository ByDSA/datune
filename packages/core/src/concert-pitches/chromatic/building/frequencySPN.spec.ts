import { SPNs } from "spns/chromatic";
import { fromFrequencySPN } from "./frequencySPN";

it("fromFrequencySPN", () => {
  const spn = SPNs.A4;

  expect(spn).toBeDefined();

  const actual = fromFrequencySPN(440, spn);

  expect(actual).toBeDefined();

  expect(actual.spn).toBe(spn);
  expect(actual.frequency).toBe(440);
} );
