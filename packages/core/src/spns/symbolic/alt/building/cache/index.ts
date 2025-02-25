import { StringHashCache } from "@datune/utils";
import { toDto } from "../../conversions";
import SPN from "../../SPN";
import { Dto, hash } from "../dto";

const cache = new StringHashCache<SPN, Dto>( {
  hash,
  toDto,
  create: (SPN as any).create,
} );

export default cache;
