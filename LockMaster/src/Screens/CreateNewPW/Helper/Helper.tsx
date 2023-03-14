import React from 'react';
import bcryptjs from "bcryptjs-react";

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

      const hash = async (salts: number, password: string) => {
        try{
            return bcryptjs.hash(password, salts);
    
        }catch(err: any){
            console.error(err);
        }
      }
    return (
        {
            specialChars, hash
        }
    );
};

export default Helper;
