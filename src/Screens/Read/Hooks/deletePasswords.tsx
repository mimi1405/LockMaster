import { BaseDirectory, readTextFile, writeFile, writeTextFile } from "@tauri-apps/api/fs";

const deletePassword = async (id: Number) =>{

    console.log("Deleting password: " + id);
    const dirPath = BaseDirectory.LocalData;
    const filePath = "./LockMaster/pws.json";
    console.log(filePath);
    var json = JSON.parse(await readTextFile(filePath, { dir: dirPath }));
    console.log(json);
    for(let i = 0; i < json.length; i++){
        if(Number(json[i].id) == id){
            json.splice(i, 1);
            break;
        }
    }
    console.log("Deleted Entry: " + id);

    await writeFile(filePath, JSON.stringify(json), {
        dir: dirPath,
    });
    json = JSON.parse(await readTextFile(filePath, { dir: dirPath }));
    console.log("new json");
    console.log(json);
  console.log(id);
}

export default deletePassword;