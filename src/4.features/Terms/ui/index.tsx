import MDEditor, { selectWord } from "@uiw/react-md-editor";
// No import is required in the WebPack.
import "@uiw/react-md-editor/markdown-editor.css";
// No import is required in the WebPack.
import "@uiw/react-markdown-preview/markdown.css";
import { useTermsStore } from "../model/terms.store";
import { Button, Stack } from "@mui/material";
import { useTermsHook } from "../hooks/terms.hook";

export const TermsCRUD = () => {
  const termsStore = useTermsStore();
  const { updateTerms } = useTermsHook();

  return (
    <div data-color-mode="dark">
      <MDEditor
        height={"calc(100vh - 164.5px)"}
        value={termsStore.terms}
        onChange={(event) => termsStore.setTerms(event as string)}
      />
      <Stack direction="row" pt={1} width="100%" justifyContent="end">
        <Button onClick={updateTerms} variant="contained">
          Update
        </Button>
      </Stack>
    </div>
  );
};
