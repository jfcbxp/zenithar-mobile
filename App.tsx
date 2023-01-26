import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView } from "react-native";
import 'react-native-gesture-handler';
import AuthProvider from "./src/contexts/auth.provider";
import Routes from "./src/routes";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <AuthProvider>
          <Routes />
          <StatusBar style="light" translucent={false} />
        </AuthProvider>
      </SafeAreaView>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212A4D",
  },
})