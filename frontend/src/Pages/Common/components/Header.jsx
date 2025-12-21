import { NavLink } from "react-router-dom";

function Header() {
  const linkClass = ({ isActive }) =>
    isActive
      ? "text-blue-500 font-semibold"
      : "hover:text-blue-500 transition-colors";

  return (
    <nav className="flex justify-between items-center px-8 py-1 shadow-md">
      <img src="/logo.svg" alt="Logo" className="h-20 w-auto" />

      <nav className="flex gap-6">
        <NavLink to="/" className={linkClass}>Home</NavLink>
        <NavLink to="/services" className={linkClass}>Services</NavLink>
        <NavLink to="/find-doctor" className={linkClass}>Find Doctor</NavLink>
        <NavLink to="/about" className={linkClass}>About</NavLink>
        <NavLink to="/faq" className={linkClass}>FAQ</NavLink>
        <NavLink to="/contact" className={linkClass}>Contact</NavLink>
      </nav>

      <div>
        <button className="mr-4">Login</button>
        <button className="bg-blue-500 text-white px-4 py-1 rounded">
          Sign Up
        </button>
      </div>
    </nav>
  );
}

export default Header;
