import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

const useGroup = () => {
  const [group, setGroup] = useState(null);
  const [groups, setGroups] = useState([]);

  const createGroup = async (groupData) => {
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
    }
  };

  const getGroup = async (groupId) => {
    try {
      const response = await axiosInstance.get(`/groups/get/${groupId}`);
      const { data, status } = response;
      if (status === 200) {
        setGroup(data.group);
        return data
      }
    } catch (error) {
      console.error(error);
      return null
    }
  };

  const getGroups = async () => {
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
    }
  };

  const deleteGroup = async (groupId) => {
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
    }
  };



  const updateGroup = async (groupId, groupData) => {
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
    }
  };

  const addMember = async (groupId, members) => {
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
    }
  };

  const removeMember = async (groupId, memberData) => {
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
    }
  };
  const leaveGroup = async (groupId) => {
    try {
      const response = await axiosInstance.post(
        `/groups/leave/${groupId}`
      );
      const { data, status } = response;
      if (status === 200) {
        setGroup(data.group);
        return true;
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const { members, typeChange, groupId } = req.body;
  const addAdmin = async (groupData) => {
    try {
      const response = await axiosInstance.post(`/groups/changeAdmins`,
        groupData
        // {
        //   members:members,
        //   typeChange:typeChange,
        //   groupId:groupId,
        // }
      );

      if (response.status === 200) {
        return true;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    group,
    groups,
    createGroup,
    getGroup,
    getGroups,
    deleteGroup,
    updateGroup,
    addMember,
    removeMember,
    leaveGroup,
    addAdmin
  };
};

export default useGroup;
