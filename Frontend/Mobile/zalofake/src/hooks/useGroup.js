import axiosInstance from "../api/axiosInstance";
import { useState } from "react";
const useGroup = () => {

  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  const getGroups = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/groups/all");
      const { data, status } = response;
      if (status === 200) {
        setGroups(data);
      }
    } catch (error) {
      console.error(error);
    //   throw error;
    } finally {
      setLoading(false);
    }
  };


  return { groups, getGroups }
}

export default useGroup;