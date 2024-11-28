import { signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import firebaseApp from "../firebase/firebaseConfig";
import { firebaseErrorHandler } from "./firebaseErrorHandler";

type AuthHandlerParams = {
  email: string;
  password: string;
  setEmailError: React.Dispatch<React.SetStateAction<string>>;
  setPasswordError: React.Dispatch<React.SetStateAction<string>>;
  navigate: (path: string) => void;
};

export const handleLogin = async ({
  email,
  password,
  setEmailError,
  setPasswordError,
  setIsAuthenticated,
  navigate,
}: AuthHandlerParams & { setIsAuthenticated: (value: boolean) => void }): Promise<void> => {
  setEmailError("");
  setPasswordError("");

  const auth = getAuth(firebaseApp);

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    localStorage.setItem("authToken", userCredential.user.uid);
    setIsAuthenticated(true);
    navigate("/"); 
  } catch (error) {
    const { emailError, passwordError } = firebaseErrorHandler(error as Error);
    if (emailError) setEmailError(emailError);
    if (passwordError) setPasswordError(passwordError);
  }
};

export const handleRegister = async ({
  email,
  password,
  setEmailError,
  setPasswordError,
  navigate,
}: AuthHandlerParams): Promise<void> => {
  setEmailError("");
  setPasswordError("");

  const auth = getAuth(firebaseApp);

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    localStorage.setItem("authToken", userCredential.user.uid);
    navigate("/");  
  } catch (error) {
    const { emailError, passwordError } = firebaseErrorHandler(error as Error);
    if (emailError) setEmailError(emailError);
    if (passwordError) setPasswordError(passwordError);
  }
};
