import { useContext } from "react";
import { ActivityIndicator, View } from "react-native";
import { AuthContext } from "../contexts/auth.provider";
import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";

const Routes = () => {
  const authContext = useContext(AuthContext);
  if (authContext.loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#131313" />
      </View>
    );
  } else {
    return authContext.user ? <AppRoutes /> : <AuthRoutes />;
  }
};

export default Routes;
