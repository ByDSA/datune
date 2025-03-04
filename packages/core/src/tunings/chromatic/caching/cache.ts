import type { Dto } from "./Dto";
import { StringHashCache } from "@datune/utils";
import { hash as hashConcertPitches } from "concert-pitches/chromatic/caching/Dto";
import { hash as hashTemperament } from "temperaments/chromatic/hash";
import { Tuning } from "../Tuning";

export const cache = new StringHashCache<Tuning, Dto>( {
  hash(dto: Dto): string {
    const concertPitchHashCode = hashConcertPitches(dto.concertPitch);
    const temperamentHashCode = hashTemperament(dto.temperament);

    if (!concertPitchHashCode || !temperamentHashCode)
      throw new Error();

    return concertPitchHashCode + temperamentHashCode;
  },
  toDto(tuning: Tuning): Dto {
    return {
      concertPitch: tuning.concertPitch,
      temperament: tuning.temperament,
    };
  },
  create: (Tuning as any).create,
} );
