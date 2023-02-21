import React from "react";
import renderer from "react-test-renderer";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParams } from "../../types/stack.params";
import { RouteProp, useNavigation } from "@react-navigation/native";
import Discount from ".";
import { ActivityIndicator } from "react-native";

describe("Discount test", () => {
  const navigation =
    useNavigation<StackNavigationProp<StackParams, "Discount">>();
  const mockRoute = (): RouteProp<StackParams, "Discount"> => {
    return {
      params: {
        _branch: "",
        _budget: "",
        _discountValue: 0,
      },
      name: "Discount",
      key: "Discount",
    };
  };

  const rendered = renderer.create(
    <Discount navigation={navigation} route={mockRoute()} />
  );

  it("test Discount ActivityIndicator", async () => {
    const activityIndicator = rendered.root.findAllByType(ActivityIndicator);
    expect(activityIndicator).toBeTruthy();
  });
});
