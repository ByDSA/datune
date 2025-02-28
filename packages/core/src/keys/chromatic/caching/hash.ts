import { Key } from "../Key";
import { hash as hashScale } from "scales/symbolic/chromatic/caching/hashObj";

export const hash = (obj: Key): string => `${hashScale(obj.scale)}:${+obj.root}`;
