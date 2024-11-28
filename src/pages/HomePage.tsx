import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/globalStore';

const HomePage = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuthStore();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false); 
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Welcome to Home Page</h1>
      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2">
        Logout
      </button>
    </div>
  );
};

export default HomePage;
