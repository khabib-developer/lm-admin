export enum sentenceStatus {
  new = "new",
  processing = "processing",
  waiting = "waiting",
  wrong = "wrong",
  done = "done",
  mock = "mock",
}

export interface ISentence {
  id: number;
  old_value: string;
  new_value: string;
  actual_number: number;
  status: keyof typeof sentenceStatus;
  is_mock: boolean;
  reviewer_time?: Date;
  has_proper_noun: boolean;
  created_at: Date;
  updated_at: Date;
  reviewer_by?: number;
}

export interface ICreateDataset {
  old_value: string;
  is_mock: boolean;
}

export interface IQuantity {
  [sentenceStatus.new]: number;
  [sentenceStatus.processing]: number;
  [sentenceStatus.waiting]: number;
  [sentenceStatus.wrong]: number;
  [sentenceStatus.done]: number;
  [sentenceStatus.mock]: number;
}
