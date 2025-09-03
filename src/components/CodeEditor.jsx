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
  const [isFixing, setIsFixing] = useState(false);

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
      <div className="h-[calc(100vh-5.5rem)] flex flex-col bg-white w-full overflow-hidden rounded-xl">
        <div className="flex-1 flex overflow-hidden min-h-0 w-full">
          <div className="flex-1 flex flex-col border-r border-slate-200">
            <div className="p-2 sm:p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <span className="text-base sm:text-lg font-semibold text-black">
                main.{getFileExtension(language)}
              </span>
              <div className="flex gap-1 sm:gap-2">
                <button
                  className="bg-none border-none p-1 rounded sm:p-1.5 rounded text-slate-500 cursor-pointer transition-all duration-200 hover:text-green-500 hover:bg-slate-200"
                  onClick={handleFormat}
                  title="Format"
                >
                  <FaAlignLeft />
                </button>
                <button
                  className="bg-none border-none p-1 rounded sm:p-1.5 rounded text-slate-500 cursor-pointer transition-all duration-200 hover:text-green-500 hover:bg-slate-200"
                  onClick={handleCopy}
                  title="Copy"
                >
                  <FaCopy />
                </button>
                {/* <button className="bg-none border-none p-1 rounded sm:p-1.5 rounded text-slate-500 cursor-pointer transition-all duration-200 hover:text-green-500 hover:bg-slate-200" title="Download">
                  <FaDownload />
                </button> */}
                {/* <button className="bg-none border-none p-1 rounded sm:p-1.5 rounded text-slate-500 cursor-pointer transition-all duration-200 hover:text-green-500 hover:bg-slate-200" title="Share Code">
                <FaShare/>
              </button> */}
                <button
                  className="bg-none border-none p-1 rounded sm:p-1.5 rounded text-slate-500 cursor-pointer transition-all duration-200 hover:text-green-500 hover:bg-slate-200"
                  title="Info"
                >
                  <FaInfo />
                </button>
              </div>
            </div>
            <div className="relative flex-1">
              <Editor
                height="100%"
                width="100%"
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
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                    <p>Fixing code with AI...</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="w-80 sm:w-96 md:w-100 flex flex-col bg-slate-50 min-h-0 flex-shrink-0 border-l border-slate-200">
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
