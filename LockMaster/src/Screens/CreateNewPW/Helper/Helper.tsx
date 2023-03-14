import React from "react";
import bcryptjs from "bcryptjs-react";
import * as CryptoJs from "crypto-js";
import { createDir, BaseDirectory } from "@tauri-apps/api/fs";

const Helper = () => {
  const path = BaseDirectory.LocalData;

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
    await createDir("LockMaster", { dir: path });
  }

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
    makeDir
  };
};

export default Helper;
