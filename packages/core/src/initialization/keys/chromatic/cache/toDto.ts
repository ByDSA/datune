import type { Data } from "./Data";
import type { Cache } from "./Dto";
import { toDto as Key } from "keys/chromatic/caching/toDto";

export default (data: Data): Cache => data.map((entry) => [entry[0], Key(entry[1])]);
