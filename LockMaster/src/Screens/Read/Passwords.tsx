import React, { useEffect, useState } from "react";
import { BiCommentAdd } from "react-icons/bi";
import Block from "../../Components/LoginWithPw/Block";
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
}

const TestPasswords = () => {
  const dirPath = BaseDirectory.LocalData;
  const filePath = "./LockMaster/pws.json";
  const [views, setViews] = useState<Password[]>([]);
  const [passwords, setPasswords] = useState<string>("");
  const [load, setLoad] = useState<boolean>(true);
  const [del, setDel] = useState<boolean>(true);
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
  }, []);

  useEffect(() => {
    setLoad(false);
  }, [load, del]);

  useEffect(() => {
    setFilteredViews(
      views.filter((item: any) =>
        item[filterBy]
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    );
  }, [views, searchTerm, filterBy]);

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
      {load ? (
        <Skeleton />
      ) : (
        <div className="cnp-container">
          <h1>Passwords - search</h1>
          <SearchBar<Password>
            data={views}
            onFilter={setFilteredViews}
            searchTerm={searchTerm}
            onSearchTermChange={handleSearchTermChange}
            filterBy={["login", "pw"]}
            onFilterByChange={handleFilterByChange}
          />
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
    </>
  );
};

export default TestPasswords;
