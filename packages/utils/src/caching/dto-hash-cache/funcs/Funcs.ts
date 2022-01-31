import CreateFunc from "./CreateFunc";
import DtoFunc from "./DtoFunc";
import HashFunc from "./HashFunc";

type Funcs<T, Dto, HashCode> = {
  hash: HashFunc<Dto, HashCode>;
  toDto: DtoFunc<T, Dto>;
  create: CreateFunc<T, Dto>;
};

export default Funcs;
