import { useContext, useEffect, useState } from "react";
import { ProtectionContext } from "../../Context/ProtectionContext";
import { fs } from "@tauri-apps/api";
import "./Protection.css";
import { Input, Button } from "antd";
import bcryptjs from "bcryptjs-react";

type ProtectionProps = {
  children: React.ReactNode;
};

const Protection: React.FC<ProtectionProps> = ({ children }) => {
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState("");
  const filePath = "./LockMaster/secured.bin";
  const [created, setCreated] = useState(false);
  const [loading, setLoading] = useState(true);

  async function hashPassword(password: string): Promise<string> {
    let salt = await bcryptjs.genSalt(10);
    let hashedPassword = await bcryptjs.hash(password, salt);
    return hashedPassword;
  }

  const createBinaryFile = async (binary: Uint8Array) => {
    try {
      await fs.writeBinaryFile(filePath, binary, {
        dir: fs.BaseDirectory.LocalData,
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  const createMasterPassword = async () => {
    let password = await hashPassword(enteredPassword);
    let encoder = new TextEncoder();
    let binary = new Uint8Array(encoder.encode(password));
    await createBinaryFile(binary);
    setCreated(true);
    setLoading(false);
    console.log("created" + binary);
    return binary;
  };

  const checkMasterPassword = async () => {
    let binaryData = await fs.readBinaryFile(filePath, {
      dir: fs.BaseDirectory.LocalData,
    });
    let storedHashedPassword = new TextDecoder().decode(binaryData);
    console.log("storedHashedPassword:", storedHashedPassword);

    if (await bcryptjs.compare(enteredPassword, storedHashedPassword)) {
      setIsPasswordCorrect(true);
    } else {
      setIsPasswordCorrect(false);
    }
  };

  async function prepareFiles() {
    const dirExists = await fs.exists("./LockMaster", {
      dir: fs.BaseDirectory.LocalData,
    });

    if (!dirExists) {
      await fs.createDir("LockMaster", { dir: fs.BaseDirectory.LocalData });
      setIsFirstTime(true);
      return;
    }

    const fileExists = await fs.exists(filePath, {
      dir: fs.BaseDirectory.LocalData,
    });
    if (!fileExists || isFirstTime) {
      setIsFirstTime(true);
      return;
    }
  }

  useEffect(() => {
    prepareFiles();
  }, [enteredPassword]);

  useEffect(() => {
    setLoading(false);
    setCreated(true);
  }, [created, loading]);
  
  const renderForFirstTime = () => {
    return (
      <>
        <div className="protection-container">
          <h1 className="protection-greeting">Welcome to LockMaster!</h1>
          <p>We're glad that you want to use our password generator!</p>
          <form className="masterpw-form" /* onSubmit={handlePasswordSubmit} */>
            <label>Create your Master Password</label>
            <Input
              className="masterpw-input"
              onChange={(e: any) => setEnteredPassword(e.target.value)}
              type="password"
              placeholder="enter password"
              autoFocus
            />
            <Button onClick={createMasterPassword} type="default">
              Create
            </Button>
          </form>
        </div>
      </>
    );
  };

  const renderSignIn = () => {
    return (
      <>
        <div className="protection-container">
          <h1 className="protection-greeting">Welcome to LockMaster!</h1>
          <form className="masterpw-form" /* onSubmit={handlePasswordSubmit} */>
            <label>Master Password</label>
            <Input
              autoFocus
              className="masterpw-input"
              onChange={(e) => setEnteredPassword(e.target.value)}
              type="password"
              placeholder="enter password"
            />
            <Button onClick={checkMasterPassword} type="default">
              Enter
            </Button>
          </form>
        </div>
      </>
    );
  };

  if (isFirstTime || !isPasswordCorrect) {
    return isFirstTime ? renderForFirstTime() : renderSignIn()
  }

  return (
    <>
      <ProtectionContext.Provider value={{ isPasswordCorrect }}>
        {children}
      </ProtectionContext.Provider>
    </>
  );
};

export default Protection;
