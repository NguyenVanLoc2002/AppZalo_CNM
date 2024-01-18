import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import "./style.css";

import ChatComponent from "./src/components/ChatComponent";
import Chat from "./src/components/Chat";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ChatComponent">
        <Stack.Screen name="ChatComponent" component={ChatComponent}
        options={{ headerShown: false }}
        />        
        <Stack.Screen name="ChatContent" component={Chat} />       
      </Stack.Navigator>
    </NavigationContainer>
  );
}
