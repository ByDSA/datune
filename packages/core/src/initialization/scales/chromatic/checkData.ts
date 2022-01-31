import { Scale } from "scales/chromatic";
import Data from "./Data";

function isValidCache(cache: any): boolean {
  if (!cache)
    return false;

  if (!Array.isArray(cache))
    return false;

  if (cache.length === 0)
    return true;

  if (typeof cache[0][0] !== "string")
    return false;

  if (cache[0][1] instanceof Scale)
    return true;

  return false;
}

export default function checkData(data: any): Data | null {
  if (!isValidCache(data.cache))
    return null;

  return data as Data;
}
