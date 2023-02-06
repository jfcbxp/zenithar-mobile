import React from "react";
import renderer, { act } from "react-test-renderer";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParams } from "../../../types/stack.params";
import { RouteProp, useNavigation } from "@react-navigation/native";
import DiscountConfirmation from ".";

it("DiscountConfirmation renders without crashing", () => {
  let navigation =
    useNavigation<StackNavigationProp<StackParams, "DiscountConfirmation">>();
  let route = useNavigation<RouteProp<StackParams, "DiscountConfirmation">>();
  let mockNavigation = {
    navigation: navigation,
    route: route,
  };

  const rendered = renderer
    .create(
      <DiscountConfirmation
        navigation={mockNavigation.navigation}
        route={mockNavigation.route}
      />
    )
    .toJSON();
  expect(rendered).toBeTruthy();
});

it("DiscountConfirmation tests", async () => {
  let navigation =
    useNavigation<StackNavigationProp<StackParams, "DiscountConfirmation">>();
  let route = useNavigation<RouteProp<StackParams, "DiscountConfirmation">>();
  let mockNavigation = {
    navigation: navigation,
    route: route,
  };

  const rendered = renderer.create(
    <DiscountConfirmation
      navigation={mockNavigation.navigation}
      route={mockNavigation.route}
    />
  );
  const icon = rendered.root.findAllByProps({ testID: "icon" })[0];

  await act(() => icon.props.onPress());
});
