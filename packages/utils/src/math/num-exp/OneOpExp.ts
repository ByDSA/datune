import NumExp from "./NumExp";

export default abstract class TwoOp extends NumExp {
  arg0: NumExp;

  protected constructor(a: NumExp) {
    super();
    this.arg0 = a;
  }

  abstract valueOf(): number;

  abstract toString(): string;
}
