import { StringHashCache } from "@datune/utils";
import { TimeSignature } from "../TimeSignature";
import type { Dto } from "./Dto";
import { hashDto } from "./Dto";
import { toDto } from "./toDto";

export const cache = new StringHashCache<TimeSignature, Dto>( {
  hash: hashDto,
  toDto,
  create: (TimeSignature as any).create,
} );
