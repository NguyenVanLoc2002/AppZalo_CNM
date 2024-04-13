import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

const useGroup = () => {
  const [group, setGroup] = useState(null);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);

  const createGroup = async (groupData) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/groups/create", groupData);
      console.log(response);
      const { data, status } = response;

      if (status === 201) {
        setGroup(data.group);
        return true;
      }
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getGroup = async (groupId) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/groups/get/${groupId}`);
      const { data, status } = response;

      if (status === 200) {
        setGroup(data.group);
      }
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getGroups = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/groups/all");
      const { data, status } = response;
      // console.log("data", data);

      if (status === 200) {
        setGroups(data);
      }
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { group,groups, loading, createGroup, getGroup, getGroups};
};

export default useGroup;
