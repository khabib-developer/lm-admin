import { IUser } from "../types";

export interface IUsersStore {
  users: IUser[];
  setUsers: (properNouns: IUser[]) => void;
  userId: number | null;
  setUserId: (userId: number | null) => void;
}
