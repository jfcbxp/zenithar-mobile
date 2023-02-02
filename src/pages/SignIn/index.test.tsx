import React from "react";
import renderer, { act } from "react-test-renderer";

import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { StackParams } from "../../types/stack.params";
import { RouteProp, useNavigation } from "@react-navigation/native";
import SignIn from ".";
import { Button } from "../../components/buttons/button";
import { EmailInput } from "../../components/inputs/email-input";
import { PasswordInput } from "../../components/inputs/password-input";
import { CommandLink } from "../../components/buttons/command-link";
import { Image, Text } from "react-native";

let mockNavigation: StackScreenProps<
    StackParams,
    "SignIn",
    undefined
>;

let route: RouteProp<StackParams, "SignIn">;


beforeAll(() => {
    let navigation =
        useNavigation<StackNavigationProp<StackParams, "SignIn">>();
    route = useNavigation<RouteProp<StackParams, "SignIn">>();
    mockNavigation = {
        navigation: navigation,
        route: route,
    };
});

it("SignIn renders without crashing", () => {
    const rendered = renderer.create(
        <SignIn
            navigation={mockNavigation.navigation}
            route={mockNavigation.route} />
    ).toJSON()
    expect(rendered).toBeTruthy()
})

it("SignIn test EmailInput", async () => {
    const rendered = renderer.create(
        <SignIn
            navigation={mockNavigation.navigation}
            route={mockNavigation.route}
        />
    );
    const emailInput = rendered.root.findByType(EmailInput);
    await act(() => emailInput.props.onChangeText("test@email.com"));
    expect(emailInput.props.value).toBe("test@email.com");
})

it("SignIn test PasswordInput", async () => {
    const rendered = renderer.create(
        <SignIn
            navigation={mockNavigation.navigation}
            route={mockNavigation.route}
        />
    );
    const passwordInput = rendered.root.findByType(PasswordInput);
    await act(() => passwordInput.props.onChangeText("965874"));
    expect(passwordInput.props.value).toBe("965874");
})

it("SignIn test Button", async () => {
    const rendered = renderer.create(
        <SignIn
            navigation={mockNavigation.navigation}
            route={mockNavigation.route} />
    );
    const button = rendered.root.findByType(Button);
    expect(button.props.title).toBe("ENTRAR");
})

it("SignIn test CommandLink", async () => {
    const rendered = renderer.create(
        <SignIn
            navigation={mockNavigation.navigation}
            route={mockNavigation.route} />
    );
    const commandLink = rendered.root.findAllByType(CommandLink).length
    expect(commandLink).toBe(2)
})

it("SignIn test Text", async () => {
    const rendered = renderer.create(
        <SignIn
            navigation={mockNavigation.navigation}
            route={mockNavigation.route} />
    );
    const text = rendered.root.findAllByType(Text).length
    expect(text).toBe(5)
})

it("SignIn test Image", async () => {
    const rendered = renderer.create(
        <SignIn
            navigation={mockNavigation.navigation}
            route={mockNavigation.route} />
    );
    const image = rendered.root.findByType(Image)
    expect(image.props.source).toBe(require('../../../assets/adaptive-icon.png'))
})