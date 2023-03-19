import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./NavButton.css";

interface NavButtonProps {
  to: string;
  display: string;
}

const NavButton: React.FC<NavButtonProps> = ({ to, display }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const buttons = document.getElementsByClassName("nav_button");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove("active");
    }
    const button = event.currentTarget;
    button.classList.add("active")
  };

  return (
    <>
      <Link to={to}>
        <div className="container_nav">
          <button
            onClick={handleClick}
            className="nav_button active"
          >
            {display}
          </button>
        </div>
      </Link>
    </>
  );
};

export default NavButton;
