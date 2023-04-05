import { fs } from "@tauri-apps/api";
import { path } from "@tauri-apps/api";

const Helper = () => {
  const dirPath = fs.BaseDirectory.LocalData;
  const filePath = "./LockMaster/secure.bin";

  async function makeDir() {
    try {
      if (!(await fs.exists("./LockMaster", { dir: dirPath }))) {
        await fs.createDir("LockMaster", { dir: dirPath });
        return false;
      }else{
        return true;
      }
    } catch (err: any) {
      console.log(err);
    }
  }

  async function makeBinary(content: fs.BinaryFileContents) {
    try {
      if (!(await fs.exists(filePath, { dir: dirPath }))) {
        await fs.writeBinaryFile("LockMaster", content, { dir: dirPath });
        return false;
      }else{
        return true;
      }
    } catch (err: any) {
      console.log(err);
    }
  }

  return {
    makeDir,
    makeBinary
  };
};

export default Helper;
