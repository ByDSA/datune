import { cache } from "scales/symbolic/chromatic/caching/cache";
import { type Data } from "./Data";

export default (): Data => cache.exportEntries();
