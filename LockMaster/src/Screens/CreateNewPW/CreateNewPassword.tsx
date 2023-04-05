import React, { ChangeEvent, useState, useEffect } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { FcSettings } from "react-icons/fc";
import { Link } from "react-router-dom";
import "./CNP.css";
import { Checkbox, Input, InputNumber } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import useCNP from "./Hooks/useCNP";
import NumberInput from "../../Components/NumberInput/NumberInput";

interface CreateNewPasswordProps {}

const CreateNewPassword: React.FC<CreateNewPasswordProps> = ({}) => {
  const [generated, setGenerated] = useState(false);

  useEffect(() => {
    setGenerated(false);
  }, [generated]);

  const { generatePassword, savePassword } = useCNP();

  const [length, setLength] = useState<number>(Number);

  const [pw, setPw] = useState("");
  const [login, setLogin] = useState("");

  const createPw = async () => {
    setPw(
      generatePassword(
        length,
        withBigLetters,
        withSmallLetters,
        withNumbers,
        withSpecialChar
      )
    );
    setGenerated(true);
  };

  const [withSmallLetters, setWithSmallLetters] = useState(false);
  const [withBigLetters, setWithBigLetters] = useState(false);
  const [withSpecialChar, setWithSpecialChar] = useState(false);
  const [withNumbers, setWithNumbers] = useState(false);

  //#region
  const toggleSpecialChar = () => {
    setWithSpecialChar(!withSpecialChar);
  };
  const onChangeSpecialChar = (e: CheckboxChangeEvent) => {
    toggleSpecialChar();
  };

  const toggleFirstLetterBig = () => {
    setWithBigLetters(!withBigLetters);
  };

  const onChangeFirstLetterBig = (e: CheckboxChangeEvent) => {
    toggleFirstLetterBig();
  };

  const toggleAllSmallChecked = () => {
    setWithSmallLetters(!withSmallLetters);
  };

  const onChangeAllSmall = (e: CheckboxChangeEvent) => {
    toggleAllSmallChecked();
  };

  const toggleNumbersChecked = () => {
    setWithNumbers(!withNumbers);
  };

  const onChangeNumbers = (e: CheckboxChangeEvent) => {
    toggleNumbersChecked();
  };

  //#endregion

  return (
    <>
      <div className="cnp-container">
        <div className="upper">
          <p>How to:</p>
          <ol>
            <li>Set your preffered length</li>
            <li>Mark the options u like</li>
            <li>Generate your password until you like it</li>
            <li>Give it a corresponding login</li>
            <li>Save it!</li>
          </ol>
        </div>
        <div className="bottom">
          <strong>
            <p>{pw ? pw : "Password..."}</p>
          </strong>
          <p>for: {login}</p>
          <p style={{ fontSize: "xx-small" }}>size: 3-20</p>
          <div className="inputs">
            <FcSettings size={15} />
            <NumberInput min={3} max={20} onChange={setLength} />
            <Input
              onChange={(e) => setLogin(e.target.value)}
              type="text"
              value={login}
              placeholder="example: BBB Login"
            />
            <FcSettings size={15} />
          </div>

          <div className="checks">
            <Checkbox className="check" onChange={onChangeSpecialChar}>
              special characters
            </Checkbox>
            <Checkbox className="check" onChange={onChangeFirstLetterBig}>
              big letters
            </Checkbox>
            <Checkbox className="check" onChange={onChangeAllSmall}>
              small letters
            </Checkbox>
            <Checkbox className="check" onChange={onChangeNumbers}>
              numbers
            </Checkbox>
          </div>

          <button onClick={() => createPw()} className="generate_btn">
            generate password
          </button>
          <button
            onClick={() => savePassword(pw, login)}
            className="generate_btn"
          >
            save
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateNewPassword;
