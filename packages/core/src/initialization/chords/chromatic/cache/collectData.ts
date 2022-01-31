import { cache } from "chords/octave/chromatic/caching";
import Data from "./Data";

export default (): Data => cache.serialize();
