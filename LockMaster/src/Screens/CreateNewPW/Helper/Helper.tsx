import React from "react";
import bcryptjs from "bcryptjs-react";
import * as CryptoJs from "crypto-js";

const Helper = () => {
  const specialChars: string[] = [
    "+",
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
    "-",
    "_",
    "=",
    "[",
    "]",
    "{",
    "}",
    "|",
    "\\",
    ";",
    ":",
    "'",
    '"',
    ",",
    ".",
    "<",
    ">",
    "/",
    "?",
  ];

  const chars = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const charsUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const generatePassword = (length: number): string => {
    let password: string = "";

    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return password;
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

  const putUpper = (password: string): string => {
    return password.charAt(0).toUpperCase() + password.slice(1);
  };

  const putSpecial = (password: string): string => {
    const passwordArr: string[] = password.split("");
    const randIndex: number = Math.floor(Math.random() * length); // Choose a random index to replace with a special character
    passwordArr[randIndex] =
      specialChars[Math.floor(Math.random() * specialChars.length)];
    return (password = passwordArr.join(""));
  };

  return {
    specialChars,
    hash,
    generatePassword,
    putUpper,
    putSpecial,
    decrypt,
    encrypt,
  };
};

export default Helper;
