import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <nav
      className="fixed top-0 left-0 z-50 w-full"
      style={{ mixBlendMode: "difference" }}
    >
      <div className="flex items-center justify-between px-6 md:px-12 h-[80px] md:h-[100px]">
        <Link to="/" className="font-clash font-bold text-xl md:text-2xl text-foreground tracking-tight">
          SNAPEAT
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/dashboard"
            className="font-inter uppercase text-[13px] tracking-[0.15em] text-foreground/60 hover:text-foreground transition-colors"
          >
            Dashboard
          </Link>
          <Link
            to="/log"
            className="font-inter uppercase text-[13px] tracking-[0.15em] text-foreground/60 hover:text-foreground transition-colors"
          >
            Log
          </Link>
          <Link
            to="/snap"
            className="font-inter uppercase text-[13px] tracking-[0.15em] text-foreground/60 hover:text-foreground transition-colors"
          >
            Snap
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <span className="label-meta hidden md:block">3 SNAPS LEFT</span>
          {isLanding && (
            <Link
              to="/dashboard"
              className="border border-foreground/20 rounded-full px-5 py-2 font-inter text-[13px] uppercase tracking-[0.1em] text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
            >
              Start Free →
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
