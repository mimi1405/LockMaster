import React from "react";
import { writeTextFile, BaseDirectory } from "@tauri-apps/api/fs";
import Helper from "../Helper/Helper";

const useCNP = () => {

  const { hash, specialChars, generatePassword, putUpper, putSpecial, decrypt, encrypt } =
    Helper();

  const path = "";

  //#region password generating options

  /**
   *
   * @param length of pw
   * @returns pw with first letter big
   */
  function gpwflb(length: number): string {
    try {
      let password = generatePassword(length);
      password = putUpper(password);
      return password;
    } catch (err: any) {
      return err;
    }
  }

  /**
   *
   * @param length of pw
   * @returns pw including a special character
   */
  function gpwsc(length: number): string {
    try {
      let password = generatePassword(length);
      password = putSpecial(password);
      return password;
    } catch (err: any) {
      return err;
    }
  }

  /**
   *
   * @param length of pw
   * @returns pw with all letters small
   */
  function gpwas(length: number): string {
    let password = generatePassword(length);
    return password;
  }

  //#endregion

  const createPassword = (
    as: boolean,
    flb: boolean,
    sc: boolean,
    length: number
  ): string => {
    try {
      let password = "";

      if (as === true) {
        return gpwas(length);
      }
      else if (flb === true) {
        return gpwflb(length);
      }
      else if (sc === true) {
        return gpwsc(length);
      }
      else if (as !== false && sc !== false) {
        password = gpwas(length);
        return (password = putSpecial(password));
      }
      else if (flb !== false && sc !== false) {
        password = gpwflb(length);
        return (password = putSpecial(password));
      } else {
        return "";
      }
    } catch (err: any) {
      return err;
    }
  };

  return {
    createPassword,
  };
};

export default useCNP;
