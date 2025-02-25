import Dto from "./Dto";

export default (dto: Dto): string => `${+dto.diatonic}:${dto.alts}`;
