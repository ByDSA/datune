import type { ConcertPitch } from "concert-pitches/chromatic";
import { Temperament } from "temperaments/chromatic";

export type Dto = {
  concertPitch: ConcertPitch;
  temperament: Temperament;
};
