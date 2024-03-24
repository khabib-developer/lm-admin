export interface ITerm {
  id: number;
  text: string;
}

export interface ITermsStore {
  terms: ITerm[];
  setTerms: (terms: ITerm[]) => void;
  addTerm: (term: ITerm) => void;
  updateTerm: (term: ITerm) => void;
  deleteTermId: number | null;
  setDeleteTermId: (termId: number | null) => void;
  deleteTerm: (id: number) => void;
}
