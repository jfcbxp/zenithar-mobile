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
  const mockNavigation = {
    navigation: navigation,
    route: route,
  };

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
    <SignUp
      navigation={mockNavigation.navigation}
      route={mockNavigation.route}
    />
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
    const passwordInput = rendered.root.findByType(PasswordInput);
    await act(() => passwordInput.props.onChangeText(TEST_PASSWORD));
    expect(passwordInput.props.value).toBe(TEST_PASSWORD);
  });

  it("test SignUp Button Alert", async () => {
    const button = rendered.root.findAllByProps({ testID: "continuar" })[0];

    await act(() => button.props.onPress());

    const dialog = rendered.root.findByType(Dialog);

    expect(button.props.title).toBe("CONTINUAR");
    expect(dialog.props.visible).toBe(false);
  });

  it("test SignUp Button Success", async () => {
    const potrait = rendered.root.findByType(Portrait);

    const passwordInput = rendered.root.findByType(PasswordInput);
    const fullNameInput = rendered.root.findByType(FullNameInput);
    const emailInput = rendered.root.findByType(EmailInput);

    const button = rendered.root.findAllByProps({ testID: "continuar" })[0];
    const dialog = rendered.root.findByType(Dialog);

    await act(() => {
      fullNameInput.props.onChangeText(TEST_NAME);
      emailInput.props.onChangeText(TEST_EMAIL);
      passwordInput.props.onChangeText(TEST_PASSWORD);
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

    expect(dialog.props.title).toBe("Verificação de e-mail");
    expect(dialog.props.content).toBe(
      "Aguarde. Um e-mail de verificação foi enviado para sua caixa de entrada. Após a verificação, tente efetuar acesso."
    );
  });

  it("test SignUp StatusBar", () => {
    const statusBar = rendered.root.findByType(StatusBar);
    expect(statusBar.props.style).toBe("light");
    expect(statusBar.props.translucent).toBe(false);
    expect(statusBar.props.backgroundColor).toBe("silver");
  });
});
