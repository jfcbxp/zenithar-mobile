import React from "react";
import renderer, { act } from "react-test-renderer";
import { Button } from "../../components/buttons/button";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { StackParams } from "../../types/stack.params";
import { RouteProp, useNavigation } from "@react-navigation/native";
import Discount from ".";
import { HeaderDropdown } from "../../components/dropdowns/discount/header-dropdown";
import { ItemsDropdown } from "../../components/dropdowns/discount/items-dropdown";
import { PaymentMethodDropdown } from "../../components/dropdowns/discount/payment-method-dropdown";

let mockNavigation: StackScreenProps<StackParams, "Discount", undefined>;

let route: RouteProp<StackParams, "Discount">;

beforeAll(() => {
  let navigation =
    useNavigation<StackNavigationProp<StackParams, "Discount">>();
  route = useNavigation<RouteProp<StackParams, "Discount">>();
  mockNavigation = {
    navigation: navigation,
    route: route,
  };
});

it("Discount renders without crashing", () => {
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
