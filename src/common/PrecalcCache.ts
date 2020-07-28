import { Assert } from './Assert';

type KeyType = string;
export abstract class PrecalcCache<T, HashingObjectType> {
    private map: Map<KeyType, T>;

    public abstract getHash(hashingObject: HashingObjectType): KeyType;
    public abstract getHashingObject(T): HashingObjectType;
    public abstract create(hashingObject: HashingObjectType): T;

    public constructor() {
    }

    public add(object: T): void {
        let hashingObject = this.getHashingObject(object);
        if (hashingObject === undefined || hashingObject === null)
            throw new Error(`hashingObject from ${object} is null or undefined.`)

        let hash = this.getHash(hashingObject);
        this.map = this.map || new Map<string, T>();
        this.map.set(hash, object);
    }

    public get(hashingObject: HashingObjectType): T | undefined {
        let hash: KeyType = this.getHash(hashingObject);
        this.map = this.map || new Map<KeyType, T>();
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