import cache from "../caching/cache";
import Dto from "./Dto";

export default function from(dto: Dto) {
  return cache.getOrCreate(dto);
}
