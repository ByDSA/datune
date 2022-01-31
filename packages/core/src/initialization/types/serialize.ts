import collectData from "./collectData";
import Dto from "./Dto";
import toDto from "./toDto";

export default function serialize(): Dto {
  const data = collectData();
  const dto = toDto(data);

  return dto;
}
