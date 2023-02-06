import React from "react";
import renderer, { act } from "react-test-renderer";

import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { StackParams } from "../../types/stack.params";
import { RouteProp, useNavigation } from "@react-navigation/native";
import Home from ".";
import { NavigationButton } from "../../components/buttons/navigation-button";
import { DiscountModal } from "../../components/modals/discount";
import { FlatList, Modal, Pressable } from "react-native";
import { TextInput } from "../../components/inputs/text-input";
import { Button } from "../../components/buttons/button";
import { HomeContainer } from "../../components/containers/home-container";
import { Logs } from "../../components/lists/logs";
import { LogsItem } from "../../components/lists/logs-item";
import { Picker } from "../../components/pickers/picker";
import { Header } from "../../components/headers/header";
import { UserSettings } from "../../components/modals/user-settings";
import { Portrait } from "../../components/portrait/portrait";
import { FullNameInput } from "../../components/inputs/fullname-input";
import { CommandLink } from "../../components/buttons/command-link";
import { PasswordInput } from "../../components/inputs/password-input";
import { AuthContext } from "../../contexts/auth.provider";
import { User } from "../../models/user.model";

let mockNavigation: StackScreenProps<StackParams, "Home", undefined>;

let route: RouteProp<StackParams, "Home">;

const company = "companyTest";
const department = "departmentTest";
const loading = false;
const signUp = jest.fn();
const signIn = jest.fn();
const signOut = jest.fn();
const recoverPassword = jest.fn();
const userUpdate = jest.fn();
const user: User = {
  uid: "uuidTest",
  email: "emailTest",
  fullName: "fullNameTest",
  company: "companyTest",
  department: "departmentTest",
  verified: true,
  portrait: "portraitTest",
  branches: [
    {
      id: "1",
      name: "Test",
    },
  ],
  logs: [
    {
      id: "1",
      date: "Test",
      title: "Test",
      description: "Test",
      type: "LIBERACAO_ORCAMENTO",
    },
    {
      id: "2",
      date: "Test 2",
      title: "Test 2",
      description: "Test 2",
      type: "DESCONTO_ORCAMENTO",
    },
  ],
};

beforeAll(() => {
  let navigation = useNavigation<StackNavigationProp<StackParams, "Home">>();
  route = useNavigation<RouteProp<StackParams, "Home">>();
  mockNavigation = {
    navigation: navigation,
    route: route,
  };
});

it("Home renders without crashing", () => {
  const rendered = renderer
    .create(
      <AuthContext.Provider
        value={{
          user,
          company,
          department,
          loading,
          signUp,
          signIn,
          signOut,
          recoverPassword,
          userUpdate,
        }}
      >
        <Home
          navigation={mockNavigation.navigation}
          route={mockNavigation.route}
        />
      </AuthContext.Provider>
    )
    .toJSON();
  expect(rendered).toBeTruthy();
});

it("Home test Header", async () => {
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
  const rendered = renderer.create(
    <AuthContext.Provider
      value={{
        user,
        company,
        department,
        loading,
        signUp,
        signIn,
        signOut,
        recoverPassword,
        userUpdate,
      }}
    >
      <Home
        navigation={mockNavigation.navigation}
        route={mockNavigation.route}
      />
    </AuthContext.Provider>
  );

  const header = rendered.root.findByType(Header);

  const pressable = header.findByType(Pressable);
  await act(() => pressable.props.onPress());

  const userSettings = header.findByType(UserSettings);
  expect(userSettings.props.visible).toBe(true);

  const modal = header.findByType(Modal);
  expect(modal.props.visible).toBe(true);

  const portrait = header.findByType(Portrait);
  expect(portrait.props.source).toBe("portraitTest");

  const fullNameInput = header.findByType(FullNameInput);
  await act(() => fullNameInput.props.onChangeText("Bruce Wayne"));
  expect(fullNameInput.props.value).toBe("Bruce Wayne");

  const commandLink = header.findByType(CommandLink);
  await act(() => commandLink.props.onPress());

  const passwordInput = header.findAllByType(PasswordInput).length;
  expect(passwordInput).toBe(3);

  const _passwordInput = header.findAllByType(PasswordInput);

  const password1 = _passwordInput[0];
  await act(() => password1.props.onChangeText("965874"));
  expect(password1.props.value).toBe("965874");

  const password2 = _passwordInput[1];
  await act(() => password2.props.onChangeText("965874"));
  expect(password2.props.value).toBe("965874");

  const password3 = _passwordInput[2];
  await act(() => password3.props.onChangeText("965874"));
  expect(password3.props.value).toBe("965874");

  const button = header.findAllByType(Button).length;
  expect(button).toBe(3);

  const _button = header.findAllByType(Button);

  const button1 = _button[0];
  expect(button1.props.title).toBe("SELECIONAR");

  const button2 = _button[1];
  expect(button2.props.title).toBe("CANCELAR");

  const button3 = _button[2];
  await act(() => button3.props.onPressIn());
  expect(button3.props.title).toBe("CONFIRMAR");
  expect(button3.props.disabled).toBe(true);
});

it("Home test HomeContainer, Logs, LogsItem", async () => {
  const rendered = renderer.create(
    <AuthContext.Provider
      value={{
        user,
        company,
        department,
        loading,
        signUp,
        signIn,
        signOut,
        recoverPassword,
        userUpdate,
      }}
    >
      <Home
        navigation={mockNavigation.navigation}
        route={mockNavigation.route}
      />
    </AuthContext.Provider>
  );

  const homeContainer = rendered.root.findByType(HomeContainer);
  expect(homeContainer.props.title).toBe("Histórico");
  expect(homeContainer.props.children).toBeDefined();

  const logs = homeContainer.findByType(Logs);
  expect(logs.props.data).toBeDefined();

  const flatListLog = logs.findByType(FlatList);

  expect(flatListLog.props.data).toBeDefined();

  const logsItem = flatListLog.findAllByType(LogsItem).length;
  expect(logsItem).toBe(2);
});

it("Home test DiscountModal", async () => {
  const rendered = renderer.create(
    <Home navigation={mockNavigation.navigation} route={mockNavigation.route} />
  );

  const navigationButton = rendered.root.findByType(NavigationButton);
  await act(() => navigationButton.props.onPress());

  const discountModal = rendered.root.findByType(DiscountModal);
  expect(discountModal.props.visible).toBe(true);

  const modal = rendered.root.findAllByType(Modal);
  const modal1 = modal[0];
  expect(modal1.props.visible).toBe(true);

  const textInput = rendered.root.findByType(TextInput);
  await act(() => textInput.props.onChangeText("965874"));
  expect(textInput.props.value).toBe("965874");

  const button = rendered.root.findByType(Button);
  expect(button.props.title).toBe("CONTINUAR");
  expect(button.props.disabled).toBe(true);

  const picker = rendered.root.findByType(Picker);
  await act(() => picker.props.setValue(""));
  expect(picker.props.value).toBe("");
});
