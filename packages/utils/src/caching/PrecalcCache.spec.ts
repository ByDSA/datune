import { PrecalcCache } from './PrecalcCache';
const Hashids = require('hashids/cjs')

type H = { a: number, b: number };
class TestClass {
    constructor(private params: H) {
    }

    static _cache: TestCache;

    get hashingObject(): H {
        return this.params;
    }

    static from(params: H) {
        return this._cache.getOrCreate(params);
    }
}

class TestCache extends PrecalcCache<TestClass, H> {
    getHash(hashingObject: H): string {
        return new Hashids().encode([hashingObject.a, hashingObject.b]);
    }

    getHashingObject(c: TestClass): H {
        return c.hashingObject;
    }
}
beforeAll(() => {
    TestClass._cache = new TestCache((hashingObject: H) => new TestClass(hashingObject));
})

it('Cache should not contain {a: 1, b: 2}', () => {
    const get = TestClass._cache.get({ a: 1, b: 2 });
    expect(get).toBeUndefined();
})

it('Add {a: 1, b: 2} to cache', () => {
    const hashingObject = { a: 1, b: 2 };
    const instance = new TestClass(hashingObject);
    (<any>TestClass._cache).add(instance);
    const get = TestClass._cache.get(hashingObject);
    expect(get).not.toBeNull();
    expect(get).not.toBeUndefined();
})

it('getOrCreate from same instance {a: 1, b: 2} twice returns the same instance', () => {
    const hashingObject = { a: 1, b: 2 };
    const instance = TestClass.from(hashingObject);
    const instance2 = TestClass.from(hashingObject);

    expect(instance).toBe(instance2);
})

it('getOrCreate from different instance {a: 1, b: 2} twice returns the same instance', () => {
    const hashingObject = { a: 1, b: 2 };
    const hashingObject2 = { b: 2, a: 1 };
    const instance = TestClass.from(hashingObject);
    const instance2 = TestClass.from(hashingObject2);

    expect(instance).toBe(instance2);
})

it('clear', () => {
    const hashingObject = { a: 1, b: 2 };
    const instance = TestClass.from(hashingObject);
    (<any>TestClass._cache).clear();
    const instance2 = TestClass.from(hashingObject);

    expect(instance).not.toBe(instance2);
    expect(instance).toStrictEqual(instance2);
})