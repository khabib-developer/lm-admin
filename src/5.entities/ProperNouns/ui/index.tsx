import { Box, TextField } from "@mui/material";
import { useProperNounStore } from "../model/properNoun.store";
import { ProperNoun } from "./properNounItem";

export const ProperNounsList = () => {
  const { properNouns } = useProperNounStore();
  return (
    <Box flex={1} width="100%" height="">
      {properNouns.map((p) => (
        <ProperNoun item={p} key={p.id} />
      ))}
    </Box>
  );
};
