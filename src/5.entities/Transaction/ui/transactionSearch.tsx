import { TextField } from "@mui/material";
import React, { useState } from "react";

interface ITransactionSearch {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export const TransactionSearch = (props: ITransactionSearch) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setValue(event.target.value);
  };
  return (
    <TextField
      sx={{ width: 120 }}
      variant="standard"
      value={props.value}
      onChange={handleChange}
      placeholder="Search by id"
    />
  );
};
