import Key from "keys/chromatic/caching/toObj";
import Data from "./Data";
import Dto from "./Dto";

export default (dto: Dto): Data => dto.map((entry) => [entry[0], Key(entry[1])]);
