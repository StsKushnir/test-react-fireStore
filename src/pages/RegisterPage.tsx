import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleRegister } from "../utils/authHandlers"; 
import InputField from "../components/InputField";
import AuthLayout from "../components/AuthLayout";
import AuthSwitch from "../components/AuthSwitch";

const RegisterPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const navigate = useNavigate(); 

  const registerHandler = async () => {
    await handleRegister({
      email,
      password,
      setEmailError,
      setPasswordError,
      navigate,
    });
  };

  return (
    <AuthLayout title="Register now">
      <InputField
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={emailError}
        name="email"
      />
      <InputField
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={passwordError}
      />
      <button
        onClick={registerHandler}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Sign up
      </button>
      <AuthSwitch
        text="Already have an account?"
        linkText="Login here"
        linkTo="/login"
      />
    </AuthLayout>
  );
};

export default RegisterPage;
