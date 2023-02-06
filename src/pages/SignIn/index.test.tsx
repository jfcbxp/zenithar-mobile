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

it("SignIn renders without crashing", () => {
  let navigation = useNavigation<StackNavigationProp<StackParams, "SignIn">>();
  let route = useNavigation<RouteProp<StackParams, "SignIn">>();
  let mockNavigation = {
    navigation: navigation,
    route: route,
  };
  const rendered = renderer
    .create(
      <SignIn
        navigation={mockNavigation.navigation}
        route={mockNavigation.route}
      />
    )
    .toJSON();
  expect(rendered).toBeTruthy();
});

it("SignIn test EmailInput", async () => {
  let navigation = useNavigation<StackNavigationProp<StackParams, "SignIn">>();
  let route = useNavigation<RouteProp<StackParams, "SignIn">>();
  let mockNavigation = {
    navigation: navigation,
    route: route,
  };
  const rendered = renderer.create(
    <SignIn
      navigation={mockNavigation.navigation}
      route={mockNavigation.route}
    />
  );
  const emailInput = rendered.root.findByType(EmailInput);
  await act(() => emailInput.props.onChangeText("test@email.com"));
  expect(emailInput.props.value).toBe("test@email.com");
});

it("SignIn test PasswordInput", async () => {
  let navigation = useNavigation<StackNavigationProp<StackParams, "SignIn">>();
  let route = useNavigation<RouteProp<StackParams, "SignIn">>();
  let mockNavigation = {
    navigation: navigation,
    route: route,
  };
  const rendered = renderer.create(
    <SignIn
      navigation={mockNavigation.navigation}
      route={mockNavigation.route}
    />
  );
  const passwordInput = rendered.root.findByType(PasswordInput);
  await act(() => passwordInput.props.onChangeText("965874"));
  expect(passwordInput.props.value).toBe("965874");
});

it("SignIn test Button", async () => {
  let navigation = useNavigation<StackNavigationProp<StackParams, "SignIn">>();
  let route = useNavigation<RouteProp<StackParams, "SignIn">>();
  let mockNavigation = {
    navigation: navigation,
    route: route,
  };
  const rendered = renderer.create(
    <SignIn
      navigation={mockNavigation.navigation}
      route={mockNavigation.route}
    />
  );
  const button = rendered.root.findByType(Button);
  await act(() => {
    button.props.onPress();
  });
  expect(button.props.title).toBe("ENTRAR");
});

it("SignIn test CommandLink", async () => {
  let navigation = useNavigation<StackNavigationProp<StackParams, "SignIn">>();
  let route = useNavigation<RouteProp<StackParams, "SignIn">>();
  let mockNavigation = {
    navigation: navigation,
    route: route,
  };
  const rendered = renderer.create(
    <SignIn
      navigation={mockNavigation.navigation}
      route={mockNavigation.route}
    />
  );

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

it("SignIn test Text", async () => {
  let navigation = useNavigation<StackNavigationProp<StackParams, "SignIn">>();
  let route = useNavigation<RouteProp<StackParams, "SignIn">>();
  let mockNavigation = {
    navigation: navigation,
    route: route,
  };
  const rendered = renderer.create(
    <SignIn
      navigation={mockNavigation.navigation}
      route={mockNavigation.route}
    />
  );
  const text = rendered.root.findAllByType(Text).length;
  expect(text).toBe(5);
});

it("SignIn test Image", async () => {
  let navigation = useNavigation<StackNavigationProp<StackParams, "SignIn">>();
  let route = useNavigation<RouteProp<StackParams, "SignIn">>();
  let mockNavigation = {
    navigation: navigation,
    route: route,
  };
  const rendered = renderer.create(
    <SignIn
      navigation={mockNavigation.navigation}
      route={mockNavigation.route}
    />
  );
  const image = rendered.root.findByType(Image);
  expect(image.props.source).toBe(require("../../../assets/adaptive-icon.png"));
});
