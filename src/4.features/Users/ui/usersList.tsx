import { Box } from "@mui/material";
import { UserItem, useUsersStore } from "../../../5.entities";
import { useMemo } from "react";

export const UsersList = () => {
  const { users } = useUsersStore();

  const usersList = useMemo(
    () => users.filter((user) => !user.is_staff).sort((a, b) => a.id - b.id),
    [users]
  );
  return (
    <Box flex={1} height={"calc(100vh - 235px)"} sx={{ overflowY: "auto" }}>
      {usersList.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </Box>
  );
};
