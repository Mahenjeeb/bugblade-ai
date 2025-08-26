import { useEffect, useRef, useState, useCallback } from "react";
import { useEditor } from "../context/EditorContext";
import Editor from "@monaco-editor/react";
import { CodeExecution } from "../allFileImports.js";
import {
  FaDownload,
  FaShare,
  FaAlignLeft,
  FaArrowRotateLeft,
  FaCopy,
  FaInfo,
} from "react-icons/fa6";
import { toast } from "react-toastify";

const CodeEditor = () => {
  const editorRef = useRef(null);
  const { editorConfig, language, code, setCode, fixErrorWithAI, fixCode } =
    useEditor();

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
    setCode(editorConfig[0].value);
  };

  // Debounced function to update codeToRun
  const debouncedUpdateCodeToRun = useCallback(
    (() => {
      let timeoutId;
      return (value) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          setCode(value);
        }, 500); // 500ms delay
      };
    })(),
    [language]
  );

  // Handle code changes in the editor
  const handleEditorChange = (value) => {
    if (value !== undefined) {
      debouncedUpdateCodeToRun(value);
    }
  };

  const onFixButtonClick = async () => {
    if (editorRef.current) {
      const currentValue = editorRef.current.getValue();
      await fixErrorWithAI(currentValue, language);
    }
  };

  // Update codeToRun when language changes
  useEffect(() => {
    console.log("Language Chnaged", language, code);
  }, [language, code]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast.info("copied");
  };
  const handleFormat = () => {
    if (editorRef.current) {
      editorRef.current.getAction("editor.action.formatDocument").run();
    }
  };

  return (
    <>
      <div className="code-editor-container">
        <div className="editor-content">
          <div className="editor-pane">
            <div className="editor-toolbar">
              <span className="file-name">
                main.{getFileExtension(language)}
              </span>
              <div className="toolbar-actions">
                <button
                  className="toolbar-btn"
                  onClick={handleFormat}
                  title="Format"
                >
                  <FaAlignLeft />
                </button>
                <button
                  className="toolbar-btn"
                  onClick={handleCopy}
                  title="Copy"
                >
                  <FaCopy />
                </button>
                {/* <button className="toolbar-btn" title="Download">
                  <FaDownload />
                </button> */}
                {/* <button className="toolbar-btn" title="Share Code">
                <FaShare/>
              </button> */}
                <button
                  className="toolbar-btn"
                  title="Info"
                >
                  <FaInfo />
                </button>
              </div>
            </div>
            <Editor
              height="100vh"
              width="100%"
              defaultLanguage="javascript"
              defaultValue={code}
              theme="vs-dark"
              language={language}
              value={code}
              onMount={handleEditorDidMount}
              onChange={handleEditorChange}
              options={{
                minimap: { enabled: true },
                fontSize: 14,
                lineNumbers: "on",
                roundedSelection: false,
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
            />
          </div>

          <div className="output-pane">
            <CodeExecution
              codeToRun={{ language, code }}
              onFixButtonClick={onFixButtonClick}
            />
          </div>
        </div>
      </div>
    </>
  );
};

// Helper function to get file extension
const getFileExtension = (language) => {
  const extensions = {
    javascript: "js",
    python: "py",
    java: "java",
    cpp: "cpp",
    c: "c",
    go: "go",
    rust: "rs",
    sqlite3: "sql",
  };
  return extensions[language] || "txt";
};

export default CodeEditor;
