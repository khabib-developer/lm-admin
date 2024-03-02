import { create } from "zustand";
import { IChatStore } from "./type.store";
import { IMessage, IUserChat } from "../types";

export const useChatStore = create<IChatStore>((set) => ({
  userList: [],
  setUserList: (userList: IUserChat[]) => set({ userList }),
  addMessage: (userId: number, message: IMessage) =>
    set((state) => {
      return {
        userList: state.userList.map((user) => {
          if (user.id === userId)
            return { ...user, messages: [...user.messages, message] };
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
