import type { Data } from "./Data";
import type { Dto } from "./Dto";
import { toObj as toScale } from "scales/symbolic/chromatic/caching/toObj";

export default (dto: Dto): Data => dto.map((entry) => [entry[0], toScale(entry[1])]);
