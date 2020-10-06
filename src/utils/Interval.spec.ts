import * as init from "../initializer";
import { Interval } from "./Interval";
init.musicalDurations.default();
init.bpms.default();

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