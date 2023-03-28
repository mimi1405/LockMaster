import { readTextFile, BaseDirectory } from "@tauri-apps/api/fs";

const usePasswords = () => {
  const dirPath = BaseDirectory.LocalData;
  const filePath = "./LockMaster/pws.json";

  const readPws = async (): Promise<string> => {
    let pwsContent = "";
    try {
      pwsContent = await readTextFile(filePath, { dir: dirPath });
    } catch (err: any) {
      console.error(err);
    }
    return pwsContent;
  };

  return {
    readPws,
  };
};

export default usePasswords;
