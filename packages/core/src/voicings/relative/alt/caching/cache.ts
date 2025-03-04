import { StringHashCache } from "@datune/utils";
import { IntervalArray } from "intervals/alt";
import { Voicing } from "../Voicing";
import { hashDto } from "./Dto";
import { toDto } from "./toDto";

export const cache = new StringHashCache<Voicing, IntervalArray>( {
  hash: hashDto,
  toDto,
  create: (Voicing as any).create,
} );
