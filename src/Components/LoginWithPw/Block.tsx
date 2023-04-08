import React from "react";
import "./Block.css";
<<<<<<< HEAD
import {TbCircleXFilled} from "react-icons/tb";

=======
import { TbCircleXFilled } from "react-icons/tb";
import { AiFillCopy } from "react-icons/ai";
>>>>>>> 1.0-setup
interface BlockProps {
  id: number;
  login: string;
  pw: string;
  deletePassword: Function;
}

<<<<<<< HEAD
=======
function copyToClipBoard(password: string) {
  navigator.clipboard
    .writeText(password)
    .then(() => console.log(`Copied "${password}" to clipboard`))
    .catch((err) => console.error("Failed to copy text: ", err));
}

>>>>>>> 1.0-setup
const Block: React.FC<BlockProps> = ({ id, login, pw, deletePassword }) => {
  return (
    <>
      <div className="block-box">
<<<<<<< HEAD
        <p className="id-text">ID: {id.toString()}</p>
        <p className="pw-text">Password: {pw}</p>
        <p className="log-text">For: {login}</p>
        <div className="delete-btn">
          <TbCircleXFilled onClick={async () => await deletePassword(id)} />
=======
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
>>>>>>> 1.0-setup
        </div>
      </div>
    </>
  );
};

export default Block;
