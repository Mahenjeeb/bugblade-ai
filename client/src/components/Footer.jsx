const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-gray-900 text-gray-300 text-center py-3 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm">© {new Date().getFullYear()} BugBlade | Your free bug-fixing companion</p>
      </div>
    </footer>
  );
};

export default Footer;

