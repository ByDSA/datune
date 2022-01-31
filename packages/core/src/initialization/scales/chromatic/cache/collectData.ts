import { cache } from "scales/symbolic/chromatic/caching";
import Data from "./Data";

export default (): Data => cache.serialize();
