<<<<<<< HEAD
import { readTextFile, BaseDirectory } from "@tauri-apps/api/fs";
=======
import React from "react";
import { readTextFile, BaseDirectory, writeFile, writeTextFile } from "@tauri-apps/api/fs";
>>>>>>> 1.0-setup

const usePasswords = () => {
  const dirPath = BaseDirectory.LocalData;
  const filePath = "./LockMaster/pws.json";

  const readPws = async (): Promise<string> => {
    let pwsContent = "";
    try {
      pwsContent = await readTextFile(filePath, { dir: dirPath });
    } catch (err: any) {
      console.error(err);
    }
    return pwsContent;
  };

  

  return {
    readPws,
  };
};

export default usePasswords;
