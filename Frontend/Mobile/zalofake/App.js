import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import "./style.css";

import ChatComponent from "./src/components/ChatComponent";
import Chat from "./src/components/chat/Chat";
import SearchFriends from "./src/components/searchFriends/SearchFriends";
import Message from "./src/components/message/Message";
import FriendProfileSettings from "./src/components/friendProfile/FriendProfileSettings";
import MessageSettings from "./src/components/message/MessageSettings";
import FriendProfile from "./src/components/friendProfile/FriendProfile";
import AddFriends from "./src/components/AddFriends";
import CreateGroup from "./src/components/CreateGroup";



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ChatComponent">
        <Stack.Screen name="ChatComponent" component={ChatComponent}
        options={{ headerShown: false }}/>        
        <Stack.Screen name="ChatContent" component={Chat} />       
        <Stack.Screen name="SearchFriends" component={SearchFriends} />       
        <Stack.Screen name="Message" component={Message} />       
        <Stack.Screen name="FriendProfileSettings" component={FriendProfileSettings} />       
        <Stack.Screen name="MessageSettings" component={MessageSettings} />       
        <Stack.Screen name="FriendProfile" component={FriendProfile} />       
        <Stack.Screen name="AddFriends" component={AddFriends} />       
        <Stack.Screen name="CreateGroup" component={CreateGroup} />       
      </Stack.Navigator>
    </NavigationContainer>
  );
}
