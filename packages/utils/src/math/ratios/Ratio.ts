export abstract class Ratio {
    abstract get value(): number;
    abstract getMult(ratio: Ratio): Ratio;
}