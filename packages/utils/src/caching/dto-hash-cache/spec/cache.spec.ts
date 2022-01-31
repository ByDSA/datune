import Hashids from "hashids";
import DtoHashCache from "../DtoHashCache";
import TestClass, { from, H } from "./TestClass";
import { value1 } from "./Values";

beforeAll(() => {
  const funcs = {
    hash(hashingObject: H): string {
      return new Hashids().encode([hashingObject.a, hashingObject.b]);
    },
    toDto(c: TestClass): H {
      return c.hashingObject;
    },
    create(hashingObject: H): TestClass {
      return new TestClass(hashingObject);
    },
  };

  TestClass.cache = new DtoHashCache<TestClass, H, string>(funcs);
} );
describe("functions", () => {
  beforeEach(() => {
    TestClass.cache.clear();
  } );

  describe("initial status", () => {
    it("Cache should not contain", () => {
      const get = TestClass.cache.get(value1);

      expect(get).toBeUndefined();
    } );
  } );

  describe("add", () => {
    it("New value with constructor", () => {
      const hashingObject = value1;
      const instance = new TestClass(hashingObject);

      (<any>TestClass.cache).add(instance);
      const get = TestClass.cache.get(hashingObject);

      expect(get).toBeDefined();
    } );

    it("New value with from", () => {
      const hashingObject = value1;

      from(hashingObject);
      const got = TestClass.cache.get(hashingObject);

      expect(got).toBeDefined();
    } );

    describe("Re-add", () => {
      it("Same reference", () => {
        const hashingObject = value1;
        const instance = new TestClass(hashingObject);
        const ret = TestClass.cache.add(instance);
        const ret2 = TestClass.cache.add(instance);

        expect(ret).toBe(ret2);
      } );

      describe("Not same reference", () => {
        it("Same hashing object reference. Second ignored one, returns old one", () => {
          const hashingObject = value1;
          const instance = new TestClass(hashingObject);
          const instance2 = new TestClass(hashingObject);
          const ret = TestClass.cache.add(instance);
          const ret2 = TestClass.cache.add(instance2);

          expect(ret).toBe(ret2);
          // eslint-disable-next-line no-underscore-dangle
          expect((<any>TestClass.cache)._hashMap.size).toBe(1);
        } );

        it("Not same hashing object reference. Second one ignored, returns old one", () => {
          const hashingObject = value1;
          const hashingObjectCopy = {
            ...value1,
          };
          const instance = new TestClass(hashingObject);
          const instanceCopy = new TestClass(hashingObjectCopy);
          const ret = TestClass.cache.add(instance);
          const ret2 = TestClass.cache.add(instanceCopy);

          expect(ret).toBe(ret2);
          // eslint-disable-next-line no-underscore-dangle
          expect((<any>TestClass.cache)._hashMap.size).toBe(1);
        } );
      } );
    } );
  } );

  it("getOrCreate from same instance {a: 1, b: 2} twice returns the same instance", () => {
    const hashingObject = {
      a: 1,
      b: 2,
    };
    const instance = from(hashingObject);
    const instance2 = from(hashingObject);

    expect(instance).toBe(instance2);
  } );

  it("getOrCreate from different instance {a: 1, b: 2} twice returns the same instance", () => {
    const hashingObject = {
      a: 1,
      b: 2,
    };
    const hashingObject2 = {
      b: 2,
      a: 1,
    };
    const instance = from(hashingObject);
    const instance2 = from(hashingObject2);

    expect(instance).toBe(instance2);
  } );

  it("clear", () => {
    const hashingObject = {
      a: 1,
      b: 2,
    };
    const instance = from(hashingObject);

    TestClass.cache.clear();
    const instance2 = from(hashingObject);

    expect(instance).not.toBe(instance2);
    expect(instance).toStrictEqual(instance2);
  } );
} );
