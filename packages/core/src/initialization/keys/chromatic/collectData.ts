import cache from "./cache/collectData";
import Data from "./Data";

export default (): Data => ( {
  cache: cache(),
} );
