import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { navItems } from "../model";
import { Link } from "react-router-dom";
import { useHeaderHook } from "../hooks/header.hook";
import { Notification } from "../../Notification";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAppStore } from "../../../6.shared";
export const Header = () => {
  const headerHooks = useHeaderHook();
  const { notifications } = useAppStore();
  return (
    <AppBar position="relative" sx={{ background: "background.paper" }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
        >
          Admin Panel
        </Typography>
        <Box display="flex" gap={3} alignItems="center">
          {navItems.map((item) => (
            <Link
              key={item.url}
              to={item.url}
              style={headerHooks.currentLocation(item.url.slice(0, 15))}
            >
              <Badge
                color="error"
                badgeContent={
                  item.notification
                    ? notifications.filter((notification) =>
                        item.notification.includes(notification.type)
                      ).length
                    : 0
                }
              >
                {item.name}
              </Badge>
            </Link>
          ))}
          <Box
            display="flex"
            gap={1}
            alignItems="center"
            sx={{ cursor: "pointer" }}
          >
            <Notification />
            <IconButton onClick={headerHooks.logout}>
              <LogoutIcon />
            </IconButton>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
