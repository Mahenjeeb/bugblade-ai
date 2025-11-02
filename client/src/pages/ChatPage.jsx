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
    <div>
      <div>
        <h2>AI Chat Assistant</h2>
        <p>Get help with your code, debugging, and programming questions</p>
      </div>

      <div>
        <div>
          {messages.map((message) => (
            <div key={message.id}>
              <div>
                {message.type === "ai" ? <FaRobot /> : <FaUser />}
              </div>
              <div>
                <div>{message.content}</div>
                <div>{message.timestamp}</div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div>
              <div>
                <FaRobot />
              </div>
              <div>
                <div>
                  <span></span>
                  <span style={{ animationDelay: '0.2s' }}></span>
                  <span style={{ animationDelay: '0.4s' }}></span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          <div>
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about programming..."
              rows={1}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
            >
              <FaPaperPlane />
            </button>
          </div>
          <div>
            Press Enter to send, Shift+Enter for new line
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;

