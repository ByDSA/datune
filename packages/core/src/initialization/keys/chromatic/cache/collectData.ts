import { cache } from "keys/chromatic/caching";
import Data from "./Data";

export default (): Data => cache.serialize();
