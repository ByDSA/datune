import Dto from "./Dto";

export default function dtoHash(dto: Dto): string {
  return `${dto.nums.join("-")}|${String(+dto.beat)}`;
}
