import { StringHashCache } from "@datune/utils";
import type { Dto } from "../building/Dto";
import { Tuning } from "../Tuning";
import { hash as hashConcertPitches } from "concert-pitches/chromatic/caching/Dto";
import { Temperaments } from "temperaments/chromatic";

export const cache = new StringHashCache<Tuning, Dto>( {
  hash(dto: Dto): string {
    const concertPitchHashCode = hashConcertPitches(dto.concertPitch);
    const temperamentHashCode = Temperaments.hashCode(dto.temperament);

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
