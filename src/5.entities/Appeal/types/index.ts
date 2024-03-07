export interface IAppeal {
  id: number;
  created_at: Date;
  updated_at: Date;
  status: boolean;
  active: boolean;
  verify_score_sentence: IVerifyScoreSentence;
}

interface IVerifyScoreSentence {
  id: number;
  created_at: Date;
  updated_at: Date;
  collected_this_sentence: number;
  done_sentence: string;
  penalty: number;
  user_text: string;
  verify_score: number;
  change_index: {
    [key: number]: string;
  };
}
