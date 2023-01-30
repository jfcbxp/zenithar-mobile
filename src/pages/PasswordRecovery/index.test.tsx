import React from "react";
import renderer, { act } from "react-test-renderer";

import PasswordRecovery from ".";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { StackParams } from "../../types/stack.params";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { Button } from "../../components/buttons/button";
import { EmailInput } from "../../components/inputs/email-input";
import { Dialog } from "../../components/modals/dialog";

const navigation =
  useNavigation<StackNavigationProp<StackParams, "PasswordRecovery">>();

const route = useNavigation<RouteProp<StackParams, "PasswordRecovery">>();

const mockNavigation: StackScreenProps<StackParams, "PasswordRecovery"> = {
  navigation: navigation,
  route: route,
};

it("PasswordRecovery renders without crashing", () => {
  const rendered = renderer
    .create(
      <PasswordRecovery
        navigation={mockNavigation.navigation}
        route={mockNavigation.route}
      />
    )
    .toJSON();
  expect(rendered).toBeTruthy();
});

it("PasswordRecovery test button", async () => {
  const rendered = renderer.create(
    <PasswordRecovery
      navigation={mockNavigation.navigation}
      route={mockNavigation.route}
    />
  );

  const button = rendered.root.findByType(Button);
  expect(button.props.title).toBe("ENVIAR");

  await act(() => button.props.onPress());

  const dialog = rendered.root.findByType(Dialog);
  expect(dialog.props.visible).toBe(true);
});

it("PasswordRecovery test EmailInput", async () => {
  const rendered = renderer.create(
    <PasswordRecovery
      navigation={mockNavigation.navigation}
      route={mockNavigation.route}
    />
  );

  const emailInput = rendered.root.findByType(EmailInput);

  await act(() => emailInput.props.onChangeText("teste@teste.com.br"));

  expect(emailInput.props.value).toBe("teste@teste.com.br");
});

it("PasswordRecovery test Dialog", async () => {
  const rendered = renderer.create(
    <PasswordRecovery
      navigation={mockNavigation.navigation}
      route={mockNavigation.route}
    />
  );

  const dialog = rendered.root.findByType(Dialog);

  expect(dialog.props.title).toBe("Recuperação de senha");
  expect(dialog.props.content).toBe(
    "Em alguns instantes uma mensagem de e-mail chegará em sua caixa de entrada com as instruções para redefinição da sua senha."
  );
  await act(() => dialog.props.dismiss());
  expect(dialog.props.visible).toBe(false);
});
