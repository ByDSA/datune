import { StringHashCache } from "@datune/utils";
import Chord from "../Chord";
import Dto from "./Dto";
import hash from "./hash";
import toDto from "./toDto";

const cache = new StringHashCache<Chord, Dto>( {
  hash,
  toDto,
  create: (dto: Dto) => new (Chord as any)(dto),
} );

export default cache;
