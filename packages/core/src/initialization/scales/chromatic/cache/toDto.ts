import Scale from "scales/symbolic/chromatic/caching/toDto";
import Data from "./Data";
import Dto from "./Dto";

export default (data: Data): Dto => data.map((entry) => [entry[0], Scale(entry[1])]);
