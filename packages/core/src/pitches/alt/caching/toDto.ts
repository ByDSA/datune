import Pitch from "../Pitch";
import Dto from "./Dto";

export default (obj: Pitch): Dto => ( {
  diatonic: obj.diatonic,
  alts: obj.alts,
} );
