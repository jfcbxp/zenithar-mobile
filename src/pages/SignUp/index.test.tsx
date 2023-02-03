import React from "react";
import renderer, { act } from "react-test-renderer";

import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { StackParams } from "../../types/stack.params";
import { RouteProp, useNavigation } from "@react-navigation/native";
import SignUp from ".";
import { Button } from "../../components/buttons/button";
import { EmailInput } from "../../components/inputs/email-input";
import { PasswordInput } from "../../components/inputs/password-input";
import { FullNameInput } from "../../components/inputs/fullname-input";
import { Dialog } from "../../components/modals/dialog";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

let mockNavigation: StackScreenProps<
    StackParams,
    "SignUp",
    undefined
>;

let route: RouteProp<StackParams, "SignUp">;


beforeAll(() => {
    let navigation =
        useNavigation<StackNavigationProp<StackParams, "SignUp">>();
    route = useNavigation<RouteProp<StackParams, "SignUp">>();
    mockNavigation = {
        navigation: navigation,
        route: route,
    };
});

it("SignUp renders without crashing", () => {
    const rendered = renderer.create(
        <SignUp
            navigation={mockNavigation.navigation}
            route={mockNavigation.route} />
    ).toJSON()
    expect(rendered).toBeTruthy()
})

it("SignUp how many Views", () => {
    const rendered = renderer.create(
        <SignUp
            navigation={mockNavigation.navigation}
            route={mockNavigation.route} />
    )
    const view = rendered.root.findAllByType(View).length
    expect(view).toBe(6)
})

it("SignUp test FullNameInput", async () => {
    const rendered = renderer.create(
        <SignUp
            navigation={mockNavigation.navigation}
            route={mockNavigation.route} />
    );
    const fullNameInput = rendered.root.findByType(FullNameInput);
    await act(() => fullNameInput.props.onChangeText("Bruce Wayne"));
    expect(fullNameInput.props.value).toBe("Bruce Wayne");
})

it("SignUp test EmailInput", async () => {
    const rendered = renderer.create(
        <SignUp
            navigation={mockNavigation.navigation}
            route={mockNavigation.route} />
    );
    const emailInput = rendered.root.findByType(EmailInput);
    await act(() => emailInput.props.onChangeText("test@email.com"));
    expect(emailInput.props.value).toBe("test@email.com");
})

it("SignUp test PasswordInput", async () => {
    const rendered = renderer.create(
        <SignUp
            navigation={mockNavigation.navigation}
            route={mockNavigation.route} />
    );
    const passwordInput = rendered.root.findByType(PasswordInput);
    await act(() => passwordInput.props.onChangeText("965874"));
    expect(passwordInput.props.value).toBe("965874");
})

it("SignUp test Button", async () => {
    const rendered = renderer.create(
        <SignUp
            navigation={mockNavigation.navigation}
            route={mockNavigation.route} />
    );
    const button = rendered.root.findAllByType(Button).length;
    expect(button).toBe(2);
})

it("SignUp test Dialog", async () => {
    const rendered = renderer.create(
        <SignUp
            navigation={mockNavigation.navigation}
            route={mockNavigation.route} />
    );

    const dialog = rendered.root.findByType(Dialog);

    expect(dialog.props.title).toBe("Verificação de e-mail");
    expect(dialog.props.content).toBe(
        "Aguarde. Um e-mail de verificação foi enviado para sua caixa de entrada. Após a verificação, tente efetuar acesso."
    );
});

it("SignUp test StatusBar", () => {
    const rendered = renderer.create(
        <SignUp
            navigation={mockNavigation.navigation}
            route={mockNavigation.route} />
    );

    const statusBar = rendered.root.findByType(StatusBar)
    expect(statusBar.props.style).toBe("light")
    expect(statusBar.props.translucent).toBe(false)
    expect(statusBar.props.backgroundColor).toBe("silver")
})