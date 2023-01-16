import { StatusBar } from "expo-status-bar";
import 'react-native-gesture-handler';
import AuthProvider from "./src/contexts/auth.provider";
import Routes from "./src/routes";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Routes />
        <StatusBar style="auto" />
      </AuthProvider>
    </NavigationContainer>
  )
}
