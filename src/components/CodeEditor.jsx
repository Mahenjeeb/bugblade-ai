import { useEffect, useRef, useState } from "react";
import { useEditor } from "../context/EditorContext";
import Editor from "@monaco-editor/react";

const CodeEditor = () => {
  const editorRef = useRef(null);
  const {
    editorConfig,
    language,
    starterCode,
    code,
    setLanguage,
    setCode,
    analyzeCode,
    feedback,
    isLoading,
    error,
  } = useEditor();

  const handleSelectChange = (event) => {
    const { value } = event;
    setLanguage(value);
  };

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  const handleAnalyze = async () => {
    if (editorRef.current) {
      const currentValue = editorRef.current.getValue();
      setCode(currentValue);
      await analyzeCode(currentValue, language, starterCode);
    }
  };

  // Watch for code changes and send to API
  useEffect(() => {
    handleAnalyze();
  }, []);

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
          onMount={handleEditorDidMount}
        />
        <button onClick={handleAnalyze} disabled={isLoading}>
          {isLoading ? "Analyzing..." : "Analyze"}
        </button>

        {error && <div style={{ color: "red" }}>Error: {error}</div>}
        <Editor
          height="90vh"
          width="45vw"
          theme="vs-dark"
          language={language}
          value={feedback}
        />
      </div>
    </>
  );
};

export default CodeEditor;
