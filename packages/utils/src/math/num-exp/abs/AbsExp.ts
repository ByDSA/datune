import OneOpExp from "../OneOpExp";

export default class AbsExp extends OneOpExp {
  toString() {
    return `|${this.arg0}|`;
  }

  valueOf() {
    return Math.abs(+this.arg0);
  }
}
