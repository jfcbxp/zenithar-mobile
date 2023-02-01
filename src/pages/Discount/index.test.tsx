import React from "react";
import renderer from "react-test-renderer";

import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { StackParams } from "../../types/stack.params";
import { RouteProp, useNavigation } from "@react-navigation/native";
import Discount from ".";

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

it("Discount renders without crashing", async () => {
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
