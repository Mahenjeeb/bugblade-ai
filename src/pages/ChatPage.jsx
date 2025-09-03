import { useState } from "react";
import { FaPaperPlane, FaRobot, FaUser } from "react-icons/fa";

const ChatPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      content: "Hello! I'm BugBlade AI. How can I help you with your code today?",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: "user",
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        id: messages.length + 2,
        type: "ai",
        content: "I understand your question. Let me help you with that. This is a placeholder response - the actual AI integration will be implemented soon!",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="p-6 border-b border-slate-200 bg-slate-50">
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">AI Chat Assistant</h2>
        <p className="text-slate-500 text-sm">Get help with your code, debugging, and programming questions</p>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-5">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 items-start ${message.type === "user" ? "flex-row-reverse" : ""}`}
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-lg flex-shrink-0 ${message.type === "ai" ? "bg-blue-500 text-white" : "bg-emerald-500 text-white"}`}>
                {message.type === "ai" ? <FaRobot /> : <FaUser />}
              </div>
              <div className={`max-w-[70%] ${message.type === "user" ? "text-right" : ""}`}>
                <div className={`p-3 rounded-2xl text-sm leading-relaxed break-words ${message.type === "ai" ? "bg-slate-100 text-slate-800" : "bg-blue-500 text-white"}`}>{message.content}</div>
                <div className="text-xs text-slate-400 mt-1 px-4">{message.timestamp}</div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 items-start">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-lg flex-shrink-0 bg-blue-500 text-white">
                <FaRobot />
              </div>
              <div className="max-w-[70%]">
                <div className="flex gap-1 p-3">
                  <span className="w-2 h-2 rounded-full bg-slate-300 animate-pulse"></span>
                  <span className="w-2 h-2 rounded-full bg-slate-300 animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                  <span className="w-2 h-2 rounded-full bg-slate-300 animate-pulse" style={{ animationDelay: '0.4s' }}></span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-slate-200 bg-white">
          <div className="flex gap-3 items-end bg-slate-50 border border-slate-200 rounded-xl p-2">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about programming..."
              rows={1}
              className="flex-1 border-none bg-transparent resize-none p-2 text-sm leading-relaxed text-slate-800 font-inherit outline-none min-h-[20px] max-h-[120px] placeholder:text-slate-400"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="bg-blue-500 text-white border-none p-2 rounded-lg cursor-pointer transition-all duration-200 flex items-center justify-center hover:bg-blue-600 disabled:bg-slate-400 disabled:cursor-not-allowed"
            >
              <FaPaperPlane />
            </button>
          </div>
          <div className="mt-2 text-xs text-slate-400 text-center">
            Press Enter to send, Shift+Enter for new line
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
