import cache from "./cache/collectData";
import type { Data } from "./Data";

export default (): Data => {
  const data: Data = {
    cache: cache(),
  };

  return data;
};
