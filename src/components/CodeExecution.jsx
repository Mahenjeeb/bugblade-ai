import { useReducer } from "react";
import {
  FaPlay,
  FaBug,
  FaDownload,
  FaCopy,
  FaCode,
  FaStar,
} from "react-icons/fa";
import apiConfig from "../apiEndpoints";

const CodeExecution = ({ codeToRun, onFixButtonClick }) => {
  const { apiRoutesURLS, POST_REQUESTINFO } = apiConfig();
  // Add null check to prevent destructuring error
  if (!codeToRun || typeof codeToRun !== "object") {
    return (
      <div className="execution-placeholder">
        <div className="placeholder-icon">
          <FaCode />
        </div>
        <p>Select a language to start coding</p>
      </div>
    );
  }

  const { language, code } = codeToRun;

  // Additional safety check
  if (!language || !code) {
    return (
      <div className="execution-placeholder">
        <div className="placeholder-icon">
          <FaBug />
        </div>
        <p>Invalid code configuration</p>
      </div>
    );
  }

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
    <div className="code-execution">
      <div className="execution-header">
        <h3>Output</h3>
        <div className="execution-actions">
          <button
            className="btn btn-danger run-btn"
            onClick={handleCompilation}
            disabled={executeCurrState.isLoading}
          >
            <FaPlay />
            {executeCurrState.isLoading ? "Running..." : "Run"}
          </button>

          <button className="btn btn-primary run-btn">Clear</button>
          {/* {executeCurrState.output.stderr && (
            <button
              className="btn btn-warning run-btn"
              onClick={onFixButtonClick}
              disabled={executeCurrState.isLoading}
            >
              <FaStar />
              {executeCurrState.isLoading ? "Fixing..." : "AI Fix"}
            </button>
          )} */}
        </div>
      </div>

      <div className="execution-content">
        {executeCurrState.output && (
          <div className="success-output">
            <div
              className={
                executeCurrState.output.stderr
                  ? "output-content error"
                  : "output-content success"
              }
            >
              <pre>{executeCurrState.output.output || "No output"}</pre>
            </div>
          </div>
        )}

        {!executeCurrState.output && !executeCurrState.error && (
          <div className="no-output">
            <p>Click "Run Code" to execute your program</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeExecution;
