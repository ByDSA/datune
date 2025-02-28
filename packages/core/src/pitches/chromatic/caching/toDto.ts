import { type Pitch } from "../Pitch";
import { type Dto } from "./Dto";

export const toDto = (self: Pitch): Dto => +self;
