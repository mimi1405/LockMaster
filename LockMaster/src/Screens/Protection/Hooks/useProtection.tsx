import Helper from "../Helpers/Helper";
import react from "react";
import { useState, useEffect } from "react";
import { fs } from "@tauri-apps/api";
import { path } from "@tauri-apps/api";

const useProtection = () => {
  const [firstTime, setFirstTime] = useState(false);
  const check = async () => {
    if (await fs.exists("./LockMaster", { dir: fs.BaseDirectory.LocalData })) {
      if (
        await fs.exists("./LockMaster/secure.bin", {
          dir: fs.BaseDirectory.LocalData,
        })
      ) {
        console.log("a");
        return true;
      } else {
        console.log("b");

        return false;
      }
    } else {
      console.log("c");

      return false;
    }
  };
  useEffect(() => {
    let proof = check();
    if (!proof) {
      setFirstTime(false);
    } else {
      setFirstTime(true);
    }
    console.log(proof);
  }, []);

  return {
    check,
  };
};

export default useProtection;
