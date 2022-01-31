import { Pitch } from "pitches/alt";
import { Scale } from "scales/alt";
import Key from "../Key";
import cache from "./cache";

export default function from(root: Pitch, scale: Scale): Key {
  return cache.getOrCreate( {
    root,
    scale,
  } );
}
