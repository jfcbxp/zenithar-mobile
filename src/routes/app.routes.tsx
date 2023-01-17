import { StackParams } from "../types/stack.params";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../pages/Home";

export default function AppRoutes() {
  const Stack = createStackNavigator<StackParams>();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}