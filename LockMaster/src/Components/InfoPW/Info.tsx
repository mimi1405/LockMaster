import React from "react";
import "./Info.css";
import { AiFillInfoCircle } from "react-icons/ai";

const Info = () => {
  return (
    <>
      <div className="info-box">
        <AiFillInfoCircle color="orange" size={30} />
        <p>
          In today's digital age, a secure password is crucial to protect your
          online identity and personal information from cyber threats. A strong
          password should be unique, complex, and difficult to guess, as well as
          long enough with a mix of uppercase and lowercase letters, numbers,
          and symbols. Weak passwords can put you at risk of having your
          sensitive data compromised, while using the same password for multiple
          accounts increases vulnerability. By creating strong and unique
          passwords for each account and using a password manager, you can
          enhance your online security and reduce the risk of cyber attacks.
        </p>
      </div>
    </>
  );
};

export default Info;
