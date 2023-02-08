import React from "react";
import renderer, { act } from "react-test-renderer";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParams } from "../../../types/stack.params";
import { RouteProp, useNavigation } from "@react-navigation/native";
import DiscountConfirmation from ".";

describe("DiscountConfirmation test", () => {
  const navigation =
    useNavigation<StackNavigationProp<StackParams, "DiscountConfirmation">>();
  const route = useNavigation<RouteProp<StackParams, "DiscountConfirmation">>();

  const rendered = renderer.create(
    <DiscountConfirmation navigation={navigation} route={route} />
  );

  it("test DiscountConfirmation Icon", async () => {
    const icon = rendered.root.findAllByProps({ testID: "icon" })[0];

    await act(() => icon.props.onPress());
  });
});
