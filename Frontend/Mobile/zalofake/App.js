import Toast from "react-native-toast-message";
import { NavigationContainer } from "@react-navigation/native";
import Main from "./src/pages/RootComponent";
import { AuthContextProvider } from "./src/contexts/AuthContext";
import { SocketContextProvider } from "./src/contexts/SocketContext";

export default function App() {
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <SocketContextProvider>
          <Main />

        </SocketContextProvider>
      </AuthContextProvider>
      <Toast />
    </NavigationContainer>
  );
}
