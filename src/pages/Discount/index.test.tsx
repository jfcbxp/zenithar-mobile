import React from "react";
import renderer, { act } from "react-test-renderer";
import { Button } from "../../components/buttons/button";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParams } from "../../types/stack.params";
import { RouteProp, useNavigation } from "@react-navigation/native";
import Discount from ".";
import { ItemsDropdown } from "../../components/dropdowns/discount/items-dropdown";
import { PaymentMethodDropdown } from "../../components/dropdowns/discount/payment-method-dropdown";

describe("Discount test", () => {
  const navigation =
    useNavigation<StackNavigationProp<StackParams, "Discount">>();
  const mockRoute = (): RouteProp<StackParams, "Discount"> => {
    return {
      params: {
        _branch: "",
        _budget: "",
        _discountValue: 0
      },
      name: "Discount",
      key: "Discount",
    };
  };

  const rendered = renderer.create(
    <Discount navigation={navigation} route={mockRoute()} />
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

});
