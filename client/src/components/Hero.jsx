import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const Hero = () => {
  const handleChatClick = () => {
    toast.info("Chat feature coming soon!", { position: "bottom-right" });
  };
  return (
    <>
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg p-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold">Welcome to BugBlade</h1>
        <p className="mt-3 text-lg sm:text-xl max-w-2xl mx-auto">Free tools to chat, fix bugs, and optimize your code — fast, easy, and developer-friendly.</p>
        <Link to={"/chat"} onClick={handleChatClick} className="inline-block mt-6 bg-white text-blue-600 px-4 py-2 rounded-md font-medium">Start Chat Now</Link>
      </div>
    </>
  );
};

export default Hero;

