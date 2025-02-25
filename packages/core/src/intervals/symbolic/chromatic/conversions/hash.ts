import Interval from "../Interval";

export default function hash(obj: Interval): string {
  return String(+obj);
}
