export interface Time {
    withAdd(time: Time): Time;

    withSub(time: Time): Time;

    withMult(factor: number): Time;

    withDivCell(cellSize: Time): number;

    withDiv(n: number): Time;

    valueOf(): number;
}