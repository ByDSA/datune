import cache from "./cache/collectData";
import Data from "./Data";

export default (): Data => {
  const data: Data = {
    cache: cache(),
  };

  return data;
};
