const Footer = () => {
  return (
    <>
      <div className="bg-slate-800 text-slate-300 text-center p-6 text-sm border-t border-slate-600">
        <p>
          © {new Date().getFullYear()} BugBlade | Your free bug-fixing companion
        </p>
      </div>
    </>
  );
};

export default Footer;
