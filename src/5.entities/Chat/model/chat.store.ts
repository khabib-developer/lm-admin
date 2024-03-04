import { create } from "zustand";
import { IChatStore } from "./type.store";
import { IMessage, IUserChat } from "../types";

export const useChatStore = create<IChatStore>((set) => ({
  permission: false,
  setPermission: (permission: boolean) => set({ permission }),
  userList: [],
  setUserList: (userList: IUserChat[]) => set({ userList }),
  pushToUserList: (user: IUserChat) =>
    set((state) => {
      const userList = [...state.userList];
      if (!userList.find((u) => u.id === user.id)) userList.push(user);
      return {
        userList,
      };
    }),
  addMessage: (userId: number, message: IMessage) =>
    set((state) => {
      const id = userId === 0 && state.userId ? state.userId : userId;
      return {
        userList: state.userList.map((user) => {
          if (+user.id === +id) {
            return { ...user, messages: [...user.messages, message] };
          }
          return user;
        }),
      };
    }),
  userId: null,
  setUserId: (userId: number | null) => set({ userId }),
  scrollOffsets: {},
  setScrollOffsets: (id: number, scrollOffset: number) =>
    set((state) => {
      return {
        scrollOffsets: {
          ...state.scrollOffsets,
          [id]: scrollOffset,
        },
      };
    }),
}));
