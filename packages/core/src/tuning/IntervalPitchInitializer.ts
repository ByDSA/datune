import { Chromatic } from '../degrees/Chromatic';
import { IntervalPitch } from './IntervalPitch';
import { RatioFrac } from './ratios/RatioFrac';
import { RatioNumber } from './ratios/RatioNumber';
import { RatioPow2Frac } from './ratios/RatioPow2Frac';

export default () => {
    if (IntervalPitch.UNISON)
        return;

    IntervalPitch.UNISON = IntervalPitch.from(RatioNumber.from(1));
    IntervalPitch.CENT = IntervalPitch.from(RatioPow2Frac.fromCents(1));
    IntervalPitch.COMMAS.PYTHAGOREAN_COMMA = IntervalPitch.from(RatioFrac.from(531441, 524288));
    IntervalPitch.OCTAVE = IntervalPitch.from(RatioNumber.from(2));

    IntervalPitch.ET12.QUARTER_TONE = IntervalPitch.from(RatioPow2Frac.from(1, Chromatic.NUMBER * 2));
    IntervalPitch.ET12.SEMITONE = IntervalPitch.from(RatioPow2Frac.fromCents(100));
    IntervalPitch.ET12.MINOR_SECOND = IntervalPitch.ET12.SEMITONE;
    IntervalPitch.ET12.MAJOR_SECOND = IntervalPitch.from(RatioPow2Frac.fromCents(200));
    IntervalPitch.ET12.TONE = IntervalPitch.ET12.MAJOR_SECOND;
    IntervalPitch.ET12.MINOR_THIRD = IntervalPitch.from(RatioPow2Frac.fromCents(300));
    IntervalPitch.ET12.MAJOR_THIRD = IntervalPitch.from(RatioPow2Frac.fromCents(400));
    IntervalPitch.ET12.PERFECT_FOURTH = IntervalPitch.from(RatioPow2Frac.fromCents(500));
    IntervalPitch.ET12.TRITONE = IntervalPitch.from(RatioPow2Frac.fromCents(600));
    IntervalPitch.ET12.PERFECT_FIFTH = IntervalPitch.from(RatioPow2Frac.fromCents(700));
    IntervalPitch.ET12.MINOR_SIXTH = IntervalPitch.from(RatioPow2Frac.fromCents(800));
    IntervalPitch.ET12.MAJOR_SIXTH = IntervalPitch.from(RatioPow2Frac.fromCents(900));
    IntervalPitch.ET12.MINOR_SEVENTH = IntervalPitch.from(RatioPow2Frac.fromCents(1000));
    IntervalPitch.ET12.MAJOR_SEVENTH = IntervalPitch.from(RatioPow2Frac.fromCents(1100));

    IntervalPitch.PYTHAGOREAN.DIMINISHED_SECOND = IntervalPitch.from(RatioFrac.from(524288, 531441)); // lower than 1
    IntervalPitch.PYTHAGOREAN.COMMA = IntervalPitch.from(RatioFrac.from(531441, 524288)); // lower than 1
    IntervalPitch.PYTHAGOREAN.MINOR_SECOND = IntervalPitch.from(RatioFrac.from(256, 243))
    IntervalPitch.PYTHAGOREAN.AUGMENTED_UNISON = IntervalPitch.from(RatioFrac.from(2187, 2048))
    IntervalPitch.PYTHAGOREAN.DIMINISHED_THIRD = IntervalPitch.from(RatioFrac.from(65536, 59049));
    IntervalPitch.PYTHAGOREAN.MAJOR_SECOND = IntervalPitch.from(RatioFrac.from(9, 8));
    IntervalPitch.PYTHAGOREAN.MINOR_THIRD = IntervalPitch.from(RatioFrac.from(32, 27));
    IntervalPitch.PYTHAGOREAN.AUGMENTED_SECOND = IntervalPitch.from(RatioFrac.from(19683, 16384));
    IntervalPitch.PYTHAGOREAN.DIMINISHED_FOURTH = IntervalPitch.from(RatioFrac.from(8192, 6561));
    IntervalPitch.PYTHAGOREAN.MAJOR_THIRD = IntervalPitch.from(RatioFrac.from(81, 64));
    IntervalPitch.PYTHAGOREAN.PERFECT_FOURTH = IntervalPitch.from(RatioFrac.from(4, 3));
    IntervalPitch.PYTHAGOREAN.AUGMENTED_THIRD = IntervalPitch.from(RatioFrac.from(177147, 131072));
    IntervalPitch.PYTHAGOREAN.DIMINISHED_FIFTH = IntervalPitch.from(RatioFrac.from(1024, 729));
    IntervalPitch.PYTHAGOREAN.AUGMENTED_FOURTH = IntervalPitch.from(RatioFrac.from(729, 512));
    IntervalPitch.PYTHAGOREAN.TRITONE = IntervalPitch.PYTHAGOREAN.DIMINISHED_FIFTH;
    IntervalPitch.PYTHAGOREAN.DIMINISHED_SIXTH = IntervalPitch.from(RatioFrac.from(262144, 177147));
    IntervalPitch.PYTHAGOREAN.PERFECT_FIFTH = IntervalPitch.from(RatioFrac.from(3, 2));
    IntervalPitch.PYTHAGOREAN.MINOR_SIXTH = IntervalPitch.from(RatioFrac.from(128, 81));
    IntervalPitch.PYTHAGOREAN.AUGMENTED_FIFTH = IntervalPitch.from(RatioFrac.from(6561, 4096));
    IntervalPitch.PYTHAGOREAN.DIMINISHED_SEVENTH = IntervalPitch.from(RatioFrac.from(32768, 19683));
    IntervalPitch.PYTHAGOREAN.MAJOR_SIXTH = IntervalPitch.from(RatioFrac.from(27, 16));
    IntervalPitch.PYTHAGOREAN.MINOR_SEVENTH = IntervalPitch.from(RatioFrac.from(16, 9));
    IntervalPitch.PYTHAGOREAN.AUGMENTED_SIXTH = IntervalPitch.from(RatioFrac.from(59049, 32768));
    IntervalPitch.PYTHAGOREAN.DIMINISHED_OCTAVE = IntervalPitch.from(RatioFrac.from(4096, 2187));
    IntervalPitch.PYTHAGOREAN.MAJOR_SEVENTH = IntervalPitch.from(RatioFrac.from(243, 128));
    IntervalPitch.PYTHAGOREAN.AUGMENTED_SEVENTH = IntervalPitch.from(RatioFrac.from(531441, 262144));

    IntervalPitch.JUST.QUARTER_TONE = IntervalPitch.from(RatioFrac.from(246, 239));
    IntervalPitch.JUST.MINOR_SECOND = IntervalPitch.from(RatioFrac.from(16, 15));
    IntervalPitch.JUST.SEMITONE = IntervalPitch.JUST.MINOR_SECOND;
    IntervalPitch.JUST.DIMINISHED_THIRD = IntervalPitch.from(RatioFrac.from(256, 225));
    IntervalPitch.JUST.MAJOR_TONE = IntervalPitch.PYTHAGOREAN.MAJOR_SECOND;
    IntervalPitch.JUST.MINOR_TONE = IntervalPitch.from(RatioFrac.from(10, 9));
    IntervalPitch.JUST.AUGMENTED_SECOND = IntervalPitch.from(RatioFrac.from(75, 64));
    IntervalPitch.JUST.MINOR_THIRD = IntervalPitch.from(RatioFrac.from(6, 5));
    IntervalPitch.JUST.MAJOR_THIRD = IntervalPitch.from(RatioFrac.from(5, 4));
    IntervalPitch.JUST.AUGMENTED_THIRD = IntervalPitch.from(RatioFrac.from(125, 96));
    IntervalPitch.JUST.PERFECT_FOURTH = IntervalPitch.PYTHAGOREAN.PERFECT_FOURTH;
    IntervalPitch.JUST.AUGMENTED_FOURTH = IntervalPitch.from(RatioFrac.from(45, 32));
    IntervalPitch.JUST.DIMINISHED_FIFTH = IntervalPitch.from(RatioFrac.from(36, 25));
    IntervalPitch.JUST.TRITONE = IntervalPitch.from(RatioFrac.from(64, 45));
    IntervalPitch.JUST.PERFECT_FIFTH = IntervalPitch.PYTHAGOREAN.PERFECT_FIFTH;
    IntervalPitch.JUST.AUGMENTED_FIFTH = IntervalPitch.from(RatioFrac.from(25, 16));
    IntervalPitch.JUST.MINOR_SIXTH = IntervalPitch.from(RatioFrac.from(8, 5));
    IntervalPitch.JUST.MAJOR_SIXTH = IntervalPitch.from(RatioFrac.from(5, 3));
    IntervalPitch.JUST.DIMINISHED_SEVENTH = IntervalPitch.from(RatioFrac.from(128, 75));
    IntervalPitch.JUST.AUGMENTED_SIXTH = IntervalPitch.from(RatioFrac.from(125, 72));
    IntervalPitch.JUST.AUGMENTED_SIXTH2 = IntervalPitch.from(RatioFrac.from(225, 128));
    IntervalPitch.JUST.MINOR_SEVENTH_SMALL = IntervalPitch.PYTHAGOREAN.MINOR_SEVENTH;
    IntervalPitch.JUST.MINOR_SEVENTH_GREATER = IntervalPitch.from(RatioFrac.from(9, 5));
    IntervalPitch.JUST.MAJOR_SEVENTH = IntervalPitch.from(RatioFrac.from(15, 8));
    IntervalPitch.JUST.AUGMENTED_SEVENTH = IntervalPitch.from(RatioFrac.from(125, 64));
    IntervalPitch.JUST.PERFECT_TWELFTH = IntervalPitch.from(RatioFrac.from(3, 1));

}