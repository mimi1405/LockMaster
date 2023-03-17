import React, { ChangeEvent, useState, useEffect } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { FcSettings } from "react-icons/fc";
import { Link } from "react-router-dom";
import "./CNP.css";
import { Checkbox, InputNumber } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import useCNP from "./Hooks/useCNP";
import { number } from "prop-types";
import NumberInput from "../../Components/NumberInput/NumberInput";

interface CreateNewPasswordProps {}

const CreateNewPassword: React.FC<CreateNewPasswordProps> = ({}) => {
  const [generated, setGenerated] = useState(false);

  useEffect(() => {
    setGenerated(false);
  }, [generated]);

  const { generatePassword, readPws } = useCNP();

  const [length, setLength] = useState<number>(Number);

  const [pw, setPw] = useState("");
  const [login, setLogin] = useState("Alte kanti");
  const [obje, setObje] = useState([Object]);

  const createPw = async () => {
    let password = await generatePassword(
      length,
      withBigLetters,
      withSmallLetters,
      withNumbers,
      withSpecialChar,
      login
    );
    setPw(await readPws());
    setObje(JSON.parse(pw));
    console.log(obje);
    setGenerated(true);
  };

  const [withSmallLetters, setWithSmallLetters] = useState(false);
  const [withBigLetters, setWithBigLetters] = useState(false);
  const [withSpecialChar, setWithSpecialChar] = useState(false);
  const [withNumbers, setWithNumbers] = useState(false);

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

  return (
    <>
      <div className="cnp-container">
        <div className="upper">
          <Link to="/">
            <button className="back_btn">
              <AiOutlineArrowLeft size={20} />
              Back
            </button>
          </Link>
          <h1>Create new password</h1>
        </div>
        <div className="bottom">
          {obje.map((items: any): any => {
            let newItem = {
              pw: items.pw,
              login: items.login,
            };
            return (
              <>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <p>{newItem.pw}</p>
                  <p>{newItem.login}</p>
                </div>
              </>
            );
          })}
          <p style={{ fontSize: "xx-small" }}>3-20</p>
          <NumberInput min={3} max={20} onChange={setLength} />
          <FcSettings size={30} />

          <div className="checks">
            <Checkbox onChange={onChangeSpecialChar}>
              special characters
            </Checkbox>
            <Checkbox onChange={onChangeFirstLetterBig}>big letters</Checkbox>
            <Checkbox onChange={onChangeAllSmall}>small letters</Checkbox>
            <Checkbox onChange={onChangeNumbers}>numbers</Checkbox>
          </div>

          <button onClick={() => createPw()} className="generate_btn">
            generate password
          </button>
          <button className="generate_btn">save</button>
        </div>
      </div>
    </>
  );
};

export default CreateNewPassword;
