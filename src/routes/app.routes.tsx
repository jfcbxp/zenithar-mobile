import { StackParams } from "../types/stack.params";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../pages/Home";
import Discount from "../pages/Discount";
import DiscountConfirmation from "../pages/Discount/Confirmation";

export default function AppRoutes() {
  const Stack = createStackNavigator<StackParams>();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="Discount"
        options={{ title: "Desconto" }}
        component={Discount}
      />
      <Stack.Screen
        name="DiscountConfirmation"
        options={{ title: "Confirmação de Desconto" }}
        component={DiscountConfirmation}
      />
    </Stack.Navigator>
  );
}
