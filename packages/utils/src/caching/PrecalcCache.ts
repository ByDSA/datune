type KeyType = string;
type OnCreate<T> = (hash: string, obj: T)=> void;
type GetHashFunc<HashingObjectType> = (hashingObject: HashingObjectType)=> KeyType;
type GetHashingObjectFunc<T, HashingObjectType> = (t: T)=> HashingObjectType;
type InnerCreateFunc<T, HashingObjectType> = (hashingObject: HashingObjectType)=> T;
export type Funcs<T, HashingObjectType> = {
  getHash: GetHashFunc<HashingObjectType>;
  getHashingObject: GetHashingObjectFunc<T, HashingObjectType>;
  innerCreate: InnerCreateFunc<T, HashingObjectType>;
};

export default class PrecalcCache<T, HashingObjectType> {
  private _map: Map<KeyType, T>;

  getHash: GetHashFunc<HashingObjectType>;

  getHashingObject: GetHashingObjectFunc<T, HashingObjectType>;

  private _innerCreate: InnerCreateFunc<T, HashingObjectType>;

  constructor(funcs: Funcs<T, HashingObjectType>) {
    this.getHash = funcs.getHash;
    this.getHashingObject = funcs.getHashingObject;
    this._innerCreate = funcs.innerCreate;
    this._map = new Map<string, T>();
  }

  add(object: T): T {
    const hashingObject = this.getHashingObject(object);
    const hash: KeyType = this.getHash(hashingObject);
    const currentObject = this._map.get(hash);

    if (currentObject)
      return currentObject;

    this._innerAdd(hash, object);

    return object;
  }

  private _innerAdd(hash: KeyType, obj: T) {
    this._map.set(hash, obj);
  }

  get(hashingObject: HashingObjectType): T | undefined {
    const hash: KeyType = this.getHash(hashingObject);

    return this._innerGet(hash);
  }

  private _innerGet(hash: KeyType): T | undefined {
    return this._map.get(hash);
  }

  getOrCreate(hashingObject: HashingObjectType, onCreate: OnCreate<T> = () => { } ): T {
    const hash = this.getHash(hashingObject);
    let obj: T | undefined = this._innerGet(hash);

    if (obj === undefined) {
      obj = this._innerCreate(hashingObject);
      this._innerAdd(hash, obj);
      onCreate(hash, obj);
    }

    return obj;
  }

  // eslint-disable-next-line accessor-pairs
  get list(): T[] {
    return [...this._map.values()];
  }

  clear() {
    if (this._map)
      this._map.clear();
  }
}
