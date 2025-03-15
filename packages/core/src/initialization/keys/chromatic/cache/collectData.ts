import type { Data } from "./Data";
import { cache } from "keys/chromatic/caching/cache";

export default (): Data => cache.exportEntries();
