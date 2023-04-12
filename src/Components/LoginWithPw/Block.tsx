import React from "react";
import "./Block.css";
import {TbCircleXFilled} from "react-icons/tb";
import { AiFillCopy } from "react-icons/ai";

interface BlockProps {
  id: number;
  login: string;
  pw: string;
  deletePassword: Function;
}

const Block: React.FC<BlockProps> = ({ id, login, pw, deletePassword }) => {
  return (
    <>
      <div className="block-box">
        <p className="pw-text">Password: {pw}</p>
        <p className="log-text">For: {login}</p>
        <div className="buttons">
          <TbCircleXFilled className="delete" size={25} onClick={async () => await deletePassword(id)} />
          <AiFillCopy className="copy" size={25} onClick={() => navigator.clipboard.writeText(pw)} />
        </div>
      </div>
    </>
  );
};

export default Block;
