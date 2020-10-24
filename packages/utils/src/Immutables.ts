export class Immutables {
    static lock<T>(obj: T): T {
        return Object.freeze(Object.preventExtensions(obj));
    }

    static lockr<T>(obj: T): T {
        return this.lockrIf(obj, () => true);
    }

    static lockrIf<T>(obj: T, ifFunction: (T) => boolean): T {
        if (!ifFunction(obj))
            return obj;

        for (var k in obj) {
            if (typeof obj[k] == "object" && obj[k] !== null)
                this.lockrIf(obj[k], ifFunction);
        }

        if (typeof obj == "function") {
            let p = Object.getOwnPropertyNames(obj);
            for (let k of p) {
                if (typeof obj[k] == "object" && obj[k])
                    this.lockrIf(obj[k], ifFunction);
            }
        }

        return Object.freeze(Object.preventExtensions(obj));
    }
}