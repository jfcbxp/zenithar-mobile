import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import AuthProvider from "./src/contexts/auth.provider";
import Routes from "./src/routes";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <SafeAreaView>
          <StatusBar style="auto" />
          <Routes />
        </SafeAreaView>
      </AuthProvider>
    </NavigationContainer>
  );
}
