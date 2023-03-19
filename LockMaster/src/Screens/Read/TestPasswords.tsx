import React, { useEffect, useState } from "react";
import { BiCommentAdd } from "react-icons/bi";
import Block from "../../Components/LoginWithPw/Block";
import { BaseDirectory, readTextFile } from "@tauri-apps/api/fs";
import SearchBar from "../../Components/SearchBar/SearchBar";
import usePasswords from "./Hooks/usePasswords";
import "./Passwords.css";

interface Password {
  [key: string]: string;
  login: string;
  pw: string;
}

const TestPasswords = () => {
  const dirPath = BaseDirectory.LocalData;
  const filePath = "./LockMaster/pws.json";
  const [views, setViews] = useState<Password[]>([]);
  const [passwords, setPasswords] = useState<string>("");
  const [load, setLoad] = useState<boolean>(false);
  const [filteredViews, setFilteredViews] = useState<Password[]>(views);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterBy, setFilterBy] = useState<string>("login");
  const { readPws } = usePasswords();

  useEffect(() => {
    try {
      const read = async () => {
        try {
          setPasswords(await readTextFile(filePath, { dir: dirPath }));
          let array: Password[] = JSON.parse(await readPws());
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
      <div className="cnp-container">
        <div className="upper">
          <h1>Passwords - search</h1>
          <SearchBar<Password>
            data={views}
            onFilter={setFilteredViews}
            searchTerm={searchTerm}
            onSearchTermChange={handleSearchTermChange}
            filterBy={["login", "pw"]}
            onFilterByChange={handleFilterByChange}
          />
        </div>

        <div className="pw-cont">
          {passwords ? (
            filteredViews.map((item: Password) => (
              <Block key={item.login} login={item.login} pw={item.pw} />
            ))
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

export default TestPasswords;
