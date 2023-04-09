import React from "react";
import "./Block.css";
import {TbCircleXFilled} from "react-icons/tb";

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
        <p className="id-text">ID: {id.toString()}</p>
        <p className="pw-text">Password: {pw}</p>
        <p className="log-text">For: {login}</p>
        <div className="delete-btn">
          <TbCircleXFilled onClick={async () => await deletePassword(id)} />
        </div>
      </div>
    </>
  );
};

export default Block;
