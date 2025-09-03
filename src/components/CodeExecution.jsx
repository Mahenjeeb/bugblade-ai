import { useReducer } from "react";
import {
  FaPlay,
  FaBug,
  FaDownload,
  FaCopy,
  FaCode,
  FaStar,
  FaTrash,
} from "react-icons/fa";
import apiConfig from "../apiEndpoints";

const CodeExecution = ({ codeToRun, onFixButtonClick }) => {
  const { apiRoutesURLS, POST_REQUESTINFO } = apiConfig();
  // Add null check to prevent destructuring error
  if (!codeToRun || typeof codeToRun !== "object") {
    return (
      <div className="flex flex-col h-full bg-black">
        <div className="p-3 sm:p-4 border-b border-slate-700 flex items-center justify-between bg-black">
          <span className="text-base sm:text-lg font-semibold text-white">Output</span>
        </div>
        <div className="flex-1 bg-[#1e1e1e] flex items-center justify-center p-4">
          <div className="text-center text-gray-400" style={{ fontFamily: "'Monaco', 'Menlo', 'Ubuntu Mono', monospace", fontSize: '14px', lineHeight: '1.5' }}>
            <FaCode className="text-4xl mb-4 mx-auto" />
            <p className="text-lg">Write a program and click "Run Code" to execute</p>
          </div>
        </div>
      </div>
    );
  }

  const { language, code } = codeToRun;

  const executeIntialstate = {
    output: "",
    isLoading: false,
    error: "",
  };

  const executeReducer = (state, action) => {
    switch (action.type) {
      case "SET_ERROR":
        return { ...state, error: action.payload };
      case "SET_LOADING":
        return { ...state, isLoading: action.payload };
      case "SET_OUTPUT":
        return { ...state, output: action.payload };
      default:
        return state;
    }
  };

  const [executeCurrState, dispatch] = useReducer(
    executeReducer,
    executeIntialstate
  );

  const handleCompilation = async () => {
    if (!code.trim()) {
      dispatch({
        type: "SET_ERROR",
        payload: "Please enter some code to execute",
      });
      return;
    }
    dispatch({ type: "SET_ERROR", payload: "" });
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_OUTPUT", payload: "" });
    try {
      const runCodeResp = await fetch(`${apiRoutesURLS.EXECUTE_CODE}`, {
        ...POST_REQUESTINFO,
        body: JSON.stringify({ language, code }),
      });

      if (!runCodeResp.ok) {
        dispatch({ type: "SET_ERROR", payload: `${runCodeResp.status}` });
        return;
      }

      const runCodeData = await runCodeResp.json();

      if (runCodeData.success) {
        const pistonData = runCodeData.message;
        if (pistonData.run) {
          dispatch({
            type: "SET_OUTPUT",
            payload: {
              output: pistonData.run.output || "No output",
              stderr: pistonData.run.stderr || "",
              exitCode: pistonData.run.code || 0,
            },
          });
        } else {
          dispatch({
            type: "SET_ERROR",
            payload: "No execution result received",
          });
        }
      } else {
        dispatch({
          type: "SET_ERROR",
          payload: `${runCodeData.message || "Execution failed"}`,
        });
      }
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: `Network error: ${error.message}`,
      });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-1 sm:p-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <span className="text-base sm:text-lg font-semibold text-black">Output</span>
        <div className="flex gap-2">
          <button
            className={`bg-none p-2 border-none rounded ${ !language || !code ? 'text-zinc-500' :'text-green-600'} cursor-pointer transition-all duration-200 ${ !language || !code ? '' :'hover:text-green-500'} `}
            onClick={handleCompilation}
            disabled={executeCurrState.isLoading || !language || !code}
            title="Run"
          >
            <FaPlay />
          </button>

           <button
            className={`bg-none p-2 border-none rounded ${ !language || !code ? 'text-zinc-500' :'text-red-600'} cursor-pointer transition-all duration-200 ${ !language || !code ? '' :'hover:text-red-500'}`}
            disabled={!language || !code}
            title="Clear Console"
          >
            <FaTrash/>
          </button>
          {executeCurrState.output.stderr && (
            <button
              className="bg-none p-2 border-none rounded text-purple-600 cursor-pointer transition-all duration-200 hover:text-purple-500"
              onClick={onFixButtonClick}
              disabled={executeCurrState.isLoading}
              title="AI Fix"
            >
              <FaStar />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-hidden bg-[#1e1e1e]">
        <div className="h-full overflow-y-auto">
          {executeCurrState.isLoading && (
            <div className="bg-[#1e1e1e] p-4">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-700 rounded mb-2 w-3/4"></div>
                <div className="h-4 bg-gray-700 rounded mb-2 w-1/2"></div>
                <div className="h-4 bg-gray-700 rounded mb-2 w-5/6"></div>
                <div className="h-4 bg-gray-700 rounded w-2/3"></div>
              </div>
            </div>
          )}

          {executeCurrState.output && !executeCurrState.isLoading && (
            <div className="bg-[#1e1e1e] text-white p-4" style={{ fontFamily: "'Monaco', 'Menlo', 'Ubuntu Mono', monospace", fontSize: '14px', lineHeight: '1.5' }}>
              <pre className="whitespace-pre-wrap m-0">{executeCurrState.output.output || "No output"}</pre>
            </div>
          )}

          {!executeCurrState.output && !executeCurrState.error && !executeCurrState.isLoading && (
            <div className="bg-[#1e1e1e] text-gray-400 h-full flex items-center justify-center p-4" style={{ fontFamily: "'Monaco', 'Menlo', 'Ubuntu Mono', monospace", fontSize: '14px' }}>
              <p>{!language || !code ? "Write a program to continue" : "Click \"Run Code\" to execute your program"}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeExecution;
