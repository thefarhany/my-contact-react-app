import { Contact } from "lucide-react";
import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="py-4">
      <div className="container">
        <div className="flex items-center justify-between">
          <NavLink
            to="/"
            className="flex items-center gap-3 text-xl font-semibold"
          >
            <Contact size={35} />
            MyContacts
          </NavLink>
          <div className="flex gap-3">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-gray-200 text-gray-700 border-gray-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/add-contact"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-gray-100 text-gray-700 border-gray-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`
              }
            >
              Add Contact
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
