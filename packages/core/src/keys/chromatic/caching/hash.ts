import Dto from "./Dto";

export default function hash(obj: Dto): string {
  return `${obj[1].join("-")}:${obj[0]}`;
}
