
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const Hero = () => {
  const handleChatClick = () => {
    toast.info("Chat feature coming soon!", { position: "bottom-right" });
  };
  return (
    <>
      <div className="hero">
        <h1>Welcome to BugBlade</h1>
        <p>
          Free tools to chat, fix bugs, and optimize your code — fast, easy, and
          developer-friendly.
        </p>
        <Link to={"/chat"} className="btn" onClick={handleChatClick}>
          Start Chat Now
        </Link>
      </div>
    </>
  );
};

export default Hero;
