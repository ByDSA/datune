import Voicing from "../Voicing";
import hash from "./hash";
import toDto from "./toDto";

export default function hashObj(obj: Voicing): string {
  const dto = toDto(obj);

  return hash(dto);
}
