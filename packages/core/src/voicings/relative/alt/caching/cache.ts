import { StringHashCache } from "@datune/utils";
import { Voicing } from "../Voicing";
import { hashDto } from "./Dto";
import { toDto } from "./toDto";
import { IntervalArray } from "intervals/alt";

export const cache = new StringHashCache<Voicing, IntervalArray>( {
  hash: hashDto,
  toDto,
  create: (Voicing as any).create,
} );
