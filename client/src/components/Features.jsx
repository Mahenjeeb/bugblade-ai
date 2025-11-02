import { FaComments, FaCode, FaTools } from "react-icons/fa";
const Features = () => {
  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold">Why Choose BugBlade?</h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-4 bg-white rounded-lg shadow text-center">
            <FaComments className="mx-auto text-3xl text-blue-600" />
            <h3 className="mt-3 font-medium">Instant Chat</h3>
            <p className="mt-2 text-sm text-gray-600">Get real-time help from coding experts anytime.</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow text-center">
            <FaCode className="mx-auto text-3xl text-green-600" />
            <h3 className="mt-3 font-medium">Bug Fixing</h3>
            <p className="mt-2 text-sm text-gray-600">Identify and resolve coding issues in minutes.</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow text-center">
            <FaTools className="mx-auto text-3xl text-indigo-600" />
            <h3 className="mt-3 font-medium">Code Optimization</h3>
            <p className="mt-2 text-sm text-gray-600">Boost performance and efficiency instantly.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;

