import SymbolicDuration from "../SymbolicDuration";

export default abstract class Tempo {
    abstract getMillis(musicalDuration: SymbolicDuration): number;
}
