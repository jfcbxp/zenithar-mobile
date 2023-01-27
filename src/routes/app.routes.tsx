import { StackParams } from "../types/stack.params";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../pages/Home";
import Discount from "../pages/Discount";

export default function AppRoutes() {
  const Stack = createStackNavigator<StackParams>();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Home"
        component={Home} />
      <Stack.Screen
        name="Discount"
        component={Discount} />
    </Stack.Navigator >
  )
}