import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { navItems } from "../model";
import { Link } from "react-router-dom";
import { useHeaderHook } from "../hooks/header.hook";
import { Notification } from "../../Notification";
import LogoutIcon from "@mui/icons-material/Logout";
export const Header = () => {
  const headerHooks = useHeaderHook();
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
              style={headerHooks.currentLocation(item.url)}
            >
              <Badge color="error" badgeContent={0}>
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
