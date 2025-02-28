import { type Data } from "./Data";
import { type Dto } from "./Dto";
import { toDto as toScaleDto } from "scales/symbolic/chromatic/caching/toDto";

export default (data: Data): Dto => data.map((entry) => [entry[0], toScaleDto(entry[1])]);
