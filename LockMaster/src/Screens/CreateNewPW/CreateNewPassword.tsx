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

  const { createPassword } = useCNP();

  const [length, setLength] = useState<number>(Number);

  const [pw, setPw] = useState("");

  const createPw = () => {
    let password = createPassword(
      allSmallChecked,
      firstLetterBig,
      withSpecialChar,
      length
    );
    setPw(password);
    setGenerated(true);
  };

  const [disableFirstLetterBig, setDisableFirstLetterBig] = useState(false);
  const [disableAllSmall, setDisableAllSmall] = useState(false);

  const [allSmallChecked, setAllSmallChecked] = useState(false);
  const [firstLetterBig, setfirstLetterBig] = useState(false);
  const [withSpecialChar, setWithSpecialChar] = useState(false);

  const toggleSpecialChar = () => {
    setWithSpecialChar(!withSpecialChar);
  };
  const onChangeSpecialChar = (e: CheckboxChangeEvent) => {
    toggleSpecialChar();
  };

  const toggleFirstLetterBig = () => {
    setfirstLetterBig(!firstLetterBig);
  };

  const onChangeFirstLetterBig = (e: CheckboxChangeEvent) => {
    toggleDisableAllSmall();
    toggleFirstLetterBig();
    console.log(firstLetterBig);
  };

  const toggleAllSmallChecked = () => {
    setAllSmallChecked(!allSmallChecked);
  };

  const toggleDisableAllSmall = () => {
    setDisableAllSmall(!disableAllSmall);
  };

  const toggleDisableFirstLetterBig = () => {
    setDisableFirstLetterBig(!disableFirstLetterBig);
  };

  const onChangeAllSmall = (e: CheckboxChangeEvent) => {
    toggleDisableFirstLetterBig();
    toggleAllSmallChecked();
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
          <p>{length}</p>
          <NumberInput min={3} max={20} onChange={setLength} />
          <p>*Includes:</p>
          <div className="checks">
            <Checkbox onChange={onChangeSpecialChar}>
              special character
            </Checkbox>
            <Checkbox
              disabled={disableFirstLetterBig}
              onChange={onChangeFirstLetterBig}
            >
              first letter big
            </Checkbox>
            <Checkbox disabled={disableAllSmall} onChange={onChangeAllSmall}>
              all small
            </Checkbox>
          </div>

          <p>{pw}</p>

          <button onClick={() => createPw()} className="generate_btn">
            generate
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateNewPassword;
