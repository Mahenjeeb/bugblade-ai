import { createContext, useContext, useReducer } from "react";
import { editorConfig } from "../data/editorConfig";
const EditorContext = createContext();

const editorInitialState = {
  editorConfig,
  language: "javascript",
  starterCode: editorConfig[0].value,
  code: "",
  feedback: "",
  isLoading: false,
  error: null,
};

const editoreducer = (state, action) => {
  switch (action.type) {
    case 'SET_LANGUAGE':
      const selectedConfig = state.editorConfig.find((config) => config.name === action.payload)
      return {
        ...state,
        language: action.payload,
        starterCode: selectedConfig ? selectedConfig.value: "",
        feedback: ""
      };
    case 'SET_CODE':
      return {...state, code: action.payload}
    case 'SET_FEEDBACK':
      return {...state, feedback: action.payload}
    case 'SET_LOADING':
      return {...state, isLoading: action.payload}
    case 'SET_ERROR':
      return {...state, error: action.payload}
    case 'ANALYZE_CODE_START':
      return {...state, isLoading: true, error: null}
    case 'ANALYZE_CODE_SUCCESS':
      return {...state, isLoading: false, feedback: action.payload, error: null}
    case 'ANALYZE_CODE_ERROR':
      return {...state, isLoading: false, error: action.payload}
    default:
      return state
  }
};
export const EditorContextProvider = ({ children }) => {
  const [currentState, dispatch] = useReducer(editoreducer, editorInitialState);

  // helper function
  const setLanguage = (language) => {
    dispatch({ type: "SET_LANGUAGE", payload: language });
  };
  
  const setCode = (editorCode) => {
    dispatch({ type: "SET_CODE", payload: editorCode });
  };
  
  const analyzeCode = async (code, language, starterCode) => {
    dispatch({ type: "ANALYZE_CODE_START" });
    try {
      const prompt = `Review this ${language} code for bugs and optimizations:\n\n${code}.
      \nGive suggestion in a commented line as per ${language} format and give solution.\n
      please include ${starterCode} at first line always`;
      const response = await puter.ai.chat(prompt, { model: "gpt-5" });
      dispatch({
        type: "ANALYZE_CODE_SUCCESS",
        payload: response.message.content,
      });
    } catch (error) {
      dispatch({ type: "ANALYZE_CODE_ERROR", payload: error.message });
    }
  };
  
  const editorValue = {
    ...currentState,
    setLanguage,
    setCode,
    analyzeCode
  }
  return (
    <EditorContext.Provider value={editorValue}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => {
  const context = useContext(EditorContext);
  if(!context) {
    throw new Error('useEditor must be used within an EditorContextProvider');
  }
  return context
};
