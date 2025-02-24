export type Dto = string;

export default class Quality {
  private shortName: string;

  private constructor(dto: Dto) {
    this.shortName = dto;
  }

  toString() {
    return this.shortName;
  }
}
