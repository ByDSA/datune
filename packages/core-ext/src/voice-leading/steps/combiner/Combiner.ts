export function cartesianProduct<T>(arr: T[][]) {
    return arr.reduce(function (a: T[][], b: T[]) {
        return a.map(function (x: T[]) {
            return b.map(function (y: T) {
                return x.concat([y]);
            })
        }).reduce(function (a: T[][], b: T[][]) { return a.concat(b) }, [])
    }, [[]])
}