import { StringHashCache } from "@datune/utils";
import MusicalDuration from "./MusicalDuration";

// UNUSED
type Dto = number;
const cache = new StringHashCache<MusicalDuration, Dto>( {
  hash: (dto: Dto) => String(dto),
  toDto: (obj: MusicalDuration): Dto => +obj,
  create: (dto: Dto): MusicalDuration => dto,
} );

export default cache;
