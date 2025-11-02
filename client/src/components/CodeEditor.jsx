import { useEffect, useRef, useState, useCallback } from "react";
import { useEditor } from "../context/EditorContext";
import Editor from "@monaco-editor/react";
import { CodeExecution, LanguageSelector } from "../allFileImports.js";
import { toast } from "react-toastify";

const CodeEditor = () => {
  const editorRef = useRef(null);
  const { editorConfig, language, code, setCode, fixErrorWithAI, fixCode } =
    useEditor();
  const [isFixing, setIsFixing] = useState(false);

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
    setCode(editorConfig[0].value);
  };


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
      setIsFixing(true);
      const currentValue = editorRef.current.getValue();
      await fixErrorWithAI(currentValue, language);
      setIsFixing(false);
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
      {/* Language selector placed above the editor/output container */}
      <div className="px-8 mt-5 mb-3 flex justify-start">
        <LanguageSelector className="lg" />
      </div>

      <div className="lg:flex flex-col lg:flex-row px-8 mt-0 gap-0 w-full items-stretch hidden lg:h-[85vh]">
        <div className="lg:w-[70%] w-full">
          <div className="flex flex-col h-full border border-gray-700 rounded overflow-hidden">
              <div className="flex items-center justify-start p-4 bg-gray-900 text-white">
                <span className="font-semibold">{`main.${getFileExtension(language)}`}</span>
            </div>
            <div className="flex-1 p-4 bg-[#1e1e1e]">
              <Editor
                className="h-full w-full"
                defaultLanguage="javascript"
                defaultValue={code}
                theme="vs-dark"
                language={language}
                value={!fixCode ? code : fixCode}
                onMount={handleEditorDidMount}
                onChange={handleEditorChange}
                options={{
                  minimap: { enabled: true },
                  fontSize: 14,
                  fontFamily: "'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
                  padding: { top: 16, bottom: 16 },
                  lineNumbers: "on",
                  roundedSelection: false,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  readOnly: isFixing,
                }}
              />

              {isFixing && (
                <div className="p-2 text-sm text-yellow-300">
                  Fixing code with AI...
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="lg:w-[30%] w-full h-full">
          <div className="h-full">
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
  if (!language) return "txt";
  const lang = String(language).toLowerCase();
  const extensions = {
    javascript: "js",
    js: "js",
    python: "py",
    py: "py",
    java: "java",
    cpp: "cpp",
    c: "c",
    go: "go",
    rust: "rs",
    sqlite: "sql",
    sqlite3: "sql",
    sql: "sql",
  };
  return extensions[lang] || "txt";
};

export default CodeEditor;
