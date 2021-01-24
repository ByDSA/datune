export interface Pattern<D, I> extends Iterable<I> {
    rootIndex: number;
    inversionNumber: number;
    shortName: string;
    withInv(n: number): Pattern<D, I>;

    rootIntervals: I[];

    length: number;
}