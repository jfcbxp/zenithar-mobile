import React from "react";
import renderer, { act } from "react-test-renderer";
import { Button } from "../../components/buttons/button";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParams } from "../../types/stack.params";
import { RouteProp, useNavigation } from "@react-navigation/native";
import Discount from ".";
import { ItemsDropdown } from "../../components/dropdowns/discount/items-dropdown";
import { PaymentMethodDropdown } from "../../components/dropdowns/discount/payment-method-dropdown";
import { Pressable } from "react-native";

describe("Discount test", () => {
  const navigation =
    useNavigation<StackNavigationProp<StackParams, "Discount">>();
  const route = useNavigation<RouteProp<StackParams, "Discount">>();
  const mockNavigation = {
    navigation: navigation,
    route: route,
  };

  const rendered = renderer.create(
    <Discount
      navigation={mockNavigation.navigation}
      route={mockNavigation.route}
    />
  );

  it("test Discount Dropdowns", async () => {
    const itemsDropdown = rendered.root.findByType(ItemsDropdown);
    const paymentMethodDropdown = rendered.root.findByType(
      PaymentMethodDropdown
    );
    const button = rendered.root.findByType(Button);

    await act(() => button.props.onPress());

    expect(itemsDropdown).toBeTruthy();
    expect(paymentMethodDropdown).toBeTruthy();
  });

  it("test Discount ItemsDropdown with Pressable", async () => {
    const itemsDropdown = rendered.root.findByType(ItemsDropdown);

    const pressable = itemsDropdown.findByType(Pressable);

    const icon = itemsDropdown.findAllByProps({ testID: "icon" })[0];
    expect(icon.props.name).toBe("chevron-down");

    await act(() => pressable.props.onPress());

    expect(icon.props.name).toBe("chevron-up");
  });

  it("test Discount PaymentMethodDropdown with Pressable", async () => {
    const paymentMethodDropdown = rendered.root.findByType(
      PaymentMethodDropdown
    );

    const pressable = paymentMethodDropdown.findByType(Pressable);

    const icon = paymentMethodDropdown.findAllByProps({ testID: "icon" })[0];
    expect(icon.props.name).toBe("chevron-down");

    await act(() => pressable.props.onPress());

    expect(icon.props.name).toBe("chevron-up");
  });
});
