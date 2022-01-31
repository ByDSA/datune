import { StringHashCache } from "@datune/utils";
import { toDto } from "../conversions";
import Interval from "../Interval";
import { Dto, hash } from "./dto";

const cache = new StringHashCache<Interval, Dto>( {
  hash,
  toDto,
  create: (Interval as any).create,
} );

export default cache;
