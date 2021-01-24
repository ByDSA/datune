export type NonEmptyArray<T> = [T, ...T[]];
export type NumberArray = NonEmptyArray<number>;

export namespace Arrays {
    export function removeItem<T>(array: T[], item: T): boolean {
        let index = array.indexOf(item);
        if (index >= 0 && index < array.length) {
            array.splice(index, 1);
            return true;
        }

        return false;
    }

    export function rotateLeft<T>(array: T[], n: number = 1): void {
        if (array.length == 0)
            return;

        if (n < 0)
            return rotateRight(array, -n);
        for (let i = 0; i < n; i++)
            array.push(<T>array.shift());
    }

    export function rotateRight<T>(array: T[], n: number = 1): void {
        if (array.length == 0)
            return;

        if (n < 0)
            return rotateLeft(array, -n);
        for (let i = 0; i < n; i++)
            array.unshift(<T>array.pop());
    }

    export function hasSameContent<T>(a: T[], b: T[]): boolean {
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

    export function isDefined<A>(array: A[]): boolean {
        return !(array.length == 0
            || array.length == 1 && (array[0] == undefined || array[0] == null));
    }
}