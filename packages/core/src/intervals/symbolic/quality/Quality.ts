export type Dto = string;

export class Quality {
  private shortName: string;

  private constructor(dto: Dto) {
    this.shortName = dto;
  }

  toString() {
    return this.shortName;
  }
}
