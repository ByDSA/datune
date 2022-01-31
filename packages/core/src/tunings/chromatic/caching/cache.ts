import { StringHashCache } from "@datune/utils";
import { hash as cpHash } from "concert-pitches/chromatic";
import { hashCode as tHashCode } from "temperaments/chromatic";
import Dto from "../building/Dto";
import Tuning from "../Tuning";

const cache = new StringHashCache<Tuning, Dto>( {
  hash(dto: Dto): string {
    const concertPitchHashCode = cpHash(dto.concertPitch);
    const temperamentHashCode = tHashCode(dto.temperament);

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

export default cache;
