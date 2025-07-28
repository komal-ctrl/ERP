import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import api from "../api"; // your axios instance

const useLogout = () => {
  const navigate = useNavigate();

  const logout = async (e) => {
    e.preventDefault();
    try {
      await api.post("/users/logout");
      localStorage.removeItem("token");
      toast.success("Logged out successfully");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      // console.error("Logout failed", err);
      toast.error("Logout failed");
    }
  };

  return logout;
};

export default useLogout;
