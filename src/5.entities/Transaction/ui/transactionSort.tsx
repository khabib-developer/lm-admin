import { Button } from "@mui/material";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import React from "react";
import { sortKeys, typeOfSortKeys } from "../types";

interface ISortComponent {
  setSortKey: React.Dispatch<React.SetStateAction<typeOfSortKeys>>;
  sortKey: typeOfSortKeys;
  asc: boolean;
  setAsc: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SortByAmount = (props: ISortComponent) => {
  const current = props.sortKey === sortKeys.amount;

  const handleClick = () => {
    if (current) props.setAsc((prev) => !prev);
    props.setSortKey(sortKeys.amount);
  };
  return (
    <Button
      variant={current ? "contained" : "outlined"}
      sx={{ color: "whitesmoke" }}
      onClick={handleClick}
      startIcon={
        props.asc ? (
          <NorthIcon
            sx={{ fontSize: "12px" }}
            color={current ? "action" : "disabled"}
          />
        ) : (
          <SouthIcon
            sx={{ fontSize: "12px" }}
            color={current ? "action" : "disabled"}
          />
        )
      }
    >
      Amount
    </Button>
  );
};

export const SortByCreatedAt = (props: ISortComponent) => {
  const current = props.sortKey === sortKeys.created_at;
  const handleClick = () => {
    if (current) props.setAsc((prev) => !prev);
    props.setSortKey(sortKeys.created_at);
  };
  return (
    <Button
      variant={current ? "contained" : "outlined"}
      sx={{ color: "whitesmoke" }}
      onClick={handleClick}
      startIcon={
        props.asc ? (
          <NorthIcon
            sx={{ fontSize: "12px" }}
            color={current ? "action" : "disabled"}
          />
        ) : (
          <SouthIcon
            sx={{ fontSize: "12px" }}
            color={current ? "action" : "disabled"}
          />
        )
      }
    >
      Created
    </Button>
  );
};
