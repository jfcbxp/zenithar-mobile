import { useContext } from "react";
import { ActivityIndicator, SafeAreaView } from "react-native";
import { AuthContext } from "../contexts/auth.provider";
import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";

export default function Routes() {
  const authContext = useContext(AuthContext);
  if (authContext.loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#131313" />
      </SafeAreaView>
    )
  } else {
    return (authContext.user && authContext.user.verified ? <AppRoutes /> : <AuthRoutes />)
  }
}