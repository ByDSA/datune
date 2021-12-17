import { lockr } from "immutables";
import { ImmutableTime } from "./ImmutableTime";

export default class SimpleTime implements ImmutableTime {
  value: number;

  constructor(value: number) {
    this.value = value;
    lockr(this);
  }

  withAdd(time: SimpleTime): SimpleTime {
    return new SimpleTime(this.value + time.value);
  }

  withSub(time: SimpleTime): SimpleTime {
    return new SimpleTime(this.value - time.value);
  }

  withMult(factor: number): SimpleTime {
    return new SimpleTime(this.value * factor);
  }

  withDivCell(cellSize: SimpleTime): number {
    return Math.floor(this.value / cellSize.value);
  }

  withDiv(n: number): SimpleTime {
    return new SimpleTime(this.value / n);
  }

  valueOf(): number {
    return this.value;
  }
}
