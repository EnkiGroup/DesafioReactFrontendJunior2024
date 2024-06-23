import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Footer.css";

interface FooterProps {
  contaItem: number;
  clearCompleted: () => void;
}

const Footer: React.FC<FooterProps> = ({ contaItem, clearCompleted }) => {
  const location = useLocation();

  return (
    <footer className="footer-container">
      <div>
        <span>
          {contaItem} {contaItem === 1 ? "item" : "items"} left!
        </span>
      </div>
      <div className="footer-links">
        <Link
          to={"/"}
          className={`link-style ${
            location.pathname === "/" ? "active-link" : ""
          }`}
        >
          All
        </Link>
        <Link
          to={"/active"}
          className={`link-style ${
            location.pathname === "/active" ? "active-link" : ""
          }`}
        >
          Active
        </Link>
        <Link
          to={"/completed"}
          className={`link-style ${
            location.pathname === "/completed" ? "active-link" : ""
          }`}
        >
          Completed
        </Link>
      </div>
      <div>
        <button className="clear-completed-btn" onClick={clearCompleted}>
          Clear completed
        </button>
      </div>
    </footer>
  );
};

export default Footer;
