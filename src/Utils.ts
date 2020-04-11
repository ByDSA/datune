import { AssertionError } from 'assert';

export class Utils {
  static cloneString(str: String): string {
    return (' ' + str).slice(1);
  }

  static arrayRemove<T>(array: T[], item: T): boolean {
    this.assertNotNull(array);

    let index = array.indexOf(item);
    if (index >= 0 && index < array.length) {
      array.splice(index, 1);
      return true;
    }

    return false;
  }

  public static immutable<T>(obj: T): T {
    return Object.freeze(Object.preventExtensions(obj));
  }

  public static assertNotNull(v: any, message?: string): void {
    if (v === undefined || v === null)
      throw new Error("Variable is null or undefined." + (message ? " " + message : ""));
  }

  public static arrayRotate<T>(array: T[], n: number, reverse = false): T[] {
    this.assertNotNull(array);

    for (let i = 0; i < n; i++)
      if (reverse)
        array.unshift(array.pop());
      else
        array.push(array.shift());
    return array;
  }

  public static arrayHas<T>(array: T[], obj: T): boolean {
    return array.indexOf(obj) >= 0;
  }

  public static setAddArray<T>(set: Set<T>, array: T[]): void {
    this.assertNotNull(array);

    for (let e of array)
      set.add(e);
  }

  // Source: https://stackoverflow.com/questions/9083037/convert-a-number-into-a-roman-numeral-in-javascript/9083076
  public static getRomanNumeral(n: number): string {
    if (isNaN(n))
      return "NaN";
    var digits = String(+n).split(""),
      key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
        "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
        "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
      roman = "",
      i = 3;
    while (i--)
      roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
  }

  public static arraySameContent<T>(a: T[], b: T[]): boolean {
    this.assertNotNull(a);
    this.assertNotNull(b);

    if (a == b)
      return true;

    if (a.length != b.length)
      return false;

    for (let i = 0; i < a.length; i++) {
      if (a[i] != b[i])
        return false;
    }

    return true;
  }
}