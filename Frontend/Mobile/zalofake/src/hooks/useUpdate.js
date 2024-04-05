import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { Alert } from "react-native";
import axiosInstance from "../api/axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useUpdate = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const updateAvatar = async (formData) => {
    setLoading(true);
    console.log(formData);
    try {
      // if (!authToken) {
      //   throw new Error("Authentication token not found");
      // }

      const formData = new FormData();
      formData.append("avatar", file);

      const response = await axiosInstance.post(
        "/users/upload-avatar",
        formData
        // {
        //   headers: {
        //     Authorization: `Bearer ${authToken}`,
        //     "Content-Type": "multipart/form-data",
        //   },
        // }
      );
      console.log(response);
      // const { data, status } = response;

      // if (status === 200) {
      //   const { avatar } = data;
      //   if (avatar) {
      //     // Lưu trữ thông tin avatar vào AsyncStorage
      //     await AsyncStorage.setItem("avatar", avatar);
      //     Alert.alert("Success", "Avatar updated successfully"); // Sửa: Sử dụng Alert thay vì toast
      //   } else {
      //     throw new Error("Failed to update avatar");
      //   }
      // } else {
      //   throw new Error(data.message || "Failed to update avatar");
      // }
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Error",
        error.message || "Failed to update avatar! Please try again."
      ); // Sửa: Sử dụng Alert thay vì toast
    } finally {
      setLoading(false);
    }
  };

  const updateBackground = async (file, authToken) => {
    setLoading(true);
    try {
      if (!authToken) {
        throw new Error("Authentication token not found");
      }

      const formData = new FormData();
      formData.append("background", file);

      const response = await axiosInstance.post(
        "/users/upload-background",
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { data, status } = response;

      if (status === 200) {
        const { background } = data;
        if (background) {
          // Lưu trữ thông tin background vào AsyncStorage
          await AsyncStorage.setItem("background", background);
          Alert.alert("Success", "Background updated successfully"); // Sửa: Sử dụng Alert thay vì toast
        } else {
          throw new Error("Failed to update background");
        }
      } else {
        throw new Error(data.message || "Failed to update background");
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Error",
        error.message || "Failed to update background! Please try again."
      ); // Sửa: Sử dụng Alert thay vì toast
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (name, email, gender, dob) => {
    setLoading(true);
    try {
      console.log(name, email, gender, dob);
      const response = await axiosInstance.post("/users/update-profile", {
        name,
        email,
        gender,
        dob,
      });

      const { data, status } = response;

      if (status === 200) {
        const { user } = data;
        if (user) {
          await AsyncStorage.setItem("user", JSON.stringify(user));
          setAuthUser(user);
          Alert.alert("Success", "Profile updated successfully");
        } else {
          throw new Error("Failed to update profile");
        }
      } else {
        throw new Error(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("error: ", error);
      Alert.alert(
        "Error",
        error.response?.data?.message ||
          "Failed to update profile! Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return { updateProfile, updateAvatar, loading };
};

export default useUpdate;