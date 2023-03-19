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
    let content = await readPws();
    if(!content){
      return JSON.stringify([{id: 1, pw: password, login: login}])
    }else{
      let array: object[] = JSON.parse(content);
      let idCount: number = 1;
      array.forEach((element) => {
        idCount++;
      });
      array.push({ id: idCount++, pw: password, login: login });
      return JSON.stringify(array);
    }
    
  
    
  }

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
    return password;
  }

  async function savePassword(password: string, login: string) {
    let passwords = await prepareJson(password, login);
    await createPws(passwords);
  }

  return {
    generatePassword,
    savePassword,
  };
};

export default useCNP;
