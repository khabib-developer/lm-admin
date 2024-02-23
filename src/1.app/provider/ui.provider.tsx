import { Box, ThemeProvider, createTheme } from "@mui/material";
import { blueGrey, grey, indigo, teal } from "@mui/material/colors";
import React from "react";
import { Loading, SnackbarError, SnackbarInfo } from "../../6.shared";
import { Header, Modals } from "../../3.widgets";
import { RoutersProvider } from "./router.provider";
export type TComponent = {
  children: React.ReactNode;
};

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#343434",
      paper: teal[900],
    },
    primary: { main: teal[900] },
    // secondary: { main: teal[900] },
    // info: { main: teal[800] },
  },
  typography: {
    fontFamily: [
      "Nunito",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

// eslint-disable-next-line react/display-name
export const UiProvider = ({ children }: TComponent) => {
  return (
    <ThemeProvider theme={theme}>
      <RoutersProvider>
        <Header />
        <Loading />
        <SnackbarError />
        <SnackbarInfo />
        <Box
          height="calc(100vh - 64px)"
          bgcolor="background.default"
          color="text.primary"
        >
          {children}
          <Modals />
        </Box>
      </RoutersProvider>
    </ThemeProvider>
  );
};
