import Interval from "./Interval";

describe("contains", () => {
  test("3 in [0, 10)", () => {
    const interval: Interval<number> = Interval.of(0, 10);
    const element = 3;
    const actual = interval.contains(element);
    const expected = true;

    expect(actual).toEqual(expected);
  } );

  test("-1 not in [0, 10)", () => {
    const interval: Interval<number> = Interval.of(0, 10);
    const element = -1;
    const actual = interval.contains(element);
    const expected = false;

    expect(actual).toEqual(expected);
  } );

  test("0 in [0, 10)", () => {
    const interval: Interval<number> = Interval.of(0, 10);
    const element = 0;
    const actual = interval.contains(element);
    const expected = true;

    expect(actual).toEqual(expected);
  } );

  test("10 not in [0, 10)", () => {
    const interval: Interval<number> = Interval.of(0, 10);
    const element = 10;
    const actual = interval.contains(element);

    expect(actual).toBeFalsy();
  } );

  test("10 in [0, 10]", () => {
    const obj = {
      from: 0,
      fromInclusive: true,
      to: 10,
      toInclusive: true,
    };
    const interval: Interval<number> = new Interval(obj);
    const element = 10;
    const actual = interval.contains(element);

    expect(actual).toBeTruthy();
  } );

  test("0 in (0, 10)", () => {
    const obj = {
      from: 0,
      fromInclusive: false,
      to: 10,
      toInclusive: false,
    };
    const interval: Interval<number> = new Interval(obj);
    const element = 0;
    const actual = interval.contains(element);

    expect(actual).toBeFalsy();
  } );
} );

describe("intersects", () => {
  test("[0,1) and [2,4)", () => {
    const interval1: Interval<number> = Interval.of(0, 1);
    const interval2: Interval<number> = Interval.of(2, 4);
    const intersects1 = interval1.intersects(interval2);
    const intersects2 = interval2.intersects(interval1);

    expect(intersects1).toBeFalsy();
    expect(intersects2).toBeFalsy();
  } );

  test("[0,1] and itself", () => {
    const interval1: Interval<number> = Interval.of(0, 1);
    const interval2: Interval<number> = Interval.of(0, 1);
    const intersects1 = interval1.intersects(interval2);
    const intersects2 = interval2.intersects(interval1);

    expect(intersects1).toBeTruthy();
    expect(intersects2).toBeTruthy();
  } );

  test("[0,1) and [1,2)", () => {
    const interval1: Interval<number> = Interval.of(0, 1);
    const interval2: Interval<number> = Interval.of(1, 2);
    const intersects1 = interval1.intersects(interval2);
    const intersects2 = interval2.intersects(interval1);

    expect(intersects1).toBeFalsy();
    expect(intersects2).toBeFalsy();
  } );
} );

it("info", () => {
  const expectedInterval = Interval.of(0, 1);

  expect(expectedInterval.from).toBe(0);
  expect(expectedInterval.to).toBe(1);
} );
