import { Box, Button, Input, InputAdornment } from "@mui/material";
import { useVariablesStore } from "../model/variables.store";
import React, { useEffect, useState } from "react";
import { useVariablesHook } from "../hook/variables.hook";
import { IGlobalVariables, globalVariablesKeys } from "../model/types.store";

export const GlobalVariablesComponent = () => {
  const { globalVariable, updateGlobalVariable } = useVariablesStore();
  const { getVariables, changeGlobalVariables } = useVariablesHook();
  useEffect(() => {
    getVariables();
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    changeGlobalVariables();
  };

  return (
    <Box
      p={3}
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      gap={2}
      flexDirection="column"
    >
      <Box width="840px" display="flex" flexWrap="wrap">
        {globalVariable &&
          Object.keys(globalVariablesKeys).map((key) => (
            <Input
              key={key}
              id="standard-adornment-amount"
              value={globalVariable[key as keyof typeof globalVariable]}
              onChange={(event) =>
                updateGlobalVariable(
                  key as keyof IGlobalVariables,
                  Number(event.target.value)
                )
              }
              type="number"
              sx={{ width: "33%" }}
              startAdornment={
                <InputAdornment position="start" sx={{ fontStyle: "italic" }}>
                  {globalVariablesKeys[key as keyof typeof globalVariablesKeys]}
                  :
                </InputAdornment>
              }
            />
          ))}
      </Box>
      <Box display="flex" justifyContent="start">
        <Button variant="contained" type="submit">
          Update
        </Button>
      </Box>
    </Box>
  );
};
