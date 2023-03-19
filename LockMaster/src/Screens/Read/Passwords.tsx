import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BiCommentAdd } from "react-icons/bi";
import usePasswords from "./Hooks/usePasswords";
import { readTextFile, BaseDirectory } from "@tauri-apps/api/fs";
import Block from "../../Components/LoginWithPw/Block";
import "./Passwords.css";
import SearchBar from "../../Components/SearchBar/SearchBar";

const Passwords = () => {
  const dirPath = BaseDirectory.LocalData;
  const filePath = "./LockMaster/pws.json";
  const [views, setViews] = useState([Object]);
  const [passwords, setPasswords] = useState<any>("");
  const [load, setLoad] = useState(false);
  const { readPws } = usePasswords();

  useEffect(() => {
    try {
      const read = async () => {
        try {
          setPasswords(await readTextFile(filePath, { dir: dirPath }));
          let array: ObjectConstructor = JSON.parse(await readPws());
          setViews(array);
        } catch (err: any) {
          console.error(err);
        }
      };
      read();
    } catch (err: any) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    setLoad(false);
  }, [load]);

  return (
    <>
      <div className="cnp-container">
        <div className="upper">
          <h1>Passwords - overview</h1>
        </div>
        <div className="pw-cont">
          
          {passwords ? (
            views.map((items: any): any => {
              let newItem = {
                pw: items.pw,
                login: items.login,
              };
              return (
                <>
                  <Block login={newItem.login} pw={newItem.pw} />
                </>
              );
            })
          ) : (
            <>
              <h1>Du hast derzeit keine Passwörter...</h1>
              <BiCommentAdd size={20} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Passwords;
