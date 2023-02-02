import React from "react";
import renderer from "react-test-renderer";

import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { StackParams } from "../../../types/stack.params";
import { RouteProp, useNavigation } from "@react-navigation/native";
import DiscountConfirmation from ".";

let mockNavigation: StackScreenProps<
  StackParams,
  "DiscountConfirmation",
  undefined
>;

let route: RouteProp<StackParams, "DiscountConfirmation">;

beforeAll(() => {
  let navigation =
    useNavigation<StackNavigationProp<StackParams, "DiscountConfirmation">>();
  route = useNavigation<RouteProp<StackParams, "DiscountConfirmation">>();
  mockNavigation = {
    navigation: navigation,
    route: route,
  };
});

it("DiscountConfirmation renders without crashing", () => {
  const rendered = renderer
    .create(
      <DiscountConfirmation
        navigation={mockNavigation.navigation}
        route={mockNavigation.route}
      />
    ).toJSON();
  expect(rendered).toBeTruthy();
});
