import { StringHashCache } from "@datune/utils";
import DegreeFunction from "../DegreeFunction";
import Dto from "./Dto";
import hash from "./hash";
import toDto from "./toDto";

const cache = new StringHashCache<DegreeFunction, Dto>( {
  hash,
  toDto,
  create: (DegreeFunction as any).create,
} );

export default cache;
