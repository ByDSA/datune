import type { Data } from "./Data";
import type { Cache } from "./Dto";
import { toObj as Key } from "keys/chromatic/caching/toObj";

export default (dto: Cache): Data => dto.map((entry) => [entry[0], Key(entry[1])]);
