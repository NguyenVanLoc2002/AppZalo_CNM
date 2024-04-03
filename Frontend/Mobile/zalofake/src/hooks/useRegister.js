
import { useState } from "react";
import Toast from "react-native-toast-message";
import OTPTextView from 'react-native-otp-textinput';
import axiosInstance from "../api/axiosInstance";



const useRegister = () => {


    const [isLoading, setIsLoading] = useState(false);
    const [systemOTP, setSystemOTP] = useState(null);
    const [isOTPVerified, setIsOTPVerified] = useState(false);

    const showToastSuccess = (notice) => {
        Toast.show({
          text1: notice,
          type: "success",
          topOffset: 0,
          position: "top",
        });
      };
      const showToastError = (notice) => {
        Toast.show({
          text1: notice,
          type: "error",
          topOffset: 0,
          position: "top",
        });
      };


    const verifyOTP = async (userOTP, systemOTP) => {
        if (userOTP === systemOTP.otp && systemOTP.expires >= Date.now()) {
            return true;
        } else {
            return false;
        }
    };

    const sendOTP = async (email) => {
        const response = await axiosInstance.post("/auth/send-otp", {
            email,
        });
        const data = response.data;
        return data.totp;
    };

    const getOTP = async (email) => {
        try {
            setIsLoading(true);
            setIsOTPVerified(false);
            const otp = await sendOTP(email);

            if (otp) {
                showToastSuccess("OTP sent to your email");
                setIsLoading(false);
                setSystemOTP(otp);
                return true;
            } else {
                showToastError("Failed to send OTP");
                setIsLoading(false);
                return false;
            }
        } catch (error) {
            console.log(error);
            showToastError("Failed to send OTP");
            setIsLoading(false);
            return false;
        }
    };

    const verifyEmailAndRegister = async (
        textEmail,
        otp,
        textPhone,
        name,
        dob,
        selectedGender,
        textPW
    ) => {
        const verified = await verifyOTP(otp, systemOTP);
        setIsOTPVerified(verified);
        try {
            setIsLoading(true);
            if (verified) {
                const response = await axiosInstance.post("/auth/register", {
                    phone: textPhone,
                    email: textEmail,
                    password: textPW,
                    name: name,
                    dob: dob,
                    gender: selectedGender.toString(),
                    userOTP: otp
                });
                setIsOTPVerified(true);
                const data = response.data;
                console.log(data);

                if (response.status === 201) {
                    setIsLoading(false);
                    showToastSuccess("Account created successfully");
                    return true;
                } else {
                    setIsLoading(false);
                    showToastError(data.response.message);
                    return false;
                }
            } else {
                showToastError("Invalid OTP");
                setIsLoading(false);
                return false;
            }
        } catch (error) {
            console.log(error);
            setIsOTPVerified(true);
            setIsLoading(false);
            showToastError(error.response.data.message);
            return false;
        }
    };

   

    return { isLoading, isOTPVerified, getOTP, verifyEmailAndRegister, showToastError,showToastSuccess };
};


export default useRegister;
