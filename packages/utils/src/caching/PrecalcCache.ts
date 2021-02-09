type KeyType = string;
export abstract class PrecalcCache<T, HashingObjectType> {
    private _map: Map<KeyType, T> | undefined;

    abstract getHash(hashingObject: HashingObjectType): KeyType;

    abstract getHashingObject(t:T): HashingObjectType;

    constructor(private _innerCreate: (hashingObject: HashingObjectType) => T) {
    }

    add(object: T): T {
        let hashingObject = this.getHashingObject(object);
        if (hashingObject === undefined || hashingObject === null)
            throw new Error(`hashingObject from ${object} is null or undefined.`);

        let hash: KeyType = this.getHash(hashingObject);

        this._map = this._getValidMap();
        const currentObject = this._map.get(hash);
        if (currentObject)
            return currentObject;

        this._innerAdd(hash, object);

        return object;
    }

    private _getValidMap(): Map<string, T> {
        return this._map || new Map<string, T>();
    }

    private _innerAdd(hash: KeyType, obj: T) {
        this._map = this._getValidMap();
        this._map.set(hash, obj);
    }

    get(hashingObject: HashingObjectType): T | undefined {
        let hash: KeyType = this.getHash(hashingObject);
        return this._innerGet(hash);
    }

    private _innerGet(hash: KeyType): T | undefined {
        this._map = this._getValidMap();
        return this._map.get(hash);
    }

    getOrCreate(hashingObject: HashingObjectType, onCreate: (hash: string, obj: T) => void = () => { }): T {
        const hash = this.getHash(hashingObject);
        let obj: T | undefined = this._innerGet(hash);

        if (obj === undefined) {
            obj = this._innerCreate(hashingObject);
            this._innerAdd(hash, obj);
            onCreate(hash, obj);
        }

        return obj;
    }

    get list(): T[] {
        if (!this._map)
            return [];
        return [...this._map.values()];
    }

    clear() {
        if (this._map)
            this._map.clear();
    }
}