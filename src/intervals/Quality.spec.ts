import { Language } from "../lang/Language";
import * as init from "../initializer";
import { Settings } from "../settings/Settings";
import { Quality } from './Quality';
init.qualities.default();
init.settings.default();

test('precalc - MAJOR', () => {
    let actual = Quality.MAJOR;
    expect(actual).not.toBeNull();
});

test('precalc - DOUBLY_DIMINISHED', () => {
    let actual = Quality.DOUBLY_DIMINISHED;
    expect(actual).not.toBeNull();
});

test('toString - ENG - MAJOR', () => {
    Settings.lang = Language.ENG;
    let actual = Quality.MAJOR.toString();
    let expected = "major";
    expect(actual).toBe(expected);
});

test('toString - ESP - MAJOR', () => {
    Settings.lang = Language.ESP;
    let actual = Quality.MAJOR.toString();
    let expected = "mayor";
    expect(actual).toBe(expected);
});

test('shortName - MAJOR', () => {
    let actual = Quality.MAJOR.shortName;
    let expected = "M";
    expect(actual).toBe(expected);
});

test('fromString - M', () => {
    let actual = Quality.fromString("M");
    let expected = Quality.MAJOR;
    expect(actual).toBe(expected);
});

test('fromString - m', () => {
    let actual = Quality.fromString("m");
    let expected = Quality.MINOR;
    expect(actual).toBe(expected);
});