import OneOpExp from "../OneOpExp";

export default class NegExp extends OneOpExp {
  toString() {
    return `-${this.arg0}`;
  }

  valueOf() {
    return -this.arg0;
  }
}
