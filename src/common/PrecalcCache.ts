import { Assert } from './Assert';

export class PrecalcCache<T, HashingObjectType> {
    private map: Map<string, T>;

    public getHash: (hashingObject:HashingObjectType) => string;
    public getHashingObject: (T) => HashingObjectType;
    private create: (hashingObject:HashingObjectType) => T;

    public constructor(getHash, getHashingObject, create) {
        this.getHash = getHash;
        this.getHashingObject = getHashingObject;
        this.create = create;
    }

    public add(object: T): void {
        let hashingObject = this.getHashingObject(object);
        if (hashingObject === undefined)
            throw new Error("No hashingObject has been put.");
        let hash = this.getHash(hashingObject);

        this.map = this.map || new Map<string, T>();
        this.map.set(hash, object);
    }

    public get(hashingObject: HashingObjectType): T | undefined {
        let hash = this.getHash(hashingObject);
        this.map = this.map || new Map<string, T>();
        return this.map.get(hash);
    }

    public getOrCreate(hashingObject: HashingObjectType): T {
        let obj: T | undefined = this.get(hashingObject);

        if (obj === undefined) {
            obj = this.create(hashingObject);
            Assert.notNull(obj);
            this.add(obj);
        }

        return obj;
    }

    public get list(): T[] {
        return Array.from(this.map.values());
    }
}