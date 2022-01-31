import { hash as scaleHash } from "scales/chromatic";
import Key from "../Key";

export default (obj: Key): string => `${scaleHash(obj.scale)}:${+obj.root}`;
