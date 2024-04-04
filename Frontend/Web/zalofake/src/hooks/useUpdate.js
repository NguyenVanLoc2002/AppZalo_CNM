import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import axiosInstance from "../api/axiosInstance";
import VerifyOTPModule from "../utils/verifyOTP";

const useUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [systemOTP, setSystemOTP] = useState(null);

  const { setAuthUser } = useAuthContext();
  const updateProfile = async (userData) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        "/users/update-profile",
        userData
      );

      const { data, status } = response;

      if (status === 200) {
        const { user } = data;
        if (user) {
          setAuthUser(user);
          toast.success("Profile updated successfully");
        } else {
          throw new Error("Failed to update profile");
        }
      } else {
        throw new Error(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response.data.message ||
          "Failed to update profile! Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const getOTP = async (email) => {
    try {
      setLoading(true);
      const check_mail = await axiosInstance.post("/users/check-email", {
        email,
      });
      console.log(check_mail);

      if (check_mail.status === 200) {
        toast.error("Email already exists! Please try another email");
        setLoading(false);
        return false;
      }
    } catch (error) {
      if (error.response) {
        const otp = await VerifyOTPModule.sendOTP(email);
        toast.success("OTP sent to your email");
        setLoading(false);
        setSystemOTP(otp);
        return true;
      } else {
        toast.error("Failed to send OTP");
      }
      setLoading(false);
      return false;
    }
  };

  const verifyOTP = async (userOTP) => {
    setLoading(true);
    const verified = await VerifyOTPModule.verifyOTP(userOTP, systemOTP);
    if (verified) {
      setLoading(false);
      return true;
    } else {
      toast.error("OTP is incorrect");
      setLoading(false);
      return false;
    }
  };

  return { updateProfile, loading, getOTP, verifyOTP };
};

export default useUpdate;
