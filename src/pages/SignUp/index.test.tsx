import React from "react";
import renderer, { act } from "react-test-renderer";

import { StackNavigationProp } from "@react-navigation/stack";
import { StackParams } from "../../types/stack.params";
import { RouteProp, useNavigation } from "@react-navigation/native";
import SignUp from ".";
import { EmailInput } from "../../components/inputs/email-input";
import { PasswordInput } from "../../components/inputs/password-input";
import { FullNameInput } from "../../components/inputs/fullname-input";
import { Dialog } from "../../components/modals/dialog";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { Portrait } from "../../components/portrait/portrait";

describe("SignUp test", () => {
  const TEST_EMAIL = "test@email.com";
  const TEST_PASSWORD = "test";
  const TEST_NAME = "test";

  const navigation =
    useNavigation<StackNavigationProp<StackParams, "SignUp">>();
  const route = useNavigation<RouteProp<StackParams, "SignUp">>();

  window.alert = () => {};

  jest.mock("expo-image-picker", () => {
    return jest.fn().mockImplementation(() => {
      return {
        launchImageLibraryAsync: async () => {
          return {
            canceled: false,
            assets: [{ uri: "teste" }],
          };
        },
      };
    });
  });

  const rendered = renderer.create(
    <SignUp navigation={navigation} route={route} />
  );

  it("test SignUp how many Views", () => {
    const view = rendered.root.findAllByType(View).length;
    expect(view).toBe(6);
  });

  it("test SignUp FullNameInput", async () => {
    const fullNameInput = rendered.root.findByType(FullNameInput);
    await act(() => fullNameInput.props.onChangeText(TEST_NAME));
    expect(fullNameInput.props.value).toBe(TEST_NAME);
  });

  it("test SignUp EmailInput", async () => {
    const emailInput = rendered.root.findByType(EmailInput);
    await act(() => emailInput.props.onChangeText(TEST_EMAIL));
    expect(emailInput.props.value).toBe(TEST_EMAIL);
  });

  it("test SignUp PasswordInput", async () => {
    const passwordInputs = rendered.root.findAllByType(PasswordInput);
    await act(() => passwordInputs[0].props.onChangeText(TEST_PASSWORD));
    await act(() => passwordInputs[1].props.onChangeText(TEST_PASSWORD));
    expect(passwordInputs[0].props.value).toBe(TEST_PASSWORD);
    expect(passwordInputs[1].props.value).toBe(TEST_PASSWORD);
  });

  it("test SignUp Button Alert", async () => {
    const button = rendered.root.findAllByProps({ testID: "continuar" })[0];

    await act(() => button.props.onPress());

    const dialog = rendered.root.findByType(Dialog);

    expect(button.props.title).toBe("CONTINUAR");
    expect(dialog.props.visible).toBe(true);
  });

  it("test SignUp Button Success", async () => {
    const potrait = rendered.root.findByType(Portrait);

    const passwordInputs = rendered.root.findAllByType(PasswordInput);
    const fullNameInput = rendered.root.findByType(FullNameInput);
    const emailInput = rendered.root.findByType(EmailInput);

    const button = rendered.root.findAllByProps({ testID: "continuar" })[0];
    const dialog = rendered.root.findByType(Dialog);

    await act(() => {
      fullNameInput.props.onChangeText(TEST_NAME);
      emailInput.props.onChangeText(TEST_EMAIL);
      passwordInputs[0].props.onChangeText(TEST_PASSWORD);
      passwordInputs[1].props.onChangeText(TEST_PASSWORD);
      potrait.props.onPress();
    });
    await act(() => {
      button.props.onPress();
      dialog.props.dismiss();
    });

    expect(button.props.title).toBe("CONTINUAR");
  });

  it("test SignUp Dialog", async () => {
    const dialog = rendered.root.findByType(Dialog);

    expect(dialog.props.title).toBe("");
    expect(dialog.props.content).toBe("");
  });

  it("test SignUp StatusBar", () => {
    const statusBar = rendered.root.findByType(StatusBar);
    expect(statusBar.props.style).toBe("light");
    expect(statusBar.props.translucent).toBe(false);
    expect(statusBar.props.backgroundColor).toBe("silver");
  });
});
