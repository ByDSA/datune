import { type Data } from "./Data";
import { cache } from "scales/symbolic/chromatic/caching/cache";

export default (): Data => cache.serialize();
