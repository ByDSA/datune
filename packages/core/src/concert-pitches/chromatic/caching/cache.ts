import { StringHashCache } from "@datune/utils";
import ConcertPitch from "../ConcertPitch";
import Dto from "./Dto";
import hash from "./hash";
import toDto from "./toDto";

const cache = new StringHashCache<ConcertPitch, Dto>( {
  hash,
  toDto,
  create: (dto: Dto) => new (ConcertPitch as any)(dto),
} );

export default cache;
