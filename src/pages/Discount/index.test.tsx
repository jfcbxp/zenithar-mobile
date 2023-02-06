import React from "react";
import renderer, { act } from "react-test-renderer";
import { Button } from "../../components/buttons/button";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParams } from "../../types/stack.params";
import { RouteProp, useNavigation } from "@react-navigation/native";
import Discount from ".";
import { HeaderDropdown } from "../../components/dropdowns/discount/header-dropdown";
import { ItemsDropdown } from "../../components/dropdowns/discount/items-dropdown";
import { PaymentMethodDropdown } from "../../components/dropdowns/discount/payment-method-dropdown";
import { Pressable } from "react-native";

it("Discount renders without crashing", () => {
  let navigation =
    useNavigation<StackNavigationProp<StackParams, "Discount">>();
  let route = useNavigation<RouteProp<StackParams, "Discount">>();
  let mockNavigation = {
    navigation: navigation,
    route: route,
  };

  const rendered = renderer
    .create(
      <Discount
        navigation={mockNavigation.navigation}
        route={mockNavigation.route}
      />
    )
    .toJSON();
  expect(rendered).toBeTruthy();
});

it("Discount test Dropdowns", async () => {
  let navigation =
    useNavigation<StackNavigationProp<StackParams, "Discount">>();
  let route = useNavigation<RouteProp<StackParams, "Discount">>();
  let mockNavigation = {
    navigation: navigation,
    route: route,
  };

  const rendered = renderer.create(
    <Discount
      navigation={mockNavigation.navigation}
      route={mockNavigation.route}
    />
  );

  const headerDropdown = rendered.root.findByType(HeaderDropdown);
  const itemsDropdown = rendered.root.findByType(ItemsDropdown);
  const paymentMethodDropdown = rendered.root.findByType(PaymentMethodDropdown);
  const button = rendered.root.findByType(Button);

  await act(() => button.props.onPress());

  expect(headerDropdown).toBeTruthy();
  expect(itemsDropdown).toBeTruthy();
  expect(paymentMethodDropdown).toBeTruthy();
});

it("HeaderDropdown with Pressable", async () => {
  let navigation =
    useNavigation<StackNavigationProp<StackParams, "Discount">>();
  let route = useNavigation<RouteProp<StackParams, "Discount">>();
  let mockNavigation = {
    navigation: navigation,
    route: route,
  };

  const rendered = renderer.create(
    <Discount
      navigation={mockNavigation.navigation}
      route={mockNavigation.route}
    />
  );
  const headerDropdown = rendered.root.findByType(HeaderDropdown);

  const pressable = headerDropdown.findByType(Pressable);

  const icon = headerDropdown.findAllByProps({ testID: "icon" })[0];
  expect(icon.props.name).toBe("chevron-down");

  await act(() => pressable.props.onPress());

  expect(icon.props.name).toBe("chevron-up");
});

it("ItemsDropdown with Pressable", async () => {
  let navigation =
    useNavigation<StackNavigationProp<StackParams, "Discount">>();
  let route = useNavigation<RouteProp<StackParams, "Discount">>();
  let mockNavigation = {
    navigation: navigation,
    route: route,
  };

  const rendered = renderer.create(
    <Discount
      navigation={mockNavigation.navigation}
      route={mockNavigation.route}
    />
  );

  const itemsDropdown = rendered.root.findByType(ItemsDropdown);

  const pressable = itemsDropdown.findByType(Pressable);

  const icon = itemsDropdown.findAllByProps({ testID: "icon" })[0];
  expect(icon.props.name).toBe("chevron-down");

  await act(() => pressable.props.onPress());

  expect(icon.props.name).toBe("chevron-up");
});

it("PaymentMethodDropdown with Pressable", async () => {
  let navigation =
    useNavigation<StackNavigationProp<StackParams, "Discount">>();
  let route = useNavigation<RouteProp<StackParams, "Discount">>();
  let mockNavigation = {
    navigation: navigation,
    route: route,
  };

  const rendered = renderer.create(
    <Discount
      navigation={mockNavigation.navigation}
      route={mockNavigation.route}
    />
  );
  const paymentMethodDropdown = rendered.root.findByType(PaymentMethodDropdown);

  const pressable = paymentMethodDropdown.findByType(Pressable);

  const icon = paymentMethodDropdown.findAllByProps({ testID: "icon" })[0];
  expect(icon.props.name).toBe("chevron-down");

  await act(() => pressable.props.onPress());

  expect(icon.props.name).toBe("chevron-up");
});
