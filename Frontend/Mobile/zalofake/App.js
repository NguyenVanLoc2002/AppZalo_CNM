import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import "./style.css";

import ChatComponent from "./src/components/ChatComponent";
import Chat from "./src/components/Chat";
import Info from "./src/components/Info";
import News from "./src/components/News";
import Notice from "./src/NewsComponents/Notice"
import PostStatus from "./src/NewsComponents/PostStatus";
import PersonalPage from "./src/InfoComponents/PersonalPage";
import PersonalDetail from "./src/InfoComponents/PersonalDetail";
import PersonalPrivacy from "./src/InfoComponents/PersonalPrivacy";
import AccountVsSecurity from "./src/InfoComponents/AccoutVsSecurity";
import PersonalSetting from "./src/InfoComponents/PersonalSetting";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ChatComponent">
        <Stack.Screen name="ChatComponent" component={ChatComponent}
        options={{ headerShown: false }}
        />        
        <Stack.Screen name="ChatContent" component={Chat} />   
        <Stack.Screen name="News" component={News}/> 
        <Stack.Screen name="Notice" component={Notice}/> 
        <Stack.Screen name="PostStatus" component={PostStatus} />
        <Stack.Screen name="Info" component={Info}/> 
        <Stack.Screen name="PersonalPage" component={PersonalPage}/> 
        <Stack.Screen name="PersonalDetail" component={PersonalDetail}/> 
        <Stack.Screen name="PersonalPrivacy" component={PersonalPrivacy}/> 
        <Stack.Screen name="AccountVsSecurity" component={AccountVsSecurity}/> 
        <Stack.Screen name="PersonalSetting" component={PersonalSetting}/> 

      </Stack.Navigator>
    </NavigationContainer>
  );
}
