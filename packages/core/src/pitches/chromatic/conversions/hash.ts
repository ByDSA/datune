import Pitch from "../Pitch";

export default function hash(obj: Pitch): string {
  return `${+obj}`;
}
