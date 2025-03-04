import type { Dto } from "./dto/Dto";
import { StringHashCache } from "@datune/utils";
import { toDto } from "../conversions/dto";
import { Interval } from "../Interval";
import { hashDto } from "./dto/Dto";

export const cache = new StringHashCache<Interval, Dto>( {
  hash: hashDto,
  toDto,
  create: (Interval as any).create,
} );
