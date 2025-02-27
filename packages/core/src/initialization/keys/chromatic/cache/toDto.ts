import Data from "./Data";
import Dto from "./Dto";
import { toDto as Key } from "keys/chromatic/caching/toDto";

export default (data: Data): Dto => data.map((entry) => [entry[0], Key(entry[1])]);
