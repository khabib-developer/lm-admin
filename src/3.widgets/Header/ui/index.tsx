import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { navItems } from "../model";
import { Link } from "react-router-dom";
import { useHeaderHook } from "../hooks/header.hook";

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
              {item.name}
            </Link>
          ))}
          <Box onClick={headerHooks.logout} sx={{ cursor: "pointer" }}>
            Logout
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
