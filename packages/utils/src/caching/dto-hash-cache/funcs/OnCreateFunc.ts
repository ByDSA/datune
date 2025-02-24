type OnCreateFunc<T, Dto, HashCode> = (obj: T, dto: Dto, hashCode: HashCode)=> void;

export default OnCreateFunc;
