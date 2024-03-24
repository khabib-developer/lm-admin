import { Box, Tooltip, Zoom } from "@mui/material";
import { formatCardNumber, useAppStore } from "../../../6.shared";
import { useMemo } from "react";

interface IProps {
  card: string | null;
}

export const CardNumber = (props: IProps) => {
  const { setInfo } = useAppStore();
  const cardNumber = useMemo(
    () => (props.card ? formatCardNumber(props.card) : "0000 0000 0000 0000"),
    [props.card]
  );
  const copy = () => {
    navigator.clipboard.writeText(cardNumber);
    setInfo("Copied to clipboard");
  };
  return (
    <Tooltip
      TransitionComponent={Zoom}
      title="Click to copy"
      followCursor
      leaveDelay={200}
      placement="top"
    >
      <Box
        sx={{
          bgcolor: "black",
          width: "fit-content",
          p: 1,
          borderRadius: 2,
          cursor: "pointer",
          fontSize: "small",
        }}
        onClick={copy}
      >
        {cardNumber}
      </Box>
    </Tooltip>
  );
};
