import { INotification, IUserAdmin } from "../types";

export interface IAppStore {
  user: null | IUserAdmin;
  setUser: (user: null | IUserAdmin) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  info: string | null;
  setInfo: (info: string | null) => void;
  modal: boolean;
  setModal: (modal: boolean) => void;
  cookie: string;
  setCookie: (cookie: string) => void;
  notifications: INotification[];
  setNotifications: (notifications: INotification[]) => void;
  deleteMessageNotifications: (sender: number) => void;
  addNotification: (notification: INotification) => void;
}
