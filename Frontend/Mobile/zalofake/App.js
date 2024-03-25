import Toast from "react-native-toast-message";
import { NavigationContainer } from "@react-navigation/native";
import Main from "./src/pages/RootComponent";
import { AuthContextProvider } from "./src/contexts/AuthContext";

export default function App() {
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <Main />
      </AuthContextProvider>
      <Toast />
    </NavigationContainer>
  );
}
