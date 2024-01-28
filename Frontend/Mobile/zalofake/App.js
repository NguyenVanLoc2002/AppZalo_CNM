import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from "@expo/vector-icons";

import "./style.css";

import ChatComponent from "./src/components/ChatComponent";
import Chat from "./src/components/Chat";
import LoginMain from "./src/LoginComponents/LoginMain"
import CreateAccount from "./src/LoginComponents/CreateAccount"
import CreateAccount1 from "./src/LoginComponents/CreateAccount1"
import EnterAuthCode from "./src/LoginComponents/EnterAuthCode"
import Login from "./src/LoginComponents/Login"
import FriendDirectory from "./src/DirectoryComponents/FriendDirectory"
import GroupDirectory from "./src/DirectoryComponents/GroupDirectory"
import QA from "./src/DirectoryComponents/QA"
import DirectoryComponents from "./src/DirectoryComponents/DirectoryComponents"
import { Pressable, Image, Text } from "react-native";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* Screen Chat */}

      {/* <Stack.Navigator initialRouteName="ChatComponent">
        <Stack.Screen name="ChatComponent" component={ChatComponent}
        options={{ headerShown: false }}
        />        
        <Stack.Screen name="ChatContent" component={Chat} />       
      </Stack.Navigator> */}

      {/* 3 Screen Danh bạ */}

      {/* <Stack.Navigator initialRouteName="DirectoryComponents">
        <Stack.Screen name="DirectoryComponents" component={DirectoryComponents}
          options={{
            headerStyle: { backgroundColor: '#0091FF' },
            title: 'Tìm kiếm',
            headerTitleAlign: 'left',
            headerTitleStyle: {
              fontSize: 16,
              color: '#fff'
            },
            headerLeft: () => (
              <Pressable
                className = {"ml-2"}
                onPress={() => {
                  // Xử lý sự kiện khi nhấn vào nút search
                }}> <Ionicons name={"search-sharp"} size={30} color={"#fff"} />
              </Pressable>

            ),
            headerRight: () => (
              <Pressable
              className = {"mr-2"}
                onPress={() => {
                  // Xử lý sự kiện khi nhấn vào add
                }}> <Ionicons name={"person-add"} size={30} color={"#fff"} />
              </Pressable>

            ),
            
           

          }}
        />

      </Stack.Navigator> */}

      {/* 6 Screen Login */}

      <Stack.Navigator initialRouteName="LoginMain">
        <Stack.Screen name="LoginMain" component={CreateAccount} options={{ headerShown: false }} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} options={{
          headerStyle: {
            backgroundColor: '#0091FF',
          },
          headerTintColor: '#fff',
          title: 'Tạo tài khoản'
        }} />
        <Stack.Screen name="CreateAccount1" component={CreateAccount1} options={{
          headerStyle: {
            backgroundColor: '#0091FF',

          },
          headerTintColor: '#fff',
          title: 'Tạo tài khoản'
        }} />
        <Stack.Screen name="EnterAuthCode" component={EnterAuthCode} options={{
          headerStyle: {
            backgroundColor: '#0091FF',

          },
          headerTintColor: '#fff',
          title: 'Nhập mã xác thực'
        }} />
        <Stack.Screen name="Login" component={Login} options={{
          headerStyle: {
            backgroundColor: '#0091FF',

          },
          headerTintColor: '#fff',
          title: 'Đăng nhập'
        }} />

       

      </Stack.Navigator>
    </NavigationContainer>
  );
}

