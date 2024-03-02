import { Box } from "@mui/material";
import { useChatStore } from "../model/chat.store";
import { UserItem } from "./userItem";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IUserChat } from "../types";

export const UserList = () => {
  const { userList } = useChatStore();

  const { search } = useLocation();

  const [users, setUsers] = useState<IUserChat[]>([]);

  useEffect(() => {
    let usersList = userList;
    if (search.trim() !== "") {
      const query = search.slice(1);
      usersList = usersList.filter(
        (user) =>
          user.first_name.includes(query) ||
          user.last_name.includes(query) ||
          user.username.includes(query)
      );
    }
    setUsers(usersList);
  }, [search, userList]);
  return (
    <Box display="flex" flexDirection="column" pt={2}>
      {users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </Box>
  );
};
