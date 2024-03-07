import { Box, Button, Paper, Typography } from "@mui/material";
import { IMessage } from "../../Chat";
import { useAppStore } from "../../../6.shared";
import dateformat from "dateformat";
import { useSentenceHook } from "../../Sentence";
import CheckIcon from "@mui/icons-material/Check";
import { useEffect } from "react";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useAppealHook } from "../hook/appeal.hook";
export interface IProps {
  appeal: IMessage;
  sendMessage(msg: any, type: string): void;
}

export const AppealItem = (props: IProps) => {
  const { user } = useAppStore();
  const { VisualizeErrors } = useSentenceHook();

  const { handleReset, verified, penalty, handleClick, handleSubmit } =
    useAppealHook(props);

  useEffect(() => {
    handleReset();
  }, [handleReset]);

  return (
    <Box
      display="flex"
      alignItems={props.appeal.sender === user?.id ? "end" : "start"}
      width="100%"
      flexDirection="column"
    >
      <Paper
        sx={{
          bgcolor: "background.default",
          px: 2,
          maxWidth: "50%",
          py: 1,
          borderRadius: 3,
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <div
          dangerouslySetInnerHTML={{
            __html: VisualizeErrors(
              `${
                props.appeal.appeal
                  ? `Appeal Id: ${props.appeal.appeal.id}  <br><br>`
                  : ""
              }${props.appeal.message}`
            ),
          }}
        />
        <Typography variant="caption" fontSize="8px" color="GrayText">
          {dateformat(props.appeal.timestamp, "hh:mm")}
        </Typography>
      </Paper>
      {props.appeal.appeal && (
        <Box pt={1} display="flex" width="50%" gap={1} px={2}>
          <Button
            sx={{ flex: 1 }}
            onClick={() => handleClick(false)}
            variant="contained"
            color="error"
            disabled={!props.appeal.appeal.active}
          >
            Penalty: {penalty}
          </Button>
          <Button
            sx={{ flex: 1 }}
            onClick={() => handleClick(true)}
            variant="contained"
            color="warning"
            disabled={!props.appeal.appeal.active}
          >
            Verified: {verified}
          </Button>
          <Button
            onClick={handleSubmit}
            sx={{ flex: 1 }}
            variant="contained"
            color="success"
            disabled={!props.appeal.appeal.active}
          >
            <CheckIcon />
          </Button>
          <Button
            onClick={handleReset}
            sx={{ flex: 1 }}
            variant="contained"
            color="inherit"
            disabled={!props.appeal.appeal.active}
          >
            <RestartAltIcon />
          </Button>
        </Box>
      )}
    </Box>
  );
};
