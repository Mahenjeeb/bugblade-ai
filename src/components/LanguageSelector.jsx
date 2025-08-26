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
    <div className="relative inline-block mb-4" ref={dropdownRef}>
      {/* Trigger */}
      <div
        className="flex items-center justify-between w-[180px] px-3 py-2 bg-white rounded shadow-md cursor-pointer hover:bg-gray-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex items-center gap-2">
          {languageIcons[selectedLanguage]}
          <span className="text-sm font-medium">{selectedLanguage}</span>
        </span>
        <FaChevronDown
          className={`ml-2 w-3 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute mt-2 w-[180px] rounded-md shadow-md bg-white ring-1 ring-black ring-opacity-5 z-10">
          {editorConfig.map((lang) => (
            <div
              key={lang.name}
              className={`flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                selectedLanguage === lang.name ? "bg-gray-200 font-semibold" : ""
              }`}
              onClick={() => handleSelect(lang.name)}
            >
              {languageIcons[lang.name]}
              <span className="text-sm">{lang.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
