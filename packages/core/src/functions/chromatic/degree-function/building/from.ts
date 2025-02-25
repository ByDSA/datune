import { Dto } from "../caching";
import cache from "../caching/cache";
import DegreeFunction from "../DegreeFunction";

export default function from(dto: Dto): DegreeFunction {
  return cache.getOrCreate(dto);
}
