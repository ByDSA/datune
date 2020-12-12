export function cloneString(str: String): string {
  return (' ' + str).slice(1);
}

export function arrayRemove<T>(array: T[], item: T): boolean {
  let index = array.indexOf(item);
  if (index >= 0 && index < array.length) {
    array.splice(index, 1);
    return true;
  }

  return false;
}

export function arrayRotateLeft<T>(array: T[], n: number = 1): T[] {
  for (let i = 0; i < n; i++)
    array.push(array.shift());
  return array;
}

export function arrayRotateRight<T>(array: T[], n: number = 1): T[] {
  for (let i = 0; i < n; i++)
    array.unshift(array.pop());
  return array;
}

export function arrayHas<T>(array: T[], obj: T): boolean {
  return array.indexOf(obj) >= 0;
}

export function setAddArray<T>(set: Set<T>, array: T[]): void {
  for (let e of array)
    set.add(e);
}

// Source: https://stackoverflow.com/questions/9083037/convert-a-number-into-a-roman-numeral-in-javascript/9083076
export function getRomanNumeral(n: number): string {
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

export function arraySameContent<T>(a: T[], b: T[]): boolean {
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

export function isValidArray<A>(array: A[]): boolean {
  return !(!array
    || array.length == 0
    || array.length == 1 && (array[0] == undefined || array[0] == null));
}