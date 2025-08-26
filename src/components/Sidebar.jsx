import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaCode,
  FaPlay,
  FaBook,
  FaLightbulb,
  FaCog,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";
import { useEditor } from "../context/EditorContext";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeSection, setActiveSection] = useState("editor");
  const location = useLocation();
  const { language, setLanguage, editorConfig } = useEditor();

  const navigationItems = [
    {
      id: "editor",
      label: "Code Editor",
      icon: <FaCode />,
      path: "/",
    },
    {
      id: "chat",
      label: "AI Chat",
      icon: <FaLightbulb />,
      path: "/chat",
    },
    {
      id: "examples",
      label: "Code Examples",
      icon: <FaBook />,
      path: "/examples",
    },
    {
      id: "settings",
      label: "Settings",
      icon: <FaCog />,
      path: "/settings",
    },
  ];

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}>
      <div className="sidebar-header">
        <h3>BugBlade AI</h3>
        <button
          className="toggle-btn"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
        </button>
      </div>

      <div className="sidebar-content">
        <div className="sidebar-section">
          <h4>Navigation</h4>
          <nav className="sidebar-nav">
            {navigationItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`nav-item ${
                  location.pathname === item.path ? "active" : ""
                }`}
                onClick={() => setActiveSection(item.id)}
              >
                <span className="nav-icon">{item.icon}</span>
                {isExpanded && <span className="nav-label">{item.label}</span>}
              </Link>
            ))}
          </nav>
        </div>

        {isExpanded && (
          <div className="sidebar-section">
            <h4>Language</h4>
            <select
              className="language-select"
              value={language}
              onChange={handleLanguageChange}
            >
              {editorConfig.map((config) => (
                <option key={config.name} value={config.name}>
                  {config.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="sidebar-section">
          <h4>Quick Actions</h4>
          <div className="quick-actions">
            <button className="action-btn">
              <FaPlay />
              {isExpanded && <span>Run Code</span>}
            </button>
            <button className="action-btn">
              <FaCode />
              {isExpanded && <span>Format Code</span>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
