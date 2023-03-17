import React from "react";
import Helper from "../Helper/Helper";

const useCNP = () => {
  const {
    hash,
    decrypt,
    encrypt,
    bigLetters,
    smallLetters,
    nums,
    specialChars,
    makeDir,
    createPws,
    readPws,
  } = Helper();

  async function prepareJson(password: string, login: string) {
    let array: object[] = JSON.parse(await readPws());
    let idCount: number = 0;
    array.forEach((element) => {
      idCount++;
    });
    array.push({ id: idCount, pw: password, login: login });
    return JSON.stringify(array);
  }

  async function generatePassword(
    length: number,
    withBigLetters: boolean,
    withSmallLetters: boolean,
    withNums: boolean,
    withSpecialChars: boolean,
    login: string
  ) {
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
    createPws(await prepareJson(password, login));
  }

  return {
    generatePassword,
    readPws,
  };
};

export default useCNP;
