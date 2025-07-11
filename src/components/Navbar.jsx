import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="brand">R&M Wiki</Link>

        <button className="hamburger" onClick={() => setOpen((prev) => !prev)}>
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>

        <ul className={`nav-links ${open ? "open" : ""}`}>
          <li>
            <NavLink to="/characters" className={pathname === "/characters" ? "active" : ""}>Characters</NavLink>
          </li>
          <li>
            <NavLink to="/episodes" className={pathname === "/episodes" ? "active" : ""}>Episodes</NavLink>
          </li>
          <li>
            <NavLink to="/locations" className={pathname === "/locations" ? "active" : ""}>Locations</NavLink>
          </li>
        </ul>
      </div>

        <ThemeToggle />
    </nav>
  );
};

export default Navbar;
