import cache from "./cache/toDto";
import Data from "./Data";
import Dto from "./Dto";

export default (data: Data): Dto => ( {
  cache: cache(data.cache),
} );
