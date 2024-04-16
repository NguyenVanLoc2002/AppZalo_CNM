import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

const useGroup = () => {
  const [group, setGroup] = useState(null);
  const [groups, setGroups] = useState([]);
  const [grLoading, setGrLoading] = useState(false);

  const createGroup = async (groupData) => {
    setGrLoading(true);
    try {
      const response = await axiosInstance.post("/groups/create", groupData);
      console.log(response);
      const { data, status } = response;

      if (status === 201) {
        setGroup(data.group);
        setGrLoading(false);
        return true;
      }
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setGrLoading(false);
    }
  };

  const getGroup = async (groupId) => {
    setGrLoading(true);
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
      setGrLoading(false);
    }
  };

  const getGroups = async () => {
    setGrLoading(true);
    try {
      const response = await axiosInstance.get("/groups/all");
      const { data, status } = response;
      if (status === 200) {
        setGroups(data);
      }
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setGrLoading(false);
    }
  };

  const deleteGroup = async (groupId) => {
    setGrLoading(true);
    try {
      const response = await axiosInstance.delete(`/groups/delete/${groupId}`);
      const { status } = response;

      if (status === 200) {
        return true;
      }
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setGrLoading(false);
    }
  };

  const updateGroup = async (groupId, groupData) => {
    setGrLoading(true);
    try {
      const response = await axiosInstance.put(
        `/groups/update/${groupId}`,
        groupData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Header cần thiết khi gửi dữ liệu dưới dạng multipart/form-data
          },
        }
      );
      if (response.status === 200) {
        return true;
      }
    } catch (error) {

      console.log('1')
      console.error(error);
      return false;
      // throw error;
    } finally {
      setGrLoading(false);
    }
  };

  const addMember = async (groupId, members) => {
    setGrLoading(true);
    console.log(groupId);
    console.log(members)
    try {
      const response = await axiosInstance.post(
        `/groups/addMembers/${groupId}`,
        members
      );
      const { data, status } = response;

      if (status === 200) {
        setGroup(data.group);
        return data.message;
      }
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setGrLoading(false);
    }
  };

  const removeMember = async (groupId, memberData) => {
    setGrLoading(true);
    try {
      const response = await axiosInstance.post(
        `/groups/removeMembers/${groupId}`,
        memberData
      );
      const { data, status } = response;
      if (status === 200) {
        setGroup(data.group);
        return true;
      }
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setGrLoading(false);
    }
  };

  return {
    group,
    groups,
    grLoading,
    createGroup,
    getGroup,
    getGroups,
    deleteGroup,
    updateGroup,
    addMember,
    removeMember,
  };
};

export default useGroup;
