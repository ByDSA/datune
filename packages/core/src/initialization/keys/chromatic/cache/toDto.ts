import Key from "keys/chromatic/caching/toDto";
import Data from "./Data";
import Dto from "./Dto";

export default (data: Data): Dto => data.map((entry) => [entry[0], Key(entry[1])]);
