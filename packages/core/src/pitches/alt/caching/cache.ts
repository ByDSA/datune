import { StringHashCache } from "@datune/utils";
import Pitch from "../Pitch";
import Dto from "./Dto";
import hash from "./hash";
import toDto from "./toDto";

const cache = new StringHashCache<Pitch, Dto>( {
  hash,
  toDto,
  create: (dto: Dto) => new (Pitch as any)(dto),
} );

export default cache;
