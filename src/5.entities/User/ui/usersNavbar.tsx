import { Box, Grid, TextField } from "@mui/material";
import React from "react";

export const UsersNavbar = () => {
  return (
    <React.Fragment>
      <Box width="100%" display="flex" justifyContent="end" gap={5}>
        <TextField variant="standard" placeholder="Search by id" />
        <TextField variant="standard" placeholder="Search by name" />
      </Box>
      <Grid container px={3} pt={3}>
        <Grid item xs={3} container>
          <Grid item xs={6} textAlign="center">
            Name
          </Grid>
          <Grid item xs={6} textAlign="center">
            Phone number
          </Grid>
        </Grid>
        <Grid item xs={3} container>
          <Grid item xs={6} textAlign="center">
            Mock
          </Grid>
          <Grid item xs={6} textAlign="center">
            Public
          </Grid>
        </Grid>
        <Grid item xs={3} container>
          <Grid item xs={6} textAlign="center">
            Card
          </Grid>
          <Grid item xs={6} textAlign="center">
            Paid
          </Grid>
        </Grid>
        <Grid item xs={3} container>
          <Grid item xs={6} textAlign="center">
            Verified
          </Grid>
          <Grid item xs={6} textAlign="center">
            Collected
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
