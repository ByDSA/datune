import { StringHashCache } from "@datune/utils";
import { Array as IntervalArray } from "intervals/alt";
import Voicing from "../Voicing";
import hash from "./hash";
import toDto from "./toDto";

const cache = new StringHashCache<Voicing, IntervalArray>( {
  hash,
  toDto,
  create: (Voicing as any).create,
} );

export default cache;
