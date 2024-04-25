export interface IVariablestore {
  globalVariable: IGlobalVariables | null;
  setGlobalVariable: (globalVariable: IGlobalVariables | null) => void;
  updateGlobalVariable: (key: keyof IGlobalVariables, value: number) => void;
}

export interface IGlobalVariables {
  id: number;
  gift: number;
  finally_number: number;
  done_verified_time: number;
  mock_cheating_max: number;
  mock_test_count_max: number;
  mock_test_count_min: number;
  balance: number;
  public_cheating_max: number;
  sentence_blocked_time_minutes: number;
  similar_ratio: number;
  phone_number: string;
  similar_distance: number;
  created_at: Date;
  updated_at: Date;
}

export const globalVariablesKeys = {
  gift: "Gift (sum)",
  finally_number: "Final number",
  done_verified_time: "Verified time (h)",
  mock_cheating_max: "Mock cheating max",
  mock_test_count_max: "Mock count max",
  mock_test_count_min: "Mock count min",
  public_cheating_max: "Public cheating",
  sentence_blocked_time_minutes: "Sentence block time (m)",
  similar_ratio: "Similar",
  // similar_distance: "Distance",
  balance: "Balance (sum)",
  phone_number: "Contact phone",
};
