import { createNativeStackNavigator } from "@react-navigation/native-stack";

import RegisterName from "../components/LoginComponents/RegisterName";
import RegisterInfo from "../components/LoginComponents/RegisterInfo";
import EnterAuthCode from "../components/LoginComponents/EnterAuthCode";
import Login from "../components/LoginComponents/Login";
import { useAuthContext } from "../contexts/AuthContext";

import SearchFriends from "../components/ChatComponents/searchFriends/SearchFriends";
import Message from "../components/ChatComponents/message/Message";
import FriendProfileSettings from "../components/ChatComponents/friendProfile/FriendProfileSettings";
import MessageSettings from "../components/ChatComponents/message/MessageSettings";
import FriendProfile from "../components/ChatComponents/friendProfile/FriendProfile";
import AddFriends from "../components/ChatComponents/AddFriends";
import CreateGroup from "../components/ChatComponents/CreateGroup";
import LoginMain from "../components/LoginComponents/LoginMain";
import MainComponent from "../pages/MainComponent";
import Chat from "../components/ChatComponents/chat/Chat";
import Info from "../components/InfoComponents/Info";
import News from "../components/NewsComponents/News";
import Notice from "../components/NewsComponents/Notice";
import PostStatus from "../components/NewsComponents/PostStatus";
import PersonalPage from "../components/InfoComponents/PersonalPage";
import PersonalDetail from "../components/InfoComponents/PersonalDetail";
import PersonalPrivacy from "../components/InfoComponents/PersonalPrivacy";
import AccountVsSecurity from "../components/InfoComponents/AccoutVsSecurity";
import PersonalSetting from "../components/InfoComponents/PersonalSetting";

const Stack = createNativeStackNavigator();

export default function RootComponent() {
  const { authUser } = useAuthContext();

  return authUser ? (
    <Stack.Navigator initialRouteName="ChatComponent">
      <Stack.Screen
        name="ChatComponent"
        component={MainComponent}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen name="SearchFriends" component={SearchFriends} />
      <Stack.Screen name="Message" component={Message} />
      <Stack.Screen
        name="FriendProfileSettings"
        component={FriendProfileSettings}
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
  ) : (
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
    </Stack.Navigator>
  );
}
