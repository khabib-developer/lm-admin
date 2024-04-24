export enum sentenceStatus {
  new = "new",
  other = "other",
  processing = "processing",
  has_proper_noun = "has_proper_noun",
  waiting = "done_waiting",
  wrong = "wrong",
  done = "done",
  mock = "mock",
}

export enum sortSentence {
  "Created" = "created_at",
  "Public" = "cheater_public_count",
  "Mock" = "cheater_mock_count",
  "wrong" = "wrong_number",
  "actual" = "actual_number",
}

export type typeOfSortSentence =
  (typeof sortSentence)[keyof typeof sortSentence];

export interface ISentence {
  id: number;
  cheater_mock_count: number;
  cheater_public_count: number;
  old_value: string;
  new_value: string;
  actual_number: number;
  wrong_number: number;
  status: (typeof sentenceStatus)[keyof typeof sentenceStatus];
  is_mock: boolean;
  reviewer_time?: Date;
  on_review: boolean;
  has_proper_noun: boolean;
  done_waiting_date: Date;
  created_at: Date;
  updated_at: Date;
  reviewer_by?: number[];
}

export interface ICreateDataset {
  text: string;
  is_mock: boolean;
  correct_text?: string;
}

export interface IQuantity {
  [sentenceStatus.other]: number;
  [sentenceStatus.new]: number;
  [sentenceStatus.has_proper_noun]: number;
  [sentenceStatus.processing]: number;
  [sentenceStatus.waiting]: number;
  [sentenceStatus.wrong]: number;
  [sentenceStatus.done]: number;
  [sentenceStatus.mock]: number;
}

export interface IHistory {
  id: number;
  sentence: number;
  user: {
    id: number;
    username: string;
  };
  status: keyof typeof statusOFHistoryItem;
  has_proper_noun: boolean;
  user_text: string;
  created_at: string;
}

export enum statusOFHistoryItem {
  change = "change",
  wrong = "wrong",
  next = "next",
}

export enum properNounClass {
  PLACE = "PLACE",
  NAME_MALE = "NAME_MALE",
  NAME_FEMALE = "NAME_FEMALE",
  NULL = "NULL",
  SHORT_WORDS = "SHORT_WORDS",
  OTHER = "OTHER",
}

export enum properNounStatus {
  accept = "accept",
  edit = "edit",
  delete = "delete",
}

export interface IProperNoun {
  id: number;
  value: string;
  base: string;
  class: keyof typeof properNounClass;
  status: keyof typeof properNounStatus;
  index: number;
  errorValue?: boolean;
  errorBase?: boolean;
}
