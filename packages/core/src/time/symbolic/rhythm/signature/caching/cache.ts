import { StringHashCache } from "@datune/utils";
import TimeSignature from "../TimeSignature";
import Dto from "./Dto";
import hash from "./hash";
import toDto from "./toDto";

const cache = new StringHashCache<TimeSignature, Dto>( {
  hash,
  toDto,
  create: (TimeSignature as any).create,
} );

export default cache;
