const jwt = require("jsonwebtoken");
const Conversation = require("../models/Conversation");
const Group = require("../models/Group");
const User = require("../models/User");
const { io, getReciverSocketId } = require("../socket/socket.io");
const cloudinary = require("../configs/Cloudinary.config");
const mongoose = require("mongoose");
const Chats = require("../models/Chat");

exports.createGroup = async (req, res) => {
  try {
    const { name, members } = req.body;
    const token = req.headers.authorization.split(" ")[1];
    const uid = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(uid.user_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }
    if (!members || members.length < 2) {
      return res.status(400).json({ error: "Members is required" });
    }
    members.push(uid.user_id);

    const conversation = await Conversation.create({
      participants: members,
      tag: "group",
    });

    const group = await Group.create({
      groupName: name,
      avatar: {
        url: "https://res.cloudinary.com/dq3pxd9eq/image/upload/group_avatar.jpg",
        public_id: "group_avatar",
      },
      conversation: conversation._id,
      createBy: uid.user_id,
    });

    const initLastMessage = new Chats({
      senderId: uid.user_id,
      receiverId: group._id,
      type: "text",
      contents: [{ data: `Welcome to ${name} group`, type: "text" }],
      isGroup: true,
    });

    await initLastMessage.save();

    conversation.lastMessage = initLastMessage._id;
    await conversation.save();

    const returnGroup = await Group.findById(group._id).populate([
      { path: "conversation" },
      { path: "createBy", select: "profile.name" },
    ]);

    members.forEach(async (member) => {
      const memderSocketId = await getReciverSocketId(member);
      if (memderSocketId) {
        io.to(memderSocketId.socket_id).emit("add-to-group", {
          group: returnGroup,
        });
      }
    });

    return res.status(201).json({ group: returnGroup });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.getGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const group = await Group.findById(groupId).populate([
      { path: "conversation" },
      { path: "createBy", select: "profile.name" },
    ]);
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }
    return res.status(200).json(group);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.getAllGroup = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);

    const groups = await Group.aggregate([
      {
        $lookup: {
          from: "conversations",
          localField: "conversation",
          foreignField: "_id",
          as: "conversation",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "createBy",
          foreignField: "_id",
          as: "createBy",
        },
      },
      {
        $unwind: "$conversation",
      },
      {
        $lookup: {
          from: "chats",
          localField: "conversation.lastMessage",
          foreignField: "_id",
          as: "lastMessage",
        },
      },
      {
        $unwind: "$lastMessage",
      },
      {
        $match: {
          "conversation.participants": {
            $in: [new mongoose.Types.ObjectId(user.user_id)],
          },
        },
      },

      {
        $project: {
          groupName: 1,
          avatar: 1,
          createBy: {
            $arrayElemAt: [
              {
                $map: {
                  input: "$createBy",
                  as: "creator",
                  in: {
                    profile: "$$creator.profile",
                    _id: "$$creator._id",
                  },
                },
              },
              0,
            ],
          },
          conversation: 1,
          lastMessage: 1,
        },
      },
    ]);

    return res.status(200).json(groups);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.updateGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { name } = req.body;
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }
    if (name) {
      group.groupName = name;
    }
    if (req.file) {
      if (group.avatar.public_id) {
        await cloudinary.uploader.destroy(group.avatar.public_id);
      }
      const result = await cloudinary.uploader.upload(req.file.path);
      group.avatar.url = result.secure_url;
      group.avatar.public_id = result.public_id;
    }
    await group.save();
    return res.status(200).json(group);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.deleteGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const token = req.headers.authorization.split(" ")[1];
    const uid = jwt.verify(token, process.env.JWT_SECRET);

    const group = await Group.findById(groupId).populate("conversation");
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }
    if (group.createBy.toString() !== uid.user_id) {
      return res.status(403).json({ error: "You are not authorized" });
    }

    await group.deleteOne();
    group.conversation.participants.forEach(async (member) => {
      const memderSocketId = await getReciverSocketId(member);
      if (memderSocketId) {
        io.to(memderSocketId.socket_id).emit("delete-group", {
          group: {
            id: group._id,
            name: group.groupName,
          },
        });
      }
    });
    await Conversation.findByIdAndDelete(group.conversation);

    return res.status(200).json({ message: "Group deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.addMember = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { members } = req.body;
    const group = await Group.findById(groupId).populate([
      { path: "conversation" },
      { path: "createBy", select: "profile _id" },
    ]);
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }
    if (!members || members.length < 1) {
      return res.status(400).json({ error: "Members is required" });
    }

    const newMembers = [];
    const existMembers = [];
    members.forEach(async (member) => {
      if (group.conversation.participants.includes(member)) {
        existMembers.push(member);
      } else {
        newMembers.push(member);
        group.conversation.participants.push(member);
      }
    });

    const message = [];
    if (existMembers.length > 0) {
      const memberInfoPromises = existMembers.map(async (member) => {
        const memberInfo = await User.findById(member).select(
          "profile.name -_id"
        );
        return memberInfo.profile.name;
      });

      const memberNames = await Promise.all(memberInfoPromises);

      memberNames.forEach((name) => {
        message.push(`Member ${name} already in group. `);
      });
    }

    if (newMembers.length > 0) {
      const memberInfoPromises = newMembers.map(async (member) => {
        const memberInfo = await User.findById(member).select(
          "profile.name -_id"
        );
        return memberInfo.profile.name;
      });
      const memberNames = await Promise.all(memberInfoPromises);

      memberNames.forEach((name) => {
        message.push(`Member ${name} added to group. `);
      });
    }

    group.conversation.participants.forEach(async (member) => {
      const memderSocketId = await getReciverSocketId(member);
      if (memderSocketId) {
        io.to(memderSocketId.socket_id).emit("add-to-group", {
          group, addMembers: members,
        });
      }
    });

    await group.conversation.save();

    return res.status(200).json({ message, group });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.removeMember = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { members } = req.body;
    const token = req.headers.authorization.split(" ")[1];
    const uid = jwt.verify(token, process.env.JWT_SECRET);

    const group = await Group.findById(groupId).populate("conversation");
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }
    if (group.createBy.toString() !== uid.user_id) {
      return res.status(403).json({ error: "You are not authorized" });
    }
    if (!members || members.length < 1) {
      return res.status(400).json({ error: "Members is required" });
    }

    members.map(async (member) => {
      if (group.conversation.participants.includes(member)) {
        return (group.conversation.participants =
          group.conversation.participants.filter(
            (p) => p.toString() !== member
          ));
      }
    });

    group.conversation.participants.forEach(async (member) => {
      const memderSocketId = await getReciverSocketId(member);
      if (memderSocketId) {
        io.to(memderSocketId.socket_id).emit("remove-from-group", {
          group: {
            id: group._id,
            name: group.groupName,
            removeMembers: members,
          },
        });
      }
    });

    if (group.conversation.participants.length <= 2) {
      return res.status(400).json({
        error: "Group must have at least 2 members",
      });
    }

    await group.conversation.save();
    return res.status(200).json(group);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
