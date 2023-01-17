import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "../pages/SignIn";
import { StackParams } from "../types/stack.params";

export default function AuthRoutes() {
  const Stack = createStackNavigator<StackParams>();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}