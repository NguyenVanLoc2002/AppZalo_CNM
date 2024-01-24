import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import "./style.css";

import ChatComponent from "./src/components/ChatComponent";
import Chat from "./src/components/Chat";
import Login from "./src/LoginComponents/Login";
import CreateAccount from "./src/LoginComponents/CreateAccount";
import CreateAccount1 from "./src/LoginComponents/CreateAccount1";
import EnterAuthCode from "./src/LoginComponents/EnterAuthCode";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName="ChatComponent">
        <Stack.Screen name="ChatComponent" component={ChatComponent}
        options={{ headerShown: false }}
        />        
        <Stack.Screen name="ChatContent" component={Chat} />       
      </Stack.Navigator> */}
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
