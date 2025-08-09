import { useState } from "react";
import { useEditor } from "../context/EditorContext";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
const CodeEditor = () => {

  const [language, setLanguage] = useState("javascript");
  const [starterCode, setStarterCode] = useState("");

  const handleSelectChange = (event) => {
    const { value } = event;
    setLanguage(value);
    const selectedConfig = editorConfig.find(ele => ele.name === value);
    setStarterCode(selectedConfig ? selectedConfig.value : '');
  };

  const handleOnClick = () => {
    
  }
  const editorConfig = useEditor();
  return (
    <>
      <div>
        <select onChange={(e) => handleSelectChange(e.target)}>
          {editorConfig.map((editConfig) => (
            <option value={editConfig.name} key={editConfig.name}>
              {editConfig.name}
            </option>
          ))}
        </select>
        <Editor
          height="90vh"
          width="45vw"
          defaultLanguage="javascript"
          defaultValue={`// console.log("Welcome to BugBlade AI")`}
          theme="vs-dark"
          language={language}
          value={starterCode}
        />
        <button onClick={handleOnClick}>Analyze</button>
      </div>
    </>
  );
};

export default CodeEditor;
