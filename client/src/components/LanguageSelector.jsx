import { useState, useEffect } from "react";
import { useEditor } from "../context/EditorContext";
import { DiPython, DiJava, DiGo, DiRust, DiJsBadge, DiSqllite } from "react-icons/di";
import { SiCplusplus, SiC } from "react-icons/si";
import { Button } from "./ui/button";

// A simple shadcn-style modal (tailwind) for selecting language.
const LanguageSelector = () => {
  const { editorConfig, setLanguage } = useEditor();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(
    editorConfig[0]?.name || "JavaScript"
  );

  const languageIcons = {
    JavaScript: <DiJsBadge />,
    Python: <DiPython />,
    Java: <DiJava />,
    Rust: <DiRust />,
    Go: <DiGo />,
    C: <SiC />,
    CPP: <SiCplusplus />,
    Sqlite: <DiSqllite />,
  };

  const handleSelect = (languageName) => {
    setSelectedLanguage(languageName);
    setLanguage(languageName);
    setIsOpen(false);
  };

  useEffect(() => {
    // Keep local selectedLanguage in sync if editorConfig changes
    if (editorConfig && editorConfig.length > 0) {
      setSelectedLanguage((prev) => prev || editorConfig[0].name);
    }
  }, [editorConfig]);

  return (
    <div className="hidden lg:block">
      <Button onClick={() => setIsOpen(true)} className="px-2 py-1">
        <span className="text-sm">{selectedLanguage}</span>
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
          {/* backdrop */}
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setIsOpen(false)}
          />

          {/* modal */}
          <div className="relative z-50 w-[min(95%,420px)] bg-zinc-800 text-white rounded-md">
            <div className="flex items-center justify-between p-3">
              <div>
                <h3 className="text-sm font-semibold">Select Language</h3>
                <p className="text-xs text-gray-300">Choose the language for the editor</p>
              </div>
              <div>
                <Button onClick={() => setIsOpen(false)} className="px-2 py-1">Close</Button>
              </div>
            </div>

            <div className="p-3 space-y-2">
              {editorConfig.map((lang) => (
                <button
                  key={lang.name}
                  onClick={() => handleSelect(lang.name)}
                  className={`w-full text-left px-3 py-2 rounded-md hover:bg-zinc-700 flex items-center gap-3 ${selectedLanguage === lang.name ? 'bg-zinc-700' : ''}`}
                >
                  <span className="text-lg">{languageIcons[lang.name]}</span>
                  <span className="font-medium">{lang.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;

