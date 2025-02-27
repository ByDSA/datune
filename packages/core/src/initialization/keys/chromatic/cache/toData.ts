import Data from "./Data";
import Dto from "./Dto";
import { toObj as Key } from "keys/chromatic/caching/toObj";

export default (dto: Dto): Data => dto.map((entry) => [entry[0], Key(entry[1])]);
