import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/RiduxToolkit/Slices/authSlice";

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, email, role } = useSelector((state) => state.auth);

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-blue-500 font-semibold"
      : "hover:text-blue-500 transition-colors";

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setIsMobileMenuOpen(false);
  };

  const handleLogin = () => {
    navigate("/login");
    setIsMobileMenuOpen(false);
  };

  const handleSignUp = () => {
    navigate("/register");
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="relative flex justify-between items-center px-4 md:px-8 py-1 shadow-md bg-white">
      {/* Logo */}
      <NavLink to="/" className="flex-shrink-0">
        <img src="/logo.svg" alt="Logo" className="h-16 md:h-20 w-auto" />
      </NavLink>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex gap-6">
        <NavLink to="/" className={linkClass}>Home</NavLink>
        <NavLink to="/services" className={linkClass}>Services</NavLink>
        <NavLink to="/find-doctor" className={linkClass}>Find Doctor</NavLink>
        <NavLink to="/about" className={linkClass}>About</NavLink>
        <NavLink to="/faq" className={linkClass}>FAQ</NavLink>
        <NavLink to="/contact" className={linkClass}>Contact</NavLink>
      </nav>

      {/* Desktop Auth Buttons */}
      <div className="hidden lg:flex items-center gap-3">
        {isAuthenticated ? (
          <>
            <div className="text-sm text-gray-600 hidden xl:block">
              <span className="font-semibold">{email}</span>
              {role && (
                <span className="ml-2 text-xs text-gray-500">({role})</span>
              )}
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleLogin}
              className="text-blue-500 hover:text-blue-600 transition-colors"
            >
              Login
            </button>
            <button
              onClick={handleSignUp}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Sign Up
            </button>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden p-2 text-gray-600 hover:text-blue-500 focus:outline-none"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isMobileMenuOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t z-50 lg:hidden">
          <nav className="flex flex-col px-4 py-4 space-y-3">
            <NavLink
              to="/"
              className={linkClass}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/services"
              className={linkClass}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </NavLink>
            <NavLink
              to="/find-doctor"
              className={linkClass}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Find Doctor
            </NavLink>
            <NavLink
              to="/about"
              className={linkClass}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </NavLink>
            <NavLink
              to="/faq"
              className={linkClass}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              FAQ
            </NavLink>
            <NavLink
              to="/contact"
              className={linkClass}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </NavLink>

            <div className="pt-3 border-t border-gray-200 space-y-2">
              {isAuthenticated ? (
                <>
                  <div className="text-sm text-gray-600 px-2">
                    <div className="font-semibold">{email}</div>
                    {role && (
                      <div className="text-xs text-gray-500">Role: {role}</div>
                    )}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors text-center"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleLogin}
                    className="w-full text-blue-500 hover:text-blue-600 transition-colors text-center py-2"
                  >
                    Login
                  </button>
                  <button
                    onClick={handleSignUp}
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors text-center"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </nav>
  );
}

export default Header;
