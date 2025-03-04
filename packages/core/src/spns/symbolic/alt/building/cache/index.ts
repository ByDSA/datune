import type { Dto } from "../dto/Dto";
import { StringHashCache } from "@datune/utils";
import { toDto } from "../../conversions/dto";
import { SPN } from "../../SPN";
import { hashDto } from "../dto/Dto";

export const cache = new StringHashCache<SPN, Dto>( {
  hash: hashDto,
  toDto,
  create: (SPN as any).create,
} );
