import { Box } from "@mui/material";
import { UsersNavbar, useUsersHook } from "../../../5.entities";
import {
  PaginationComponent,
  LoadingItems,
  LIMIT_ITEMS,
} from "../../../6.shared";
import { UsersList } from "./usersList";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export const UsersInformation = () => {
  const { offset } = useParams();
  const { getUsersList } = useUsersHook();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async function () {
      setLoading(!(await getUsersList((Number(offset) - 1) * LIMIT_ITEMS)));
    })();
  }, [offset]);
  const handlePaginate = (offset: number) => {};
  return (
    <Box
      display="flex"
      p={3}
      height="-webkit-fill-available"
      alignItems="center"
      flexDirection="column"
    >
      <UsersNavbar />
      <Box
        pt={3}
        position="relative"
        width="100%"
        height={"calc(100vh - 210px)"}
      >
        <LoadingItems
          wrapperheight={"calc(100vh - 210px)"}
          loading={loading}
          height={83}
        />
        <Box sx={{ opacity: Number(!loading), transition: "all 0.3s ease" }}>
          <UsersList />
        </Box>
      </Box>
      <PaginationComponent count={0} fn={handlePaginate} />
    </Box>
  );
};
