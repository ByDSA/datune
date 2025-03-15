import type { Data } from "./Data";
import type { Cache } from "./Dto";
import { getKey as keyGetKey } from "keys/chromatic/caching/cache";

export default (data: Data): Cache => data.map((entry) => [entry[0], keyGetKey(entry[1])]);
