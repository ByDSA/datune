/* eslint-disable no-bitwise */
export const stringifyUint8 = (arr: Uint8Array) => {
  let result = "";
  const len = arr.length;

  if (len === 0)
    return result;

  result += arr[0];

  for (let i = 1; i < len; i++) {
    result += ",";
    result += arr[i];
  }

  return result;
};

export const idGeneratorUint8Array = <T>(
  items: Iterable<T>,
  arraySize: number,
  getValue: (item: T)=> number,
): string => {
  const id = new Uint8Array(arraySize);

  for (const item of items) {
    const value = getValue(item);
    const index = value >>> 3;
    const localBit = value & 7;

    id[index] |= 1 << localBit;
  }

  return stringifyUint8(id);
};

export const idGeneratorNumber = <T>(
  items: Iterable<T>,
  getValue: (item: T)=> number,
): number => {
  let id = 0;

  for (const item of items) {
    const localBit = getValue(item);

    id |= 1 << localBit;
  }

  return id;
};
