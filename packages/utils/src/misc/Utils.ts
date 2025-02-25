export function cloneString(str: string): string {
  return (` ${str}`).slice(1);
}

// Source: https://stackoverflow.com/questions/9083037/convert-a-number-into-a-roman-numeral-in-javascript/9083076
export function getRomanNumeral(n: number): string {
  if (Number.isNaN(n))
    return "NaN";

  const digits = String(+n).split("");
  const key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
    "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
    "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
  let roman = "";
  let i = 3;

  while (i--)
    roman = (key[+(digits.pop() || 0) + (i * 10)] || "") + roman;

  return Array(+digits.join("") + 1).join("M") + roman;
}
