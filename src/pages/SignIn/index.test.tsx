import React from "react";
import renderer, { act } from "react-test-renderer";

import { StackNavigationProp } from "@react-navigation/stack";
import { StackParams } from "../../types/stack.params";
import { RouteProp, useNavigation } from "@react-navigation/native";
import SignIn from ".";
import { Button } from "../../components/buttons/button";
import { EmailInput } from "../../components/inputs/email-input";
import { PasswordInput } from "../../components/inputs/password-input";
import { Image, Text } from "react-native";

describe("SignIn test", () => {
  const TEST_EMAIL = "test@email.com";
  const TEST_PASSWORD = "test";

  const navigation =
    useNavigation<StackNavigationProp<StackParams, "SignIn">>();
  const route = useNavigation<RouteProp<StackParams, "SignIn">>();

  const rendered = renderer.create(
    <SignIn navigation={navigation} route={route} />
  );

  it("test SignIn EmailInput", async () => {
    const emailInput = rendered.root.findByType(EmailInput);
    await act(() => emailInput.props.onChangeText(TEST_EMAIL));
    expect(emailInput.props.value).toBe(TEST_EMAIL);
  });

  it("test SignIn PasswordInput", async () => {
    const passwordInput = rendered.root.findByType(PasswordInput);
    await act(() => passwordInput.props.onChangeText(TEST_PASSWORD));
    expect(passwordInput.props.value).toBe(TEST_PASSWORD);
  });

  it("test SignIn Button", async () => {
    const button = rendered.root.findByType(Button);
    await act(() => {
      button.props.onPress();
    });
    expect(button.props.title).toBe("ENTRAR");
  });

  it("test SignIn CommandLink", async () => {
    const cadastrar = rendered.root.findAllByProps({
      testID: "link-cadastrar",
    })[0];

    const recuperar = rendered.root.findAllByProps({
      testID: "link-recuperar-senha",
    })[0];

    await act(() => {
      cadastrar.props.onPress();
      recuperar.props.onPress();
    });
  });

  it("test SignIn Text", async () => {
    const text = rendered.root.findAllByType(Text).length;
    expect(text).toBe(5);
  });

  it("test SignIn Image", async () => {
    const image = rendered.root.findByType(Image);
    expect(image.props.source).toBe(
      require("../../../assets/adaptive-icon.png")
    );
  });
});
