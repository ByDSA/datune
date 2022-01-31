import { cache, Dto } from "../caching";
import DegreeFunction from "../DegreeFunction";

export default function from(dto: Dto): DegreeFunction {
  return cache.getOrCreate(dto);
}
