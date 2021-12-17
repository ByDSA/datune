export interface ImmutableTime {
    withAdd(time: ImmutableTime): ImmutableTime;
    withSub(time: ImmutableTime): ImmutableTime;
    withMult(factor: number): ImmutableTime;
    withDivCell(cellSize: ImmutableTime): number;
    withDiv(n: number): ImmutableTime;
    valueOf(): number;
}
