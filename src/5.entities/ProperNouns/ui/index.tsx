import { Box } from "@mui/material";
import { useProperNounStore } from "../model/properNoun.store";
import { ProperNoun } from "./properNounItem";

export const ProperNounsList = () => {
  const { properNouns } = useProperNounStore();
  return (
    <Box height="calc(100vh - 208px)" flex={1} sx={{ overflowY: "scroll" }}>
      <Box width="100%" display="flex" flexWrap="wrap" gap={1}>
        {properNouns.map((p) => (
          <ProperNoun item={p} key={p.id} />
        ))}
      </Box>
    </Box>
  );
};
