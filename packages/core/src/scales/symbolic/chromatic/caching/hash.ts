import Dto from "./Dto";

export default function hash(dto: Dto): string {
  return dto.map(String).join("-");
}
