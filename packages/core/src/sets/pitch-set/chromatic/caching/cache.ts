/* eslint-disable import/prefer-default-export */
import { StringHashCache } from "@datune/utils";
import NoteSet from "../NoteSet";
import Dto from "./Dto";
import hash from "./hash";
import toDto from "./toDto";

const cache = new StringHashCache( {
  hash,
  toDto,
  create: (dto: Dto) => new (NoteSet as any)(dto),
} );

export default cache;
