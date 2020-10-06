export function rotativeTrim(n: number, max: number): number {
    if (isNaN(n))
        throw new Error("Input number is NaN");
    n %= max;
    if (n < 0)
        n += max;

    return n;
}