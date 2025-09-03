import { useState, useRef, useEffect } from "react";
import { useEditor } from "../context/EditorContext";
import { DiPython, DiJava, DiGo, DiRust, DiJsBadge, DiSqllite } from "react-icons/di";
import { SiCplusplus, SiC } from "react-icons/si";
import { FaChevronDown } from "react-icons/fa6";

const LanguageSelector = () => {
  const { editorConfig, setLanguage } = useEditor();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(
    editorConfig[0]?.name || "JavaScript"
  );
  const dropdownRef = useRef(null);

  const iconSize = "w-5 h-5"; // consistent size

  const languageIcons = {
    JavaScript: <DiJsBadge className={`${iconSize} text-yellow-400`} />,
    Python: <DiPython className={`${iconSize} text-blue-600`} />,
    Java: <DiJava className={`${iconSize} text-blue-700`} />,
    Rust: <DiRust className={`${iconSize} text-black`} />,
    Go: <DiGo className={`${iconSize} text-cyan-500`} />,
    C: <SiC className={`${iconSize} text-green-600`} />,
    CPP: <SiCplusplus className={`${iconSize} text-blue-600`} />,
    Sqlite: <DiSqllite className={`${iconSize} text-blue-800`} />,
  };

  const handleSelect = (languageName) => {
    setSelectedLanguage(languageName);
    setLanguage(languageName);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block min-w-max w-[180px] sm:w-[220px] md:w-[260px] pb-2.5 z-[1000] mb-4" ref={dropdownRef}>
      {/* Trigger */}
      <div
        className="flex items-center justify-between w-full px-4 py-3 bg-slate-100 border-2 border-slate-400 rounded-xl cursor-pointer transition-all duration-300 shadow-md hover:border-blue-400 hover:shadow-lg hover:-translate-y-0.5 user-select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex items-center gap-3">
          {languageIcons[selectedLanguage]}
          <span className="text-sm font-medium text-slate-900 flex-1">{selectedLanguage}</span>
        </span>
        <FaChevronDown
          className={`text-xs text-slate-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-slate-100 rounded-xl mt-2 shadow-xl overflow-hidden z-[1001] max-h-80 overflow-y-auto">
          {editorConfig.map((lang) => (
            <div
              key={lang.name}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-all duration-200 border-b border-slate-200 last:border-b-0 hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-500 hover:text-white ${
                selectedLanguage === lang.name ? "bg-blue-50 text-blue-500" : ""
              }`}
              onClick={() => handleSelect(lang.name)}
            >
              {languageIcons[lang.name]}
              <span className="text-sm font-medium">{lang.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
