import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, Platform } from "react-native";
import "react-native-gesture-handler";
import AuthProvider from "./src/contexts/auth.provider";
import Routes from "./src/routes";
import { NavigationContainer } from "@react-navigation/native";
import * as serviceWorkerRegistration from "./src/services/serviceWorkerRegistration";
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <AuthProvider>
          <Routes />
          <StatusBar style="light" translucent={false} />
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212A4D",
  },
});

if (Platform.OS === "web") {
  serviceWorkerRegistration.register();
}
