export function mod(a: number, n: number): number {
    if (isNaN(n))
        throw new Error("Input number is NaN");
    return ((a % n) + n) % n;
}