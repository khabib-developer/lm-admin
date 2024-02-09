export interface IAppStore {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  info: string | null;
  setInfo: (info: string | null) => void;
  modal: boolean;
  setModal: (modal: boolean) => void;
}
