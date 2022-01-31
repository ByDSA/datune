import { StringHashCache } from "@datune/utils";
import CompoundFunction from "../CompoundFunction";
import Dto from "./Dto";
import hash from "./hash";
import toDto from "./toDto";

const cache = new StringHashCache<CompoundFunction, Dto>( {
  hash,
  toDto,
  create: (CompoundFunction as any).create,
} );

export default cache;
