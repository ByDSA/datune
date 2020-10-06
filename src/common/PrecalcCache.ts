type KeyType = string;
export abstract class PrecalcCache<T, HashingObjectType> {
    private map: Map<KeyType, T>;

    abstract getHash(hashingObject: HashingObjectType): KeyType;

    abstract getHashingObject(T): HashingObjectType;

    create(hashingObject: HashingObjectType): T {
        return this.innerCreate(hashingObject);
    }

    constructor(private innerCreate: (hashingObject: HashingObjectType) => T) {
    }

    add(object: T): void {
        let hashingObject = this.getHashingObject(object);
        if (hashingObject === undefined || hashingObject === null)
            throw new Error(`hashingObject from ${object} is null or undefined.`)

        let hash = this.getHash(hashingObject);
        this.map = this.map || new Map<string, T>();
        this.map.set(hash, object);
    }

    get(hashingObject: HashingObjectType): T | undefined {
        let hash: KeyType = this.getHash(hashingObject);
        this.map = this.map || new Map<KeyType, T>();
        return this.map.get(hash);
    }

    getOrCreate(hashingObject: HashingObjectType): T | undefined {
        let obj: T | undefined = this.get(hashingObject);

        if (obj === undefined) {
            obj = this.create(hashingObject);
            if (!obj)
                return undefined;
            this.add(obj);
        }

        return obj;
    }

    get list(): T[] {
        return Array.from(this.map.values());
    }
}