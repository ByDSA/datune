import { Language } from "../lang/Language";
import * as init from "../initializer";
import { Settings } from "../settings/Settings";
import { Chromatic } from "./Chromatic";
import { Diatonic } from "./Diatonic";
init.chromatics.default();
init.diatonics.default();
init.settings.default();

test('chromatic: B ', () => {
    expect(Diatonic.B.chromatic).toBe(Chromatic.B);
});

test('chromatic: C ', () => {
    expect(Diatonic.C.chromatic).toBe(Chromatic.C);
});

test('chromatic: A ', () => {
    expect(Diatonic.A.chromatic).toBe(Chromatic.A);
});

test('fromString - ESP - Do', () => {
    Settings.lang = Language.ESP;
    expect(Diatonic.fromString("Do")).toBe(Diatonic.C);
});

test('fromString - ESP - La#', () => {
    Settings.lang = Language.ESP;
    let diatonic = Diatonic.fromString("La#");
    expect(diatonic).toBeNull();
});

test('fromString - ESP - La (spaces)', () => {
    Settings.lang = Language.ESP;
    expect(Diatonic.fromString("   La    ")).toBe(Diatonic.A);
});

test('fromString - ESP - La (spaces middle)', () => {
    Settings.lang = Language.ESP;
    expect(Diatonic.fromString("   L a     ")).toBe(Diatonic.A);
});

test('fromString - ESP - Lab', () => {
    Settings.lang = Language.ESP;
    let diatonic = Diatonic.fromString("Lab");
    expect(diatonic).toBeNull();
});

test('fromString - ESP - C', () => {
    Settings.lang = Language.ESP;
    let diatonic = Diatonic.fromString("C");
    expect(diatonic).toBeNull();
});

test('fromString - ENG - C', () => {
    Settings.lang = Language.ENG;
    expect(Diatonic.fromString("C")).toBe(Diatonic.C);
});

test('fromString - ENG - A (spaces)', () => {
    Settings.lang = Language.ENG;
    expect(Diatonic.fromString("   A    ")).toBe(Diatonic.A);
});

test('fromString - ENG - La# (spaces middle)', () => {
    Settings.lang = Language.ENG;
    expect(Diatonic.fromString("   A     ")).toBe(Diatonic.A);
});

test('fromString - ENG - Ab', () => {
    Settings.lang = Language.ENG;
    let diatonic = Diatonic.fromString("Ab");
    expect(diatonic).toBeNull();
});

test('fromString - ENG - Do', () => {
    Settings.lang = Language.ENG;
    let diatonic = Diatonic.fromString("Do");
    expect(diatonic).toBeNull();
});