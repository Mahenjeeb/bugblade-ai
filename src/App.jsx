import CodeEditor from "./components/CodeEditor";
import { EditorContextProvider } from "./context/EditorContext";
const App = () => {
  return (
    <EditorContextProvider>
      <CodeEditor />
    </EditorContextProvider>
  );
};

export default App;
