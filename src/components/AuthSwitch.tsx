import React from "react";
import { useNavigate } from "react-router-dom";

interface AuthSwitchProps {
  text: string;
  linkText: string;
  linkTo: string;
}

const AuthSwitch: React.FC<AuthSwitchProps> = ({ text, linkText, linkTo }) => {
  const navigate = useNavigate();

  return (
    <p className="mt-4">
      {text}{" "}
      <button onClick={() => navigate(linkTo)} className="text-blue-500">
        {linkText}
      </button>
    </p>
  );
};

export default AuthSwitch;
