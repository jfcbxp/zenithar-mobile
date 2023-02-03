import renderer, { act } from "react-test-renderer";
import React from "react";
import { Modal, Pressable } from "react-native";
import { UserSettings } from "../../modals/user-settings";
import { Header } from "../header";
import { Portrait } from "../../portrait/portrait";
import { FullNameInput } from "../../inputs/fullname-input";
import { CommandLink } from "../../buttons/command-link";
import { PasswordInput } from "../../inputs/password-input";
import { Button } from "../../buttons/button";

it("Header renders without crashing", () => {
  const rendered = renderer.create(<Header returnOption={false} />).toJSON();
  expect(rendered).toBeTruthy();
});

it("Header test UserSettings", async () => {
  jest.mock("expo-image-picker", () => {
    return jest.fn().mockImplementation(() => {
      return {
        launchImageLibraryAsync: async () => {
          return {
            canceled: true,
            assets: [{ uri: "teste" }],
          };
        },
      };
    });
  });

  jest.spyOn(React, "useContext").mockImplementation(() => ({
    userUpdate: () => jest.fn(),
    user: {
      branches: [
        {
          id: "1",
          name: "Test",
        },
      ],
    },
  }));

  const rendered = renderer.create(<Header returnOption={false} />);

  const pressable = rendered.root.findByType(Pressable);
  await act(() => pressable.props.onPress());

  const userSettings = rendered.root.findByType(UserSettings);
  expect(userSettings.props.visible).toBe(true);

  const modal = rendered.root.findByType(Modal);
  expect(modal.props.visible).toBe(true);

  const portrait = rendered.root.findByType(Portrait);
  expect(portrait.props.source).toBeUndefined();

  const fullNameInput = rendered.root.findByType(FullNameInput);
  await act(() => fullNameInput.props.onChangeText("Bruce Wayne"));
  expect(fullNameInput.props.value).toBe("Bruce Wayne");

  const commandLink = rendered.root.findByType(CommandLink);
  await act(() => commandLink.props.onPress());

  const passwordInput = rendered.root.findAllByType(PasswordInput).length;
  expect(passwordInput).toBe(3);

  const _passwordInput = rendered.root.findAllByType(PasswordInput);

  const password1 = _passwordInput[0];
  await act(() => password1.props.onChangeText("965874"));
  expect(password1.props.value).toBe("965874");

  const password2 = _passwordInput[1];
  await act(() => password2.props.onChangeText("965874"));
  expect(password2.props.value).toBe("965874");

  const password3 = _passwordInput[2];
  await act(() => password3.props.onChangeText("965874"));
  expect(password3.props.value).toBe("965874");

  const button = rendered.root.findAllByType(Button).length;
  expect(button).toBe(3);

  const _button = rendered.root.findAllByType(Button);

  const button1 = _button[0];
  expect(button1.props.title).toBe("SELECIONAR");

  const button2 = _button[1];
  expect(button2.props.title).toBe("CANCELAR");

  const button3 = _button[2];
  await act(() => button3.props.onPressIn());
  expect(button3.props.title).toBe("CONFIRMAR");
  expect(button3.props.disabled).toBe(true);
});
