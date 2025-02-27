import { Key } from "../Key";
import { Scales } from "scales/chromatic";

export const hash = (obj: Key): string => `${Scales.hash(obj.scale)}:${+obj.root}`;
