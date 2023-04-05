import React, { useEffect, useState } from "react";
import { BiCommentAdd } from "react-icons/bi";
import Block from "../../Components/LoginWithPw/Block";
<<<<<<< HEAD
import { BaseDirectory, readTextFile } from "@tauri-apps/api/fs";
import SearchBar from "../../Components/SearchBar/SearchBar";
import usePasswords from "./Hooks/usePasswords";
import "./Passwords.css";
import deletePassword from "./Hooks/deletePasswords";

interface Password {
  [key: string]: string;
  id: string;
  login: string;
  pw: string;
=======
import { BaseDirectory, readTextFile, writeTextFile } from "@tauri-apps/api/fs";
import SearchBar from "../../Components/SearchBar/SearchBar";
import usePasswords from "./Hooks/usePasswords";
import "./Passwords.css";
import CryptoJs from "crypto-js";
import { Skeleton } from "antd";

interface Password {
  [key: string]: string;
  login: string;
  pw: string;
  id: string;
>>>>>>> 1.0-setup
}

const TestPasswords = () => {
  const dirPath = BaseDirectory.LocalData;
  const filePath = "./LockMaster/pws.json";
  const [views, setViews] = useState<Password[]>([]);
  const [passwords, setPasswords] = useState<string>("");
<<<<<<< HEAD
  const [load, setLoad] = useState<boolean>(false);
=======
  const [load, setLoad] = useState<boolean>(true);
  const [del, setDel] = useState<boolean>(true);
>>>>>>> 1.0-setup
  const [filteredViews, setFilteredViews] = useState<Password[]>(views);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterBy, setFilterBy] = useState<string>("login");
  const { readPws } = usePasswords();

  const decrypt = (enccrypted: string) => {
    let bytes = CryptoJs.AES.decrypt(enccrypted, "secret key 123");
    let originalPassword = bytes.toString(CryptoJs.enc.Utf8);
    return originalPassword;
  };

  const deletePassword = async (id: number) => {
    let json = JSON.parse(await readTextFile(filePath, { dir: dirPath }));
    for (let i = 0; i < json.length; i++) {
      if (Number(json[i].id) === id) {
        json.splice(i, 1);
        break;
      }
    }

    if (JSON.stringify(json) === "[]") {
      await writeTextFile(filePath, "", {
        dir: dirPath,
      });
    } else {
      await writeTextFile(filePath, JSON.stringify(json), {
        dir: dirPath,
      });
    }

    setViews(json);
  };

  useEffect(() => {
    setDel(false);
  }, [del]);

  useEffect(() => {
    try {
      const read = async () => {
        try {
          setPasswords(await readTextFile(filePath, { dir: dirPath }));
          let array: Password[] = JSON.parse(await readPws());
<<<<<<< HEAD
          console.log("hello");
          console.log(array);
=======
>>>>>>> 1.0-setup
          setViews(array);
          setDel(false);
          setLoad(false);
        } catch (err: any) {
          console.error(err);
        }
      };
      read();
    } catch (err: any) {
      console.error(err);
    }

    setLoad(false);
<<<<<<< HEAD

=======
  }, [load, del]);

  useEffect(() => {
>>>>>>> 1.0-setup
    setFilteredViews(
      views.filter((item: any) =>
        item[filterBy]
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    );
<<<<<<< HEAD
  }, [load, views, searchTerm, filterBy]);
=======
  }, [views, searchTerm, filterBy]);
>>>>>>> 1.0-setup

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterByChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFilterBy(event.target.value);
  };

  return (
    <>
<<<<<<< HEAD
      <div className="cnp-container">
        <div className="upper">
=======
      {load ? (
        <Skeleton />
      ) : (
        <div className="cnp-container">
>>>>>>> 1.0-setup
          <h1>Passwords - search</h1>
          <SearchBar<Password>
            data={views}
            onFilter={setFilteredViews}
            searchTerm={searchTerm}
            onSearchTermChange={handleSearchTermChange}
            filterBy={["login", "pw"]}
            onFilterByChange={handleFilterByChange}
          />
<<<<<<< HEAD
        </div>

        <div className="pw-cont">
          {passwords ? (
            filteredViews.map((item: Password, index) => (
              <Block id={Number.parseInt(item.id)} key={index} login={item.login} pw={item.pw} deletePassword={deletePassword}/>
            ))
          ) : (
            <>
              <h1>Du hast derzeit keine Passwörter...</h1>
              <BiCommentAdd size={20} />
            </>
          )}
        </div>
      </div>
=======
          <div className="passwords-listing">
            {passwords ? (
              filteredViews.map((item: Password) => (
                <Block
                  id={Number.parseInt(item.id)}
                  key={item.login}
                  login={item.login}
                  pw={decrypt(item.pw)}
                  deletePassword={deletePassword}
                />
              ))
            ) : (
              <>
                <h1>Du hast derzeit keine Passwörter...</h1>
                <BiCommentAdd size={50} />
              </>
            )}
          </div>
        </div>
      )}
>>>>>>> 1.0-setup
    </>
  );
};

export default TestPasswords;
