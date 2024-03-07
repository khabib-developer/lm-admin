/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from "@mui/material";
import { UsersNavbar, useUsersHook } from "../../../5.entities";
import {
  PaginationComponent,
  LoadingItems,
  LIMIT_ITEMS,
  UsersRoutes,
} from "../../../6.shared";
import { UsersList } from "./usersList";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export const UsersInformation = () => {
  const { offset } = useParams();
  const { getUsersList, count } = useUsersHook();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    (async function () {
      setLoading(true);
      setLoading(
        !(await getUsersList((Number(offset) - 1) * LIMIT_ITEMS, search))
      );
    })();
  }, [offset, search]);
  const handlePaginate = (offset: number) =>
    navigate(UsersRoutes.main.replace(":offset", String(offset)));
  return (
    <Box
      display="flex"
      p={3}
      height="-webkit-fill-available"
      alignItems="center"
      mb={1}
      flexDirection="column"
    >
      <UsersNavbar search={search} setSearch={setSearch} />
      <Box
        pt={3}
        position="relative"
        width="100%"
        height={"calc(100vh - 210px)"}
      >
        <LoadingItems
          wrapperheight={"calc(100vh - 235px)"}
          loading={loading}
          height={83}
        />
        <Box sx={{ opacity: Number(!loading), transition: "all 0.3s ease" }}>
          <UsersList />
        </Box>
      </Box>
      <PaginationComponent
        count={Math.ceil(count / LIMIT_ITEMS) || 0}
        fn={handlePaginate}
      />
    </Box>
  );
};
