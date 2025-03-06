import type { ConcertPitch } from "./ConcertPitch";
import type { SPN } from "spns/chromatic";
import { SPNs } from "spns/chromatic";
import { ConcertPitches as CP } from ".";

const { A432, A440, A444 } = CP;

describe.each([
  [A440, SPNs.A4, 440],
  [A444, SPNs.A4, 444],
  [A432, SPNs.A4, 432],
])("concert pitch", (concertPitch: ConcertPitch, expectedSPN: SPN, expectedFrequency: number) => {
  const concertPitchName = String(concertPitch);

  describe(`name: ${concertPitchName}`, () => {
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
