import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { AuthContextProvider } from "./src/contexts/AuthContext";
import Main from "./RootComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  // const clearAsync = async () => {
  //   // console.log(AsyncStorage.getAllKeys());
  //   await AsyncStorage.clear();
  // };
  // clearAsync();
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <Main />
      </AuthContextProvider>
      <Toast />
    </NavigationContainer>
  );
}
