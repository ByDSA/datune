
import { Immutables } from './Immutables';

function classTest() {
    return class {
        static STATIC = 12;
        static STATIC_OBJ = {
            a: 1,
            b: 2
        }

        constructor(private privateVar: number = 2, public publicVar = 3) {
        }
    };
}

function objTest() {
    return new (classTest());
}

test('immutableRecursive: change privateVar', () => {

    let obj = objTest();

    Immutables.lockr(obj);

    const t = () => {
        (<any>obj).privateVar = 22;
    };
    expect(t).toThrow(TypeError);
});

test('immutableRecursive: new key', () => {

    let obj = objTest();

    Immutables.lockr(obj);

    const t = () => {
        (<any>obj).asd = 22;
    };
    expect(t).toThrow(TypeError);
});

test('immutableRecursive: change static obj', () => {

    let obj = classTest();

    Immutables.lockr(obj);

    const t = () => {
        obj.STATIC_OBJ.a = 22;
    };
    expect(t).toThrow(TypeError);
});

test('immutableRecursive: change static', () => {

    let obj = classTest();

    Immutables.lockr(obj);

    const t = () => {
        obj.STATIC = 22;
    };
    expect(t).toThrow(TypeError);
});