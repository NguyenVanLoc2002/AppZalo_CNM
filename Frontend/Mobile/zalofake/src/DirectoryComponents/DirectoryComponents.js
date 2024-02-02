import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons } from "@expo/vector-icons";

import FriendDirectory from "./FriendDirectory";
import GroupDirectory from "./GroupDirectory";
import OA from "./OA";

const Tab = createMaterialTopTabNavigator();

const DirectoryComponents = () => {
  return (
    <Tab.Navigator initialRouteName="Bạn bè" tabBarPosition="top">
      <Tab.Screen name="Bạn bè" component={FriendDirectory} />
      <Tab.Screen name="Nhóm" component={GroupDirectory} />
      <Tab.Screen name="OA" component={OA} />
    </Tab.Navigator>
  );
};

export default DirectoryComponents;
