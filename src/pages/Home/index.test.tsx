import React from "react";
import renderer from "react-test-renderer";

import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { StackParams } from "../../types/stack.params";
import { RouteProp, useNavigation } from "@react-navigation/native";
import Home from ".";

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

it("Home renders without crashing", async () => {
  const rendered = renderer
    .create(
      <Home
        navigation={mockNavigation.navigation}
        route={mockNavigation.route}
      />
    )
    .toJSON();
  expect(rendered).toBeTruthy();
});
