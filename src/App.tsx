import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import useAuthStore from "./store/globalStore";

const App = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuthStore();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/" /> : <RegisterPage />}
        />
        <Route
          path="/"
          element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/" : "/login"} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
