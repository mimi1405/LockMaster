import React from "react";
import "./Block.css";

interface BlockProps {
  login: string;
  pw: string;
}

const Block: React.FC<BlockProps> = ({ login, pw }) => {
  return (
    <>
      <div className="block-box">
        <p className="pw-text">Password: {pw}</p>
        <p className="log-text">For: {login}</p>
      </div>
    </>
  );
};

export default Block;
