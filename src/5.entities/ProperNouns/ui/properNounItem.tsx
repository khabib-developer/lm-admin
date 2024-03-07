import { Box, Paper, Typography } from "@mui/material";
import { IProperNoun } from "../types";
interface IComponent {
  item: IProperNoun;
}
export const ProperNoun = (props: IComponent) => {
  return (
    <Paper
      sx={{
        bgcolor: "background.default",
        p: 2,
        borderRadius: 5,
        height: "fit-content",
      }}
      elevation={1}
    >
      <Box display="flex" gap={1}>
        <Typography fontStyle="italic">Class: </Typography>
        <Typography>{props.item.sinf}</Typography>
      </Box>
      <Box display="flex" gap={1}>
        <Typography fontStyle="italic">Base: </Typography>
        <Typography>{props.item.ozagi}</Typography>
      </Box>
      <Box display="flex" gap={1}>
        <Typography fontStyle="italic">Value: </Typography>
        <Typography>{props.item.value}</Typography>
      </Box>
    </Paper>
  );
};
