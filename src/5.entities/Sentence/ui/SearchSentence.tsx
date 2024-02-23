import { TextField } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const SearchSentence = () => {
  const location = useLocation();

  const [value, setValue] = useState("");

  const timeId = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    setValue(location.search.slice(1));
  }, [location]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      const url = `${location.pathname}?${value}`;
      if (timeId && timeId.current) clearTimeout(timeId.current);
      setValue(value);
      if (value === "") return navigate(url);
      timeId.current = setTimeout(() => {
        navigate(url);
      }, 1000);
    },
    [timeId]
  );

  return (
    <TextField
      value={value}
      onChange={handleChange}
      variant="standard"
      placeholder="Search sentence"
    />
  );
};
