import { Outlet } from "react-router-dom";
import { NavBar, Footer, LanguageSelector } from "../allFileImports.js";
import "react-toastify/dist/ReactToastify.css";

const MainLayout = () => {
  return (
    <div className="app">
      <NavBar />
      <div className="main-container">
        <LanguageSelector />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
