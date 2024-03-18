/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, TextField, Typography } from "@mui/material";
import { useVariablesStore } from "../model/variables.store";
import React, { useEffect, useState } from "react";
import { useVariablesHook } from "../hook/variables.hook";
import { IGlobalVariables, globalVariablesKeys } from "../model/types.store";

export const GlobalVariablesComponent = () => {
  const { globalVariable } = useVariablesStore();
  const { getVariables, changeGlobalVariables } = useVariablesHook();
  const [gbvariables, setGbVariables] = useState<null | IGlobalVariables>(null);
  useEffect(() => {
    getVariables();
  }, []);

  useEffect(() => {
    if (globalVariable) {
      setGbVariables(globalVariable);
    }
  }, [globalVariable]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    if (!gbvariables) return;
    event.preventDefault();
    const result = await changeGlobalVariables(gbvariables);
    if (!result) setGbVariables(globalVariable);
  };

  const handleChange = (key: keyof IGlobalVariables, value: number) => {
    setGbVariables({
      ...gbvariables!,
      [key]: value,
    });
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
      <Box width="840px" display="flex" flexDirection="column" gap={1}>
        {gbvariables &&
          Object.keys(globalVariablesKeys).map((key) => (
            <Box width="100%" display="flex" key={key}>
              <Typography sx={{ width: "50%" }}>
                {globalVariablesKeys[key as keyof typeof globalVariablesKeys]}:
              </Typography>
              <TextField
                sx={{ width: "50%" }}
                type="number"
                value={gbvariables[key as keyof typeof globalVariable]}
                onChange={(event) =>
                  handleChange(
                    key as keyof IGlobalVariables,
                    Number(event.target.value)
                  )
                }
              />
            </Box>
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
