import React from "react";
import { writeTextFile, BaseDirectory } from "@tauri-apps/api/fs";
import bcryptjs from "bcryptjs-react";

const useCNP = () => {
  const createDir = () => {};

  const path = "";

  function generatePassword(length: number): string {
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
    let password: string = "";

    // Generate the password by randomly selecting characters
    for (let i = 0; i < length; i++) {
      const randChar: string = String.fromCharCode(
        Math.floor(Math.random() * 94) + 33
      ); // Generate a random ASCII character from ! to ~
      password += randChar;
    }

    // Ensure that the password contains at least one special character
    const passwordArr: string[] = password.split("");
    let hasSpecialChar: boolean = false;
    for (const char of passwordArr) {
      if (specialChars.includes(char)) {
        hasSpecialChar = true;
        break;
      }
    }
    if (!hasSpecialChar) {
      const randIndex: number = Math.floor(Math.random() * length); // Choose a random index to replace with a special character
      passwordArr[randIndex] = "+";
      password = passwordArr.join("");
    }

    return password;
  }

  const hash = async (salts: number, password: string) => {
    try{
        return bcryptjs.hash(password, salts);

    }catch(err: any){
        console.error(err);
    }
  }

  const createPassword = async () => {
    const newPassword = generatePassword(10);
    /* const oldPasswords = JSON.stringify() */
    const salts = 10;
    const hashedPassword = hash(salts, newPassword);
    await writeTextFile("pws.json", newPassword, { dir: BaseDirectory.AppLocalData });
  };

  return {
    createPassword,
  };
};

export default useCNP;