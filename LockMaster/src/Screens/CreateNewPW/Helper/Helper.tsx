import React, { useState } from "react";
import bcryptjs from "bcryptjs-react";
import * as CryptoJs from "crypto-js";
import {
  createDir,
  BaseDirectory,
  writeTextFile,
  readTextFile,
  readDir,
  exists,
} from "@tauri-apps/api/fs";
import { path } from "@tauri-apps/api";
import { invoke } from "@tauri-apps/api";

const Helper = () => {

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

  const createPws = async (passwords: string) => {
    try {
      await writeTextFile(filePath, passwords, {
        dir: dirPath,
      });
    } catch (err: any) {
      console.error(err);
    }
  };

  const hash = (salts: number, password: string) => {
    try {
      return bcryptjs.hash(password, salts);
    } catch (err: any) {
      console.error(err);
    }
  };

  const decrypt = (enccrypted: string) => {
    let bytes = CryptoJS.AES.decrypt(enccrypted, "secret key 123");
    let originalPassword = bytes.toString(CryptoJS.enc.Utf8);
    return originalPassword;
  };

  const encrypt = (password: string) => {
    return CryptoJS.AES.encrypt(password, "secret key 123").toString();
  };

  async function makeDir() {
    try {
      if (!(await exists("LockMaster", { dir: dirPath }))) {
        await createDir("LockMaster", { dir: dirPath });
      }
    } catch (err: any) {
      console.log(err);
    }
  }

/*   async function countIds(){
    array.forEach(element => {
      
    });
  } */

  const bigLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const smallLetters = "abcdefghijklmnopqrstuvwxyz";
  const nums = "0123456789";
  const specialChars = "!@#$%^&*()_+{}[];:<>,.?/~`|\\";

  return {
    specialChars,
    bigLetters,
    smallLetters,
    nums,
    hash,
    decrypt,
    encrypt,
    makeDir,
    createPws,
    readPws
  };
};

export default Helper;
