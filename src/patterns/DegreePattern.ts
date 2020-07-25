export interface DegreePattern<D, I> {
    rootIndex: number;
    inversionNumber: number;
    shortName: string;
    withInv(n: number): DegreePattern<D, I>;

    rootIntervals: I[];

    length: number;
}