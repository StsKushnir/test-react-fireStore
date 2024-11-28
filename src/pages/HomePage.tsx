import { useNavigate } from "react-router-dom";
import useFetchUsers from "../hooks/useFetchUsers";
import { createUserWithAuth } from "../services/authService";
import {
  createUserInFirestore,
  deleteUserFromFirestore,
  fetchUsers,
} from "../services/userService";
import useAuthStore from "../store/globalStore";
import UserList from "../components/UserList";
import CreateUserForm from "../components/CreateUserForm";

const HomePage = () => {
  const { users, setUsers, loading } = useFetchUsers();
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuthStore();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    navigate("/login");
  };

  const handleCreateUser = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithAuth(email, password);
      await createUserInFirestore(userCredential.user.uid, email);
      const updatedUsers = await fetchUsers();
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error creating user: ", error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUserFromFirestore(userId);
      const updatedUsers = await fetchUsers();
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error deleting user: ", error);
    }
  };

  return loading ? (
    <p className="font-bold text-[56px]">Loading data...</p>
  ) : (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Welcome to Home Page</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 mb-4"
      >
        Logout
      </button>
      <UserList
        users={users}
        currentUser={{ role: "admin" }} 
        handleDeleteUser={handleDeleteUser}
      />
      <CreateUserForm handleCreateUser={handleCreateUser} />
    </div>
  );
};

export default HomePage;
