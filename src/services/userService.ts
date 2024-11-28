import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

const db = getFirestore();
const usersCollection = collection(db, "users");

export const fetchUsers = async () => {
  const usersSnapshot = await getDocs(usersCollection);
  return usersSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const createUserInFirestore = async (
  userId: string,
  email: string
) => {
  await setDoc(doc(db, "users", userId), {
    email,
    role: "viewer",
    createdAt: new Date(),
  });
};

export const deleteUserFromFirestore = async (userId: string) => {
  const userDocRef = doc(db, "users", userId);
  await deleteDoc(userDocRef);
};
