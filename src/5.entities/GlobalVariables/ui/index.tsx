/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, TextField, Typography } from "@mui/material";
import { IMaskInput } from "react-imask";
import { useVariablesStore } from "../model/variables.store";
import React, { useCallback, useEffect, useState } from "react";
import { useVariablesHook } from "../hook/variables.hook";
import { IGlobalVariables, globalVariablesKeys } from "../model/types.store";
import { useAppStore } from "../../../6.shared";
import Input from "@mui/material/Input";
export const GlobalVariablesComponent = () => {
  const { errorMessages, setErrorMessages } = useAppStore();
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
    event.preventDefault();
    console.log(errorMessages);
    const gbVariablesKeys = Object.keys(globalVariablesKeys);
    if (
      gbVariablesKeys.find(
        (key) => typeof errorMessages === "object" && errorMessages[key]
      )
    )
      return;
    if (!gbvariables) return;
    const result = await changeGlobalVariables(gbvariables);
    if (!result) setGbVariables(globalVariable);
  };

  const handleChange = (key: keyof IGlobalVariables, value: string) => {
    if (!gbvariables) return;
    const stringValidation =
      key !== "phone_number" ? Number.isNaN(Number(value)) : false;
    const dotValidation = key !== "similar_ratio" ? value.includes(".") : false;
    const equalZeroValidation =
      key !== "mock_test_count_min" &&
      key !== "similar_distance" &&
      key !== "similar_ratio"
        ? +value === 0
        : false;
    const includesPlus = key !== "phone_number" ? value.includes("+") : false;
    if (key === "phone_number") {
      value = value
        .replaceAll("(", "")
        .replaceAll(")", "")
        .replaceAll(" ", "")
        .replace("-", "");
      if (value.length < 5) value = "+998";
    }
    if (
      stringValidation ||
      value.trim() === "" ||
      Number(value) < 0 ||
      includesPlus ||
      value.includes("-") ||
      value.includes("e") ||
      equalZeroValidation ||
      dotValidation
    ) {
      setErrorMessages({
        ...errorMessages,
        [key]: "Input recieves only positive integer",
      });
    } else {
      setErrorMessages({ ...errorMessages, [key]: undefined });
      if (
        key === "mock_test_count_max" &&
        Number(gbvariables.mock_test_count_min) >= Number(value)
      ) {
        setErrorMessages({
          ...errorMessages,
          [key]: "Mock count max cannot be higher than Mock count min",
        });
      } else if (
        key === "mock_test_count_min" &&
        Number(gbvariables.mock_test_count_max) <= Number(value)
      ) {
        setErrorMessages({
          ...errorMessages,
          [key]: "Mock count max cannot be upper than Mock count min",
        });
      } else
        setErrorMessages({
          ...errorMessages,
          [key]: undefined,
          mock_test_count_max: undefined,
          mock_test_count_min: undefined,
        });
    }

    if (key === "similar_ratio" && (Number(value) < 0 || Number(value) > 1)) {
      setErrorMessages({
        ...errorMessages,
        similar_ratio: "Similar ratio should be between 0 and 1",
      });
    }
    if (
      key !== "phone_number" &&
      !Number.isNaN(Number(value)) &&
      Number(value) !== 0
    )
      value = String(Number(value));
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
              <Typography sx={{ width: "50%", display:"flex", alignItems:"center" }}>
                {globalVariablesKeys[key as keyof typeof globalVariablesKeys]}:
              </Typography>
              {key === "phone_number" ? (
                <Input
                  value={gbvariables.phone_number}
                  onChange={(event) =>
                    handleChange(
                      key as keyof IGlobalVariables,
                      event.target.value
                    )
                  }
                  error={Boolean(handleError(key))}
                  name="textmask"
                  id="formatted-text-mask-input"
                  inputComponent={TextMaskCustom as any}
                />
              ) : (
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
              )}
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

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const TextMaskCustom = React.forwardRef<HTMLInputElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="+998 (00) 000-0000"
        definitions={{
          "#": /[1-9]/,
        }}
        inputRef={ref}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    );
  }
);
