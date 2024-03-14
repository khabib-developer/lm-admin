import { forwardRef, useEffect, useMemo, useState } from "react";
import { useUsersStore } from "../../../5.entities/User/model/users.store";
import { TransitionProps } from "@mui/material/transitions";
import {
  AppBar,
  Box,
  Container,
  Dialog,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

import { useUsersHook } from "../../../5.entities/User/hooks/users.hook";
import { IUserItem } from "../../../5.entities/User/types";
import { UserInfo } from "../../../5.entities/User/ui/userInfo";
import { TransactionHistory } from "./transactionHistory";
import { LoadingUserInfo } from "../../../6.shared";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const UserModalItem = () => {
  const { userId, setUserId } = useUsersStore();
  const { getUserById } = useUsersHook();
  const [user, setUser] = useState<IUserItem | null>(null);

  const handleClose = () => {
    setUserId(null);
    setUser(null);
  };

  useEffect(() => {
    if (userId) {
      getUserById().then((res) => setUser(res));
    }
  }, [userId]);

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={Boolean(userId)}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", bgcolor: "background.default" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Detailed Information
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            bgcolor: "background.default",
            height: "-webkit-fill-available",
          }}
          p={3}
        >
          <Container sx={{ position: "relative", px: 0 }}>
            {user && (
              <>
                <UserInfo user={user} setUser={setUser} />
                <TransactionHistory transactions={user.transaction} />
              </>
            )}

            <LoadingUserInfo loading={!Boolean(user)} />
          </Container>
        </Box>
      </Dialog>
    </React.Fragment>
  );
};
