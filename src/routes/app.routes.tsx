import { StackParams } from "../types/stack.params";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../pages/Home";
import Discount from "../pages/Discount";

export default function AppRoutes() {
  const Stack = createStackNavigator<StackParams>();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }} />
      <Stack.Screen
        name="Discount"
        component={Discount}
        options={{
          title: '',
          headerTransparent: true,
          headerTintColor: 'white',
        }} />
    </Stack.Navigator>
  )
}