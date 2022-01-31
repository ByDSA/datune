import TwoOpExp from "../TwoOpExp";

export default class SubExp extends TwoOpExp {
  valueOf(): number {
    return +this.arg0 - +this.arg1;
  }

  toString() {
    return `(${this.arg0}) - (${this.arg1}))`;
  }
}
