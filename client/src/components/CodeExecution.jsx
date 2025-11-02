import { useReducer } from "react";
import apiConfig from "../apiEndpoints";
import { Button } from "./ui/button";
import { Copy, Download, Play, Share, Code } from "lucide-react";
import { toast } from "react-toastify";

const CodeExecution = ({ codeToRun, onFixButtonClick }) => {
  const { apiRoutesURLS, POST_REQUESTINFO } = apiConfig();
  // Add null check to prevent destructuring error
  if (!codeToRun || typeof codeToRun !== "object") {
    return (
      <div className="flex flex-col h-full">
        <div className="p-3 border-b bg-gray-900 text-white">
          <span className="font-semibold">Output</span>
        </div>
        <div className="flex-1 bg-gray-800 flex items-center justify-center p-4">
          <div
            className="text-center text-gray-400"
            style={{
              fontFamily: "'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
              fontSize: "14px",
              lineHeight: "1.5",
            }}
          >
            <Code className="text-4xl mb-4 mx-auto" />
            <p className="text-lg">
              Write a program and click "Run Code" to execute
            </p>
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
    <div className="flex flex-col h-full border border-gray-700 rounded overflow-hidden">
      <div className="flex items-center justify-between p-3 bg-gray-900 text-white">
        <span className="font-semibold">Output</span>
        <div className="flex gap-2">
          <Button
            onClick={handleCompilation}
            disabled={executeCurrState.isLoading || !language || !code}
            className="flex items-center gap-2"
          >
            <Play className="h-4 w-4" />
            <span>Run</span>
          </Button>

          {/* <Button
            onClick={() => {
              try {
                navigator.clipboard.writeText(code);
                toast.info("Code copied to clipboard");
              } catch (err) {
                toast.error("Failed to copy code");
              }
            }}
            disabled={!code}
            className="flex items-center gap-2"
          >
            <Copy className="h-4 w-4" />
            <span>Copy</span>
          </Button> */}
        </div>
      </div>

      <div className="flex-1 overflow-hidden bg-[#1e1e1e] text-white">
        <div className="h-full overflow-y-auto p-4 font-mono text-sm leading-relaxed">
          {executeCurrState.isLoading && (
            <div className="space-y-2">
              <div className="h-4 bg-gray-700 rounded w-full" />
              <div className="h-4 bg-gray-700 rounded w-3/4" />
              <div className="h-4 bg-gray-700 rounded w-1/2" />
            </div>
          )}

          {executeCurrState.output && !executeCurrState.isLoading && (
            <pre className="whitespace-pre-wrap m-0">
              {executeCurrState.output.output || "No output"}
            </pre>
          )}

          {!executeCurrState.output &&
            !executeCurrState.error &&
            !executeCurrState.isLoading && (
              <div className="text-gray-400 h-full flex items-center justify-center">
                <p>
                  {!language || !code
                    ? "Write a program to continue"
                    : 'Click "Run Code" to execute your program'}
                </p>
              </div>
            )}

          {executeCurrState.error && (
            <div className="text-red-400 whitespace-pre-wrap">
              {executeCurrState.error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeExecution;
