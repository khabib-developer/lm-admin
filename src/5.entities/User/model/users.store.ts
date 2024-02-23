import { create } from "zustand";
import { IUsersStore } from "./type.store";
import { IUser } from "../types";

export const useUsersStore = create<IUsersStore>((set) => ({
  users: [],
  setUsers: (users: IUser[]) => set({ users }),
  userId: null,
  setUserId: (userId: null | number) => set({ userId }),
}));
