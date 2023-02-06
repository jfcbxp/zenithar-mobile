import React from "react";
import renderer, { act } from "react-test-renderer";

import PasswordRecovery from ".";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParams } from "../../types/stack.params";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { Button } from "../../components/buttons/button";
import { EmailInput } from "../../components/inputs/email-input";
import { Dialog } from "../../components/modals/dialog";

describe("PasswordRecovery test", () => {
  const TEST_EMAIL = "test@email.com";

  const navigation =
    useNavigation<StackNavigationProp<StackParams, "PasswordRecovery">>();
  const route = useNavigation<RouteProp<StackParams, "PasswordRecovery">>();
  const mockNavigation = {
    navigation: navigation,
    route: route,
  };
  const rendered = renderer.create(
    <PasswordRecovery
      navigation={mockNavigation.navigation}
      route={mockNavigation.route}
    />
  );

  it("test PasswordRecovery Button", async () => {
    const button = rendered.root.findByType(Button);

    await act(() => button.props.onPress());

    const dialog = rendered.root.findByType(Dialog);

    expect(button.props.title).toBe("ENVIAR");
    expect(dialog.props.visible).toBe(true);
  });

  it("test PasswordRecovery EmailInput", async () => {
    const emailInput = rendered.root.findByType(EmailInput);

    await act(() => emailInput.props.onChangeText(TEST_EMAIL));

    expect(emailInput.props.value).toBe(TEST_EMAIL);
  });

  it("test PasswordRecovery PasswordRecovery Dialog", async () => {
    const dialog = rendered.root.findByType(Dialog);

    expect(dialog.props.title).toBe("Recuperação de senha");
    expect(dialog.props.content).toBe(
      "Em alguns instantes uma mensagem de e-mail chegará em sua caixa de entrada com as instruções para redefinição da sua senha."
    );
    await act(() => dialog.props.dismiss());
    expect(dialog.props.visible).toBe(false);
  });
});
