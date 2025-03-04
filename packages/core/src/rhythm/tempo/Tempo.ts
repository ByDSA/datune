export abstract class Tempo<SYMBOLIC_DURATION> {
    abstract getMillis(musicalDuration: SYMBOLIC_DURATION): number;
}
