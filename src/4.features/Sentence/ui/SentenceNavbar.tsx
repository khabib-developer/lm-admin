import { Grid } from "@mui/material";
import {
  CreateSentence,
  ExportSentenses,
  SearchSentence,
  SortSentences,
  UploadSentence,
} from "../../../5.entities";

export const SentenceNavbar = () => {
  return (
    <Grid container>
      <Grid container xs={3} item gap={3}>
        <Grid item>
          <UploadSentence />
        </Grid>
        <Grid item display="flex" alignItems="center" gap={4}>
          <CreateSentence />
        </Grid>
      </Grid>
      <Grid
        container
        xs={9}
        item
        gap={3}
        justifyContent={"end"}
        alignItems={"end"}
      >
        <Grid display="flex" gap={3}>
          <SearchSentence />
          <SortSentences />
          <ExportSentenses />
        </Grid>
      </Grid>
    </Grid>
  );
};
