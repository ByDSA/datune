import { StringHashCache } from "@datune/utils";
import { toDto } from "../conversions";
import Interval from "../Interval";
import { Dto, dtoHash } from "./dto";

const cache = new StringHashCache<Interval, Dto>( {
  hash: dtoHash,
  toDto,
  create: (Interval as any).create,
} );

export default cache;
