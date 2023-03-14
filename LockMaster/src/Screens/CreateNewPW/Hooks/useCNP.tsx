import React from "react";
import { writeTextFile, BaseDirectory } from "@tauri-apps/api/fs";
import Helper from "../Helper/Helper";
import { fs } from "@tauri-apps/api";

const useCNP = () => {
  const {
    hash,
    decrypt,
    encrypt,
    bigLetters,
    smallLetters,
    nums,
    specialChars,
    makeDir
  } = Helper();


  function generatePassword(
    length: number,
    withBigLetters: boolean,
    withSmallLetters: boolean,
    withNums: boolean,
    withSpecialChars: boolean
  ): string {
    let validChars = "";
    if (withBigLetters) validChars += bigLetters;
    if (withSmallLetters) validChars += smallLetters;
    if (withNums) validChars += nums;
    if (withSpecialChars) validChars += specialChars;
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * validChars.length);
      password += validChars.charAt(randomIndex);
    }
    makeDir();
    return password;
  }

  return {
    generatePassword,
  };
};

export default useCNP;
