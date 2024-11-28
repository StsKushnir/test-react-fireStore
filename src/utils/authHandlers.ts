import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import firebaseApp from "../firebase/firebaseConfig";
import { firebaseErrorHandler } from "./firebaseErrorHandler";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  getDocs,
} from "firebase/firestore";

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
}: AuthHandlerParams & {
  setIsAuthenticated: (value: boolean) => void;
}): Promise<void> => {
  setEmailError("");
  setPasswordError("");

  const auth = getAuth(firebaseApp);

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
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
  const db = getFirestore(firebaseApp);

  try {
    const usersCollection = collection(db, "users");
    const usersSnapshot = await getDocs(usersCollection);
    const isThisEmailExist = usersSnapshot.docs.some((doc) => {
      console.log("emails:", doc.data().email);
      console.log("умова:", doc.data().email === email);
      return doc.data().email === email;
    });

    if (isThisEmailExist) {
      console.log("im here ", isThisEmailExist);
      setEmailError("Email already exists. Please use a different email.");
      return;
    }
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const userRef = doc(db, "users", userCredential.user.uid);
    await setDoc(userRef, {
      email: email,
      role: "admin",
      createdAt: new Date(),
    });
    localStorage.setItem("authToken", userCredential.user.uid);
    navigate("/");
  } catch (error) {
    const { emailError, passwordError } = firebaseErrorHandler(error as Error);
    if (emailError) setEmailError(emailError);
    if (passwordError) setPasswordError(passwordError);
  }
};
