import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser, setAccessToken } = useAuthContext();

  const login = async (phone, password) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setAuthUser(data.user);
        setAccessToken(data.accessToken);
      } else {
        toast.error(data.message);
        // throw new Error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return { login, loading };
};

export default useLogin;
