import type { Dto } from "./Dto";
import { StringHashCache } from "@datune/utils";
import { Interval } from "../Interval";
import { hashDto } from "./Dto";
import { toDto } from "./toDto";

export const cache = new StringHashCache<Interval, Dto>( {
  hash: hashDto,
  toDto,
  create: (Interval as any).create,
} );
