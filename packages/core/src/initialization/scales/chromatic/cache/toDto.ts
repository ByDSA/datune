import { getKey as scaleGetKey } from "scales/symbolic/chromatic/caching/cache";
import { type Data } from "./Data";
import { type Dto } from "./Dto";

export default (data: Data): Dto => data.map((entry) => [entry[0], scaleGetKey(entry[1])]);
