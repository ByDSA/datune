import TwoOpExp from "../TwoOpExp";

export default class MultExp extends TwoOpExp {
  valueOf(): number {
    return +this.arg0 * +this.arg1;
  }

  toString() {
    return `(${this.arg0}) * (${this.arg1}))`;
  }
}
