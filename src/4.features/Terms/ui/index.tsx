import MDEditor, { selectWord } from "@uiw/react-md-editor";
// No import is required in the WebPack.
import "@uiw/react-md-editor/markdown-editor.css";
// No import is required in the WebPack.
import "@uiw/react-markdown-preview/markdown.css";
import { useTermsStore } from "../model/terms.store";
import { useState } from "react";

export const TermsCRUD = () => {
  const termsStore = useTermsStore();
  const [value, setValue] = useState<string>(termsStore.terms);
  return (
    <div data-color-mode="dark">
      <MDEditor height={500} value={value} onChange={setValue as any} />
    </div>
  );
};
