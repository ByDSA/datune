/* eslint-disable no-underscore-dangle */
import { CreateFunc, DtoFunc, Funcs, HashFunc, OnCreateFunc } from "./funcs";

export class DtoHashCache<T, Dto, HashCode> {
  private _hashMap: Map<HashCode, T>;

  hash: HashFunc<Dto, HashCode>;

  toDto: DtoFunc<T, Dto>;

  #create: CreateFunc<T, Dto>;

  #onCreate?: OnCreateFunc<T, Dto, HashCode>;

  constructor(
    { hash, toDto, create }: Funcs<T, Dto, HashCode>,
    onCreate?: OnCreateFunc<T, Dto, HashCode>,
  ) {
    this.hash = hash;
    this.toDto = toDto;
    this.#create = create;
    this._hashMap = new Map<HashCode, T>();

    this.#onCreate = onCreate;
  }

  add(object: T): T {
    const dto = this.toDto(object);
    const hashCode = this.hash(dto);
    const obj = this._hashMap.get(hashCode);

    if (obj)
      return obj;

    this._hashMap.set(hashCode, object);

    return object;
  }

  get(hashingObject: Dto): T | undefined {
    const hashCode: HashCode = this.hash(hashingObject);

    return this.getByHashCode(hashCode);
  }

  private getByHashCode(hashCode: HashCode): T | undefined {
    return this._hashMap.get(hashCode);
  }

  getOrCreate(dto: Dto, onCreate?: OnCreateFunc<T, Dto, HashCode>): T {
    const hashCode = this.hash(dto);
    let obj: T | undefined = this.getByHashCode(hashCode);

    if (obj === undefined) {
      obj = this.#create(dto);
      this._hashMap.set(hashCode, obj);

      if (this.#onCreate)
        this.#onCreate(obj, dto, hashCode);

      if (onCreate)
        onCreate(obj, dto, hashCode);
    }

    return obj;
  }

  clear() {
    this._hashMap.clear();
  }

  serialize() {
    return [...this._hashMap.entries()];
  }

  putAll(entries: [HashCode, T][]) {
    entries.forEach(([key, value]) => this._hashMap.set(key, value));
  }

  initialize(entries: [HashCode, T][]) {
    this._hashMap = new Map(entries);
  }
}
