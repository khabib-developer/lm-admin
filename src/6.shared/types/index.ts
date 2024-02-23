export enum sortType {
  asc = "+",
  desc = "-",
}

export type sortTypeValues = (typeof sortType)[keyof typeof sortType];
