import { createContext, useContext } from "react";
import { editorConfig } from "../data/editorConfig";
const EditorContext = createContext();
export const EditorContextProvider = ({ children }) => {
  return (
    <EditorContext.Provider value={editorConfig}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => {
  return useContext(EditorContext);
};
