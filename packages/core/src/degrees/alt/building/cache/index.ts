import { StringHashCache } from "@datune/utils";
import { toDto } from "../../conversions";
import Degree from "../../Degree";
import { Dto, hash } from "../dto";

const cache = new StringHashCache<Degree, Dto>( {
  hash,
  toDto,
  create: (Degree as any).create,
} );

export default cache;
