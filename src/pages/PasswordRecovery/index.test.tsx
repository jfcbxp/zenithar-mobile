import React from "react";
import renderer, { act } from "react-test-renderer";

import PasswordRecovery from ".";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParams } from "../../types/stack.params";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { Button } from "../../components/buttons/button";
import { EmailInput } from "../../components/inputs/email-input";
import { Dialog } from "../../components/modals/dialog";

it("PasswordRecovery renders without crashing", () => {
  let navigation =
    useNavigation<StackNavigationProp<StackParams, "PasswordRecovery">>();
  let route = useNavigation<RouteProp<StackParams, "PasswordRecovery">>();
  let mockNavigation = {
    navigation: navigation,
    route: route,
  };
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

it("PasswordRecovery test Button", async () => {
  let navigation =
    useNavigation<StackNavigationProp<StackParams, "PasswordRecovery">>();
  let route = useNavigation<RouteProp<StackParams, "PasswordRecovery">>();
  let mockNavigation = {
    navigation: navigation,
    route: route,
  };
  const rendered = renderer.create(
    <PasswordRecovery
      navigation={mockNavigation.navigation}
      route={mockNavigation.route}
    />
  );

  const button = rendered.root.findByType(Button);

  await act(() => button.props.onPress());

  const dialog = rendered.root.findByType(Dialog);

  expect(button.props.title).toBe("ENVIAR");
  expect(dialog.props.visible).toBe(true);
});

it("PasswordRecovery test EmailInput", async () => {
  let navigation =
    useNavigation<StackNavigationProp<StackParams, "PasswordRecovery">>();
  let route = useNavigation<RouteProp<StackParams, "PasswordRecovery">>();
  let mockNavigation = {
    navigation: navigation,
    route: route,
  };
  const rendered = renderer.create(
    <PasswordRecovery
      navigation={mockNavigation.navigation}
      route={mockNavigation.route}
    />
  );

  const emailInput = rendered.root.findByType(EmailInput);

  await act(() => emailInput.props.onChangeText("test@email.com"));

  expect(emailInput.props.value).toBe("test@email.com");
});

it("PasswordRecovery test Dialog", async () => {
  let navigation =
    useNavigation<StackNavigationProp<StackParams, "PasswordRecovery">>();
  let route = useNavigation<RouteProp<StackParams, "PasswordRecovery">>();
  let mockNavigation = {
    navigation: navigation,
    route: route,
  };
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
