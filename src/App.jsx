import CodeEditor from "./components/CodeEditor";
import MainLayout from "./components/MainLayout";
import { EditorContextProvider } from "./context/EditorContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/chat",
          element: <ChatPage />,
        },
      ],
    },
  ]);
  return (
    <>
      <EditorContextProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </EditorContextProvider>
    </>
  );
};

export default App;
