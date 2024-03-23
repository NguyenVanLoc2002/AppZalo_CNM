import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import RegisterName from "./src/components/LoginComponents/RegisterName";
import RegisterInfo from "./src/components/LoginComponents/RegisterInfo";
import EnterAuthCode from "./src/components/LoginComponents/EnterAuthCode";
import Login from "./src/components/LoginComponents/Login";

import SearchFriends from "./src/components/ChatComponents/searchFriends/SearchFriends";
import Message from "./src/components/ChatComponents/message/Message";
import FriendProfileSettings from "./src/components/ChatComponents/friendProfile/FriendProfileSettings";
import MessageSettings from "./src/components/ChatComponents/message/MessageSettings";
import FriendProfile from "./src/components/ChatComponents/friendProfile/FriendProfile";
import AddFriends from "./src/components/ChatComponents/AddFriends";
import CreateGroup from "./src/components/ChatComponents/CreateGroup";
import LoginMain from "./src/components/LoginComponents/LoginMain";
import MainComponent from "./src/MainComponent";
import Chat from "./src/components/ChatComponents/chat/Chat";
import Info from "./src/components/InfoComponents/Info";
import News from "./src/components/NewsComponents/News";
import Notice from "./src/components/NewsComponents/Notice";
import PostStatus from "./src/components/NewsComponents/PostStatus";
import PersonalPage from "./src/components/InfoComponents/PersonalPage";
import PersonalDetail from "./src/components/InfoComponents/PersonalDetail";
import PersonalPrivacy from "./src/components/InfoComponents/PersonalPrivacy";
import AccountVsSecurity from "./src/components/InfoComponents/AccoutVsSecurity";
import PersonalSetting from "./src/components/InfoComponents/PersonalSetting";

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
          name="RegisterName"
          component={RegisterName}
          options={{
            headerStyle: {
              backgroundColor: "#0091FF",
            },
            headerTintColor: "#fff",
            title: "Tạo tài khoản",
          }}
        />
        <Stack.Screen
          name="RegisterInfo"
          component={RegisterInfo}
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
        <Stack.Screen
          name="ChatComponent"
          component={MainComponent}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="MessageSettings" component={MessageSettings} />
        <Stack.Screen name="FriendProfile" component={FriendProfile} />
        <Stack.Screen name="AddFriends" component={AddFriends} />
        <Stack.Screen name="CreateGroup" component={CreateGroup} />

        <Stack.Screen name="ChatContent" component={Chat} />
        <Stack.Screen name="News" component={News} />
        <Stack.Screen name="Notice" component={Notice} />
        <Stack.Screen name="PostStatus" component={PostStatus} />
        <Stack.Screen name="Info" component={Info} />
        <Stack.Screen name="PersonalPage" component={PersonalPage} />
        <Stack.Screen name="PersonalDetail" component={PersonalDetail} />
        <Stack.Screen name="PersonalPrivacy" component={PersonalPrivacy} />
        <Stack.Screen name="AccountVsSecurity" component={AccountVsSecurity} />
        <Stack.Screen name="PersonalSetting" component={PersonalSetting} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
