import { StackParams } from "../types/stack.params";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "../pages/SignIn";

export default function AppRoutes() {
  const Stack = createStackNavigator<StackParams>();
  return (
    <Stack.Navigator>
    </Stack.Navigator>
  )
}