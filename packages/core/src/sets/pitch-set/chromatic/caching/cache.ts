import { StringHashCache } from "@datune/utils";
import { NoteSet } from "../NoteSet";
import type { Dto } from "./Dto";
import { hashDto } from "./Dto";
import { toDto } from "./toDto";

export const cache = new StringHashCache( {
  hash: hashDto,
  toDto,
  create: (dto: Dto) => new (NoteSet as any)(dto),
} );
