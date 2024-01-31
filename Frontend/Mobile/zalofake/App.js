import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import "./style.css";

import CreateAccount from "./src/LoginComponents/CreateAccount";
import CreateAccount1 from "./src/LoginComponents/CreateAccount1";
import EnterAuthCode from "./src/LoginComponents/EnterAuthCode";
import Login from "./src/LoginComponents/Login";

import SearchFriends from "./src/components/searchFriends/SearchFriends";
import Message from "./src/components/message/Message";
import FriendProfileSettings from "./src/components/friendProfile/FriendProfileSettings";
import MessageSettings from "./src/components/message/MessageSettings";
import FriendProfile from "./src/components/friendProfile/FriendProfile";
import AddFriends from "./src/components/AddFriends";
import CreateGroup from "./src/components/CreateGroup";
import LoginMain from "./src/LoginComponents/LoginMain"
import ChatComponent from "./src/components/ChatComponent";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginMain">
        <Stack.Screen
          name="LoginMain"
          component={LoginMain}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="CreateAccount"
          component={CreateAccount}
          options={{
            headerStyle: {
              backgroundColor: "#0091FF",
            },
            headerTintColor: "#fff",
            title: "Tạo tài khoản",
          }}
        />
        <Stack.Screen
          name="CreateAccount1"
          component={CreateAccount1}
          options={{
            headerStyle: {
              backgroundColor: "#0091FF",
            },
            headerTintColor: "#fff",
            title: "Tạo tài khoản",
          }}
        />
        <Stack.Screen
          name="EnterAuthCode"
          component={EnterAuthCode}
          options={{
            headerStyle: {
              backgroundColor: "#0091FF",
            },
            headerTintColor: "#fff",
            title: "Nhập mã xác thực",
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerStyle: {
              backgroundColor: "#0091FF",
            },
            headerTintColor: "#fff",
            title: "Đăng nhập",
          }}
        />

        <Stack.Screen name="SearchFriends" component={SearchFriends} />
        <Stack.Screen name="Message" component={Message} />
        <Stack.Screen
          name="FriendProfileSettings"
          component={FriendProfileSettings}
        />
        <Stack.Screen name="ChatComponent" component={ChatComponent} options={{
          headerShown: false
        }}/>
        <Stack.Screen name="MessageSettings" component={MessageSettings} />
        <Stack.Screen name="FriendProfile" component={FriendProfile} />
        <Stack.Screen name="AddFriends" component={AddFriends} />
        <Stack.Screen name="CreateGroup" component={CreateGroup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
