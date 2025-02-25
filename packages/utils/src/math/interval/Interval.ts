type Interval<C> = Readonly<{
    from: C;
    fromInclusive?: boolean;
    to: C;
    toInclusive?: boolean;
}>;

export default Interval;
