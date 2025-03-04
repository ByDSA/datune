import { hash as hashScale } from "scales/symbolic/chromatic/caching/hashObj";
import { Key } from "../Key";

export const hash = (obj: Key): string => `${hashScale(obj.scale)}:${+obj.root}`;
