import { FaComments, FaCode, FaTools } from "react-icons/fa";
const Features = () => {
  return (
    <div className="section">
      <h2 className="section-title">Why Choose BugBlade?</h2>
      <div className="features">
        <div className="feature">
          <FaComments className="feature-icon" />
          <h3>Instant Chat</h3>
          <p>Get real-time help from coding experts anytime.</p>
        </div>
        <div className="feature">
          <FaCode className="feature-icon" />
          <h3>Bug Fixing</h3>
          <p>Identify and resolve coding issues in minutes.</p>
        </div>
        <div className="feature">
          <FaTools className="feature-icon" />
          <h3>Code Optimization</h3>
          <p>Boost performance and efficiency instantly.</p>
        </div>
      </div>
    </div>
  );
};

export default Features;
