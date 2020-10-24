import { Interval } from "./Interval";

test('contains - 3 in [0, 10)', () => {
    let interval: Interval<number> = Interval.fromInclusiveToExclusive(0, 10);
    let element = 3;

    let actual = interval.contains(element);
    let expected = true;

    expect(actual).toEqual(expected);
});

test('contains - -1 not in [0, 10)', () => {
    let interval: Interval<number> = Interval.fromInclusiveToExclusive(0, 10);
    let element = -1;

    let actual = interval.contains(element);
    let expected = false;

    expect(actual).toEqual(expected);
});

test('contains - 0 in [0, 10)', () => {
    let interval: Interval<number> = Interval.fromInclusiveToExclusive(0, 10);
    let element = 0;

    let actual = interval.contains(element);
    let expected = true;

    expect(actual).toEqual(expected);
});

test('contains - 10 not in [0, 10)', () => {
    let interval: Interval<number> = Interval.fromInclusiveToExclusive(0, 10);
    let element = 10;

    let actual = interval.contains(element);
    let expected = false;

    expect(actual).toEqual(expected);
});

test('contains - 10 in [0, 10]', () => {
    let interval: Interval<number> = Interval.from(0, true, 10, true);
    let element = 10;

    let actual = interval.contains(element);
    let expected = true;

    expect(actual).toEqual(expected);
});

test('contains - 0 in (0, 10)', () => {
    let interval: Interval<number> = Interval.from(0, false, 10, false);
    let element = 0;

    let actual = interval.contains(element);
    let expected = false;

    expect(actual).toEqual(expected);
});

test('intersects - [0,1] and [2,4]', () => {
    let interval1: Interval<number> = Interval.fromInclusiveToExclusive(0, 1);
    let interval2: Interval<number> = Interval.fromInclusiveToExclusive(2, 4);

    let intersects1 = interval1.intersects(interval2);
    let intersects2 = interval2.intersects(interval1);

    expect(intersects1).toBeFalsy();
    expect(intersects2).toBeFalsy();
})

test('intersects - [0,1] and itself', () => {
    let interval1: Interval<number> = Interval.fromInclusiveToExclusive(0, 1);
    let interval2: Interval<number> = Interval.fromInclusiveToExclusive(0, 1);

    let intersects1 = interval1.intersects(interval2);
    let intersects2 = interval2.intersects(interval1);

    expect(intersects1).toBeTruthy();
    expect(intersects2).toBeTruthy();
});

test('intersects - [0,1] and [1,2]', () => {
    let interval1: Interval<number> = Interval.fromInclusiveToExclusive(0, 1);
    let interval2: Interval<number> = Interval.fromInclusiveToExclusive(1, 2);

    let intersects1 = interval1.intersects(interval2);
    let intersects2 = interval2.intersects(interval1);

    expect(intersects1).toBeFalsy();
    expect(intersects2).toBeFalsy();
});