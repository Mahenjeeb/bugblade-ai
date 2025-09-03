import {
  FaComments,
  FaCode,
  FaTools,
  FaBug,
  FaGithub,
  FaUser,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const NavBar = () => {
  const handleChatClick = () => {
    toast.info("Chat feature coming soon!", { position: "bottom-right" });
  };

  return (
    <nav className="bg-white border-b border-slate-200 px-2 sm:px-3 md:px-4 lg:px-6 h-10 sm:h-12 md:h-14 lg:h-16 flex items-center justify-between shadow-sm sticky top-0 z-[100]">
      <div className="flex items-center">
        <Link to={"/"} className="flex items-center gap-1 sm:gap-2 no-underline font-bold text-base sm:text-lg md:text-xl text-slate-900">
          <FaBug className="text-blue-500 text-lg sm:text-xl md:text-2xl" />
          <span className="bg-gradient-to-br from-blue-500 to-blue-800 bg-clip-text text-transparent">BugBlade AI</span>
        </Link>
      </div>

      <div className="flex items-center">
        <div className="flex gap-2 sm:gap-4 md:gap-6">
          <Link to={"/"} className="flex items-center gap-1 sm:gap-2 px-1 sm:px-2 md:px-4 py-0.5 sm:py-1 md:py-2 rounded-md text-slate-500 no-underline font-medium text-xs sm:text-sm md:text-base transition-all duration-200 cursor-pointer hover:text-blue-500 hover:bg-slate-100">
            <FaCode />
            <span>Editor</span>
          </Link>
          <Link to={"/chat"} className="flex items-center gap-1 sm:gap-2 px-1 sm:px-2 md:px-4 py-0.5 sm:py-1 md:py-2 rounded-md text-slate-500 no-underline font-medium text-xs sm:text-sm md:text-base transition-all duration-200 cursor-pointer hover:text-blue-500 hover:bg-slate-100" onClick={handleChatClick}>
            <FaComments />
            <span>AI Chat</span>
          </Link>
          <div className="flex items-center gap-1 sm:gap-2 px-1 sm:px-2 md:px-4 py-0.5 sm:py-1 md:py-2 rounded-md text-slate-500 no-underline font-medium text-xs sm:text-sm md:text-base transition-all duration-200 cursor-pointer hover:text-blue-500 hover:bg-slate-100">
            <FaTools />
            <span>Optimize</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 sm:gap-2 px-1 sm:px-2 py-1 rounded-md text-slate-500 no-underline font-medium text-xs sm:text-sm md:text-base transition-all duration-200 cursor-pointer hover:text-blue-500 hover:bg-slate-100"
        >
          <FaGithub />
        </a>
        <button className="bg-transparent border-none p-1 sm:p-2 rounded-md text-slate-500 cursor-pointer transition-all duration-200 hover:text-blue-500 hover:bg-slate-100">
          <FaUser />
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
