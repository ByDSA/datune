import type { Data } from "./Data";
import cache from "./cache/collectData";

export default (): Data => {
  const data: Data = {
    cache: cache(),
  };

  return data;
};
