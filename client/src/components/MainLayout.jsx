import { Outlet } from "react-router-dom";
import { NavBar } from "../allFileImports.js";
import "react-toastify/dist/ReactToastify.css";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-800">
      <NavBar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;

