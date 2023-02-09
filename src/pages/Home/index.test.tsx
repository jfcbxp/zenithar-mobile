import React, { useMemo } from "react";
import renderer, { act } from "react-test-renderer";

import { StackNavigationProp } from "@react-navigation/stack";
import { StackParams } from "../../types/stack.params";
import { RouteProp, useNavigation } from "@react-navigation/native";
import Home from ".";
import { NavigationButton } from "../../components/buttons/navigation-button";
import { DiscountModal } from "../../components/modals/discount";
import { FlatList, Modal, Pressable } from "react-native";
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
import { Dialog } from "../../components/modals/dialog";
import { MaskedInput } from "../../components/inputs/masked-input";

const company = "companyTest";
const department = "departmentTest";
const loading = false;
const urlBackend = "urlTest";
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
  discountLimit: 15,
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

describe("Home test", () => {
  const navigation = useNavigation<StackNavigationProp<StackParams, "Home">>();
  const route = useNavigation<RouteProp<StackParams, "Home">>();
  const contextValue = useMemo(() => ({
    user,
    company,
    department,
    urlBackend,
    loading,
    signUp,
    signIn,
    signOut,
    recoverPassword,
    userUpdate,
  }), [
    user,
    company,
    department,
    urlBackend,
    loading,
    signUp,
    signIn,
    signOut,
    recoverPassword,
    userUpdate,
  ])
  const rendered = renderer.create(
    <AuthContext.Provider
      value={contextValue}
    >
      <Home navigation={navigation} route={route} />
    </AuthContext.Provider>
  );

  it("test Home Header", async () => {
    const header = rendered.root.findByType(Header);

    const pressable = header.findByType(Pressable);
    await act(() => pressable.props.onPress());

    const userSettings = header.findByType(UserSettings);
    expect(userSettings.props.visible).toBe(true);

    const modal = userSettings.findByType(Modal);
    expect(modal.props.visible).toBe(true);
    const portrait = modal.findByType(Portrait);
    expect(portrait.props.source).toBe("portraitTest");

    const fullNameInput = modal.findByType(FullNameInput);
    await act(() => fullNameInput.props.onChangeText("test"));
    expect(fullNameInput.props.value).toBe("test");

    const commandLink = modal.findByType(CommandLink);
    await act(() => commandLink.props.onPress());

    const passwordInput = modal.findAllByType(PasswordInput).length;
    expect(passwordInput).toBe(3);

    const _passwordInput = modal.findAllByType(PasswordInput);

    const password1 = _passwordInput[0];
    await act(() => password1.props.onChangeText("test"));
    expect(password1.props.value).toBe("test");

    const password2 = _passwordInput[1];
    await act(() => password2.props.onChangeText("test"));
    expect(password2.props.value).toBe("test");

    const password3 = _passwordInput[2];
    await act(() => password3.props.onChangeText("test"));
    expect(password3.props.value).toBe("test");

    const button = modal.findAllByType(Button).length;
    expect(button).toBe(3);

    const _button = modal.findAllByType(Button);

    const button1 = _button[0];
    expect(button1.props.title).toBe("SELECIONAR");

    const button2 = _button[1];
    expect(button2.props.title).toBe("CANCELAR");

    const button3 = _button[2];
    await act(() => button3.props.onPressIn());
    expect(button3.props.title).toBe("CONFIRMAR");
    expect(button3.props.disabled).toBe(true);

    await act(() => userSettings.props.dismiss());
  });

  it("test Home HomeContainer", async () => {
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

  it("test Home DiscountModal", async () => {
    const navigationButton = rendered.root.findByType(NavigationButton);
    await act(() => navigationButton.props.onPress());

    const discountModal = rendered.root.findByType(DiscountModal);
    expect(discountModal.props.visible).toBe(true);

    const modal = discountModal.findByType(Modal);
    expect(modal.props.visible).toBe(true);
    await act(() => modal.props.onShow());

    const textInput = modal.findByType(MaskedInput);
    await act(() => textInput.props.onChangeText("test"));
    expect(textInput.props.value).toBe("test");

    const picker = modal.findByType(Picker);
    await act(() => picker.props.setValue(""));
    expect(picker.props.value).toBe("");

    const pressable = discountModal.findByType(Pressable);
    await act(() => pressable.props.onPressIn());

    const button = modal.findByType(Button);
    expect(button.props.title).toBe("CONTINUAR");
    expect(button.props.disabled).toBe(true);
    await act(() => button.props.onPressIn());

    await act(() => discountModal.props.dismiss());
  });

  it("test Home Dialog", async () => {
    const contextValue = useMemo(() => ({
      user,
      company,
      department,
      urlBackend,
      loading,
      signUp,
      signIn,
      signOut,
      recoverPassword,
      userUpdate,
    }), [
      user,
      company,
      department,
      urlBackend,
      loading,
      signUp,
      signIn,
      signOut,
      recoverPassword,
      userUpdate,
    ])
    await act(() =>
      rendered.update(
        <AuthContext.Provider
          value={contextValue}
        >
          <Home navigation={navigation} route={route} />
        </AuthContext.Provider>
      )
    );
    const navigationButton = rendered.root.findByType(NavigationButton);
    await act(() => navigationButton.props.onPress());

    const dialog = rendered.root.findByType(Dialog);
    await act(() => dialog.props.dismiss());
  });
});
