import React from "react";
import renderer, { act } from "react-test-renderer";

import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { StackParams } from "../../types/stack.params";
import { RouteProp, useNavigation } from "@react-navigation/native";
import Home from ".";
import { NavigationButton } from "../../components/buttons/navigation-button";
import { DiscountModal } from "../../components/modals/discount";
import { Modal } from "react-native";
import { TextInput } from "../../components/inputs/text-input";
import { Button } from "../../components/buttons/button";

let mockNavigation: StackScreenProps<StackParams, "Home", undefined>;

let route: RouteProp<StackParams, "Home">;

beforeAll(() => {
  let navigation = useNavigation<StackNavigationProp<StackParams, "Home">>();
  route = useNavigation<RouteProp<StackParams, "Home">>();
  mockNavigation = {
    navigation: navigation,
    route: route,
  };
});

it("Home renders without crashing", () => {
  const rendered = renderer
    .create(
      <Home
        navigation={mockNavigation.navigation}
        route={mockNavigation.route}
      />
    ).toJSON();
  expect(rendered).toBeTruthy();
});

it("Home test DiscountModal", async () => {
  const rendered = renderer
    .create(
      <Home
        navigation={mockNavigation.navigation}
        route={mockNavigation.route}
      />
    )

  const navigationButton = rendered.root.findByType(NavigationButton)
  await act(() => navigationButton.props.onPress())

  const discountModal = rendered.root.findByType(DiscountModal)
  expect(discountModal.props.visible).toBe(true)

  const modal = rendered.root.findAllByType(Modal)
  const modal1 = modal[0]
  expect(modal1.props.visible).toBe(true)

  const textInput = rendered.root.findByType(TextInput)
  await act(() => textInput.props.onChangeText("965874"))
  expect(textInput.props.value).toBe("965874")
  
  const button = rendered.root.findByType(Button)
  expect(button.props.title).toBe("CONTINUAR")
  expect(button.props.disabled).toBe(true)
})