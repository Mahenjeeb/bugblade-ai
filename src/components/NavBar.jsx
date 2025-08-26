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
    <nav className="navbar">
      <div className="nav-left">
        <Link to={"/"} className="nav-logo">
          <FaBug className="logo-icon" />
          <span className="logo-text">BugBlade AI</span>
        </Link>
      </div>

      <div className="nav-center">
        <div className="nav-links">
          <Link to={"/"} className="nav-link">
            <FaCode />
            <span>Editor</span>
          </Link>
          <Link to={"/chat"} className="nav-link" onClick={handleChatClick}>
            <FaComments />
            <span>AI Chat</span>
          </Link>
          <div className="nav-link">
            <FaTools />
            <span>Optimize</span>
          </div>
        </div>
      </div>

      <div className="nav-right">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link external"
        >
          <FaGithub />
        </a>
        <button className="user-menu">
          <FaUser />
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
