import { SymbolicDuration } from "../SymbolicDuration";

export abstract class Tempo {
    abstract getMillis(musicalDuration: SymbolicDuration): number;
}