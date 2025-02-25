import { A4, SPN } from "spns/chromatic";
import { TestInit } from "tests";
import ConcertPitch from "./ConcertPitch";
import { A432, A440, A444 } from "./constants";

TestInit.chromaticConcertPitch();
describe.each([
  [A440, A4, 440],
  [A444, A4, 444],
  [A432, A4, 432],
])("concert pitch", (concertPitch: ConcertPitch, expectedSPN: SPN, expectedFrequency: number) => {
  const concertPitchName = String(concertPitch);

  describe(concertPitchName, () => {
    it(`spn = ${String(expectedSPN)}`, () => {
      const actual: SPN = concertPitch.spn;

      expect(actual).toBe(expectedSPN);
    } );

    it(`frequency = ${expectedFrequency} Hz`, () => {
      const actual: SPN = concertPitch.spn;

      expect(actual).toBe(expectedSPN);
    } );
  } );
} );
