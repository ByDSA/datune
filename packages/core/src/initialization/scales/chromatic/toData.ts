import cache from "./cache/toData";
import Data from "./Data";
import Dto from "./Dto";

export default (dto: Dto): Data => ( {
  cache: cache(dto.cache),
} );
