import React from "react";
import "./Block.css";
import { TbCircleXFilled } from "react-icons/tb";
import { AiFillCopy } from "react-icons/ai";
interface BlockProps {
  id: number;
  login: string;
  pw: string;
  deletePassword: Function;
}

function copyToClipBoard(password: string) {
  navigator.clipboard
    .writeText(password)
    .then(() => console.log(`Copied "${password}" to clipboard`))
    .catch((err) => console.error("Failed to copy text: ", err));
}

const Block: React.FC<BlockProps> = ({ id, login, pw, deletePassword }) => {
  return (
    <>
      <div className="block-box">
        <div className="password-data">
          <p className="pw-text">Password: {pw}</p>
          <p className="log-text">For: {login}</p>
        </div>
        <div className="functionality">
          <TbCircleXFilled
            className="delete-btn"
            size={25}
            onClick={async () => await deletePassword(id)}
          />
          <AiFillCopy
            onClick={() => copyToClipBoard(pw)}
            className="copy-btn"
            size={25}
          />
        </div>
      </div>
    </>
  );
};

export default Block;
