import cache from "./cache/collectData";
import type { Data } from "./Data";

export default (): Data => ( {
  cache: cache(),
} );
