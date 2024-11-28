import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "../utils/authHandlers";
import InputField from "../components/InputField";
import AuthLayout from "../components/AuthLayout";
import AuthSwitch from "../components/AuthSwitch";
import useAuthStore from "../store/globalStore";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const navigate = useNavigate(); 
  const { setIsAuthenticated } = useAuthStore();

  const loginHandler = async () => {
    await handleLogin({
      email,
      password,
      setEmailError,
      setPasswordError,
      setIsAuthenticated,
      navigate,
    });
  };

  return (
    <AuthLayout title="Login">
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
        onClick={loginHandler}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Sign in
      </button>
      <AuthSwitch
        text="Don't have an account?"
        linkText="Register here"
        linkTo="/register"
      />
    </AuthLayout>
  );
};

export default LoginPage;

