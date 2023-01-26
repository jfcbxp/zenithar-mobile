import { createStackNavigator } from "@react-navigation/stack";
import PasswordRecovery from "../pages/PasswordRecovery";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import { StackParams } from "../types/stack.params";

export default function AuthRoutes() {
  const Stack = createStackNavigator<StackParams>();
  return (
      <Stack.Navigator>
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ headerShown: false }} />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            title: 'Seus dados',
            headerTransparent: true
          }} />
        <Stack.Screen
          name="PasswordRecovery"
          component={PasswordRecovery}
          options={{
            title: 'Recuperação de senha',
            headerTransparent: true
          }} />
      </Stack.Navigator>
  )
}