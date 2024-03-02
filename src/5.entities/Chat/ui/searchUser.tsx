import { Box, TextField } from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const SearchUser = () => {
  const [value, setValue] = useState("");

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const hanldeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const v = event.target.value;
    setValue(v);
    let url = pathname;
    if (v.trim() !== "") url = `${pathname}?${v}`;
    navigate(url);
  };
  return (
    <Box pb={1} pt={2} px={4}>
      <TextField
        value={value}
        onChange={hanldeChange}
        sx={{ width: "100%" }}
        variant="standard"
        placeholder="Search User"
      />
    </Box>
  );
};
