import { StackParams } from "../types/stack.params";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "../pages/SignIn";

const AppRoutes = () => {
  const Stack = createStackNavigator<StackParams>();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppRoutes;
