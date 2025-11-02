import { FaCode, FaRocket, FaCheckCircle } from "react-icons/fa";
const HowItWorks = () => {
  return (
    <div className="section">
      <h2 className="section-title">How It Works</h2>
      <div className="steps">
        <div className="step">
          <FaRocket color="#0072ff" size={28} /> <h4>Step 1</h4>{" "}
          <p>Start a chat with our experts.</p>
        </div>
        <div className="step">
          <FaCode color="#0072ff" size={28} /> <h4>Step 2</h4>{" "}
          <p>Share your bug or code snippet.</p>
        </div>
        <div className="step">
          <FaCheckCircle color="#0072ff" size={28} /> <h4>Step 3</h4>{" "}
          <p>Get fixes and optimization tips.</p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;

