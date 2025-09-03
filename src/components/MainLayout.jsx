import { Outlet } from "react-router-dom";
import { NavBar, Footer, LanguageSelector } from "../allFileImports.js";
import "react-toastify/dist/ReactToastify.css";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex flex-col flex-1 h-[calc(100vh-3.5rem)] p-2 sm:p-3 md:p-4 max-w-full lg:max-w-[1400px] bg-slate-100 sticky">
        <LanguageSelector />
        <main className="flex-1 overflow-hidden bg-white rounded-xl shadow-md">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
