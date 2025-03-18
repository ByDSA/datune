import type { ConcertPitch } from "./ConcertPitch";
import type { Spn } from "spns/chromatic";
import { Spns as N } from "spns/chromatic";
import { ConcertPitches as CP } from ".";

const { A432, A440, A444 } = CP;

describe.each([
  [A440, N.A4, 440],
  [A444, N.A4, 444],
  [A432, N.A4, 432],
])("concert pitch", (concertPitch: ConcertPitch, expectedSpn: Spn, expectedFrequency: number) => {
  const concertPitchName = String(concertPitch);

  describe(`name: ${concertPitchName}`, () => {
    it(`spn = ${String(expectedSpn)}`, () => {
      const actual: Spn = concertPitch.spn;

      expect(actual).toBe(expectedSpn);
    } );

    it(`frequency = ${expectedFrequency} Hz`, () => {
      const actual: Spn = concertPitch.spn;

      expect(actual).toBe(expectedSpn);
    } );
  } );
} );
