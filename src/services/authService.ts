/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getAuth,
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
} from "firebase/auth";

export const createUserWithAuth = async (email: string, password: string) => {
  const auth = getAuth();
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const deleteUserWithAuth = async (user: any) => {
  if (user) {
    await deleteUser(user);
  }
};

export const listenToAuthChanges = (callback: (user: any) => void) => {
  const auth = getAuth();
  return onAuthStateChanged(auth, callback);
};
