export type DtoFunc<T, Dto> = (obj: T)=> Dto;

export type CreateFunc<T, Dto> = (dto: Dto)=> T;

export type HashFunc<Dto, HashCode> = (dto: Dto)=> HashCode;

export type OnCreateFunc<T, Dto, HashCode> = (obj: T, dto: Dto, hashCode: HashCode)=> void;

export type Funcs<T, Dto, HashCode> = {
  hash: HashFunc<Dto, HashCode>;
  toDto: DtoFunc<T, Dto>;
  create: CreateFunc<T, Dto>;
};
