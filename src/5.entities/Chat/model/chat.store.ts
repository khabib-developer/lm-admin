import { create } from "zustand";
import { IChatStore } from "./type.store";
import { IMessage, IUserChat } from "../types";

export const useChatStore = create<IChatStore>((set) => ({
  permission: false,
  setPermission: (permission: boolean) => set({ permission }),
  userList: [],
  setUserList: (userList: IUserChat[]) => set({ userList }),

  typedMessage: "",
  setTypedMessage: (typedMessage: string) => set({ typedMessage }),

  modifyAppealStatus: (userId: number, messageId: number) =>
    set((state) => {
      return {
        userList: state.userList.map((user) => {
          if (user.id === userId)
            return {
              ...user,
              messages: user.messages.map((message) => {
                if (message.id === messageId) {
                  return {
                    ...message,
                    appeal: {
                      ...message.appeal!,
                      active: false,
                    },
                  };
                }
                return message;
              }),
            };
          return user;
        }),
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
