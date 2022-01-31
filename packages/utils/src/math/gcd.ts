/* eslint-disable no-param-reassign */
export default (a: number, b: number) => {
  let tmp: number;

  while (b !== 0) {
    tmp = b;
    b = a % b;
    a = tmp;
  }

  return a;
};
