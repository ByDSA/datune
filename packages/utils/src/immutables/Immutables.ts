export class Immutables {
    static lock<T>(obj: T): T {
        return Object.freeze(Object.preventExtensions(obj));
    }

    static lockr(obj: OBJ): Readonly<OBJ> {
        return this.lockrIf(obj);
    }

    static lockrIf(obj: OBJ, ifFunction: F = () => true): Readonly<OBJ> {
        if (!ifFunction(obj))
            return obj;

        if (obj instanceof Object)
            for (let k in obj) {
                if (typeof obj[k] === "object" && !!obj[k])
                    this.lockrIf(obj[k], ifFunction);
            }
        else if (typeof obj === "function") {
            let p = Object.getOwnPropertyNames(obj);
            for (let k of p) {
                if (obj[k] && typeof obj[k] === "object" && obj[k])
                    this.lockrIf(obj[k], ifFunction);
            }
        }

        return Object.freeze(Object.preventExtensions(obj));
    }
}

type F = (t: any) => boolean;

type OBJ = [string] | any;