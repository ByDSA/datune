import lcd from "./gcd";

export default (a: number, b: number) => (a * b) / lcd(a, b);
