import Obj from "../Chord";
import cache from "./cache";
import Dto from "./Dto";

export default (dto: Dto): Obj => cache.getOrCreate(dto);
