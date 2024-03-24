/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, TextField, Typography } from "@mui/material";
import { useVariablesStore } from "../model/variables.store";
import React, { useCallback, useEffect, useState } from "react";
import { useVariablesHook } from "../hook/variables.hook";
import { IGlobalVariables, globalVariablesKeys } from "../model/types.store";
import { useAppStore } from "../../../6.shared";

export const GlobalVariablesComponent = () => {
  const { errorMessages } = useAppStore();
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

  const handleChange = (key: keyof IGlobalVariables, value: string) => {
    setGbVariables({
      ...gbvariables!,
      [key]: value,
    });
  };

  const handleError = useCallback(
    (key: string) => {
      if (errorMessages && typeof errorMessages === "object") {
        return errorMessages[key];
      }
    },
    [errorMessages]
  );

  return (
    <Box
      p={3}
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      gap={2}
      flexDirection="column"
      height="calc(100vh - 145px)"
      overflow="auto"
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
                value={gbvariables[key as keyof typeof globalVariable]}
                helperText={handleError(key)}
                error={Boolean(handleError(key))}
                onChange={(event) =>
                  handleChange(
                    key as keyof IGlobalVariables,
                    event.target.value
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
