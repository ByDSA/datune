import { StringHashCache } from "@datune/utils";
import Interval from "../Interval";
import Dto from "./Dto";
import hash from "./hash";
import toDto from "./toDto";

const cache = new StringHashCache<Interval, Dto>( {
  hash,
  toDto,
  create: (Interval as any).create,
} );

export default cache;
