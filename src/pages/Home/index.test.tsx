import React from "react";
import renderer, { act } from "react-test-renderer";

import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { StackParams } from "../../types/stack.params";
import { RouteProp, useNavigation } from "@react-navigation/native";
import Home from ".";
import { NavigationButton } from "../../components/buttons/navigation-button";
import { DiscountModal } from "../../components/modals/discount";
import { Modal } from "react-native";
import { TextInput } from "../../components/inputs/text-input";
import { Button } from "../../components/buttons/button";
import { HomeContainer } from "../../components/containers/home-container";
import { Logs } from "../../components/lists/logs";
import { LogsItem } from "../../components/lists/logs-item";
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { Picker } from "../../components/pickers/picker";

let mockNavigation: StackScreenProps<StackParams, "Home", undefined>;

let route: RouteProp<StackParams, "Home">;

beforeAll(() => {
  let navigation = useNavigation<StackNavigationProp<StackParams, "Home">>();
  route = useNavigation<RouteProp<StackParams, "Home">>();
  mockNavigation = {
    navigation: navigation,
    route: route,
  };
});

it("Home renders without crashing", () => {
  const rendered = renderer.create(
    <Home
      navigation={mockNavigation.navigation}
      route={mockNavigation.route} />
  ).toJSON();
  expect(rendered).toBeTruthy();
});

it("Home test HomeContainer, Logs, LogsItem", () => {
  const rendered = renderer.create(
    <Home
      navigation={mockNavigation.navigation}
      route={mockNavigation.route} />
  )

  const homeContainer = rendered.root.findByType(HomeContainer)
  expect(homeContainer.props.title).toBe("Histórico")
  expect(homeContainer.props.children).toBeDefined()

  const DATA: Array<any> = [{
    id: "1",
    date: "Test",
    title: "Test",
    description: "Test",
    type: "LIBERACAO_ORCAMENTO"
  }]

  const _rendered = renderer.create(
    <Logs data={DATA} />
  )

  const logs = _rendered.root.findByType(Logs)
  expect(logs.props.data).toBeDefined()

  const logsItem = _rendered.root.findByType(LogsItem)
  expect(logsItem.props.data).toBeDefined()

  const icon = _rendered.root.findByType(Icon)
  expect(icon.props.name).toBe("")
})

it("Home test DiscountModal", async () => {
  const rendered = renderer.create(
    <Home
      navigation={mockNavigation.navigation}
      route={mockNavigation.route} />
  )

  const navigationButton = rendered.root.findByType(NavigationButton)
  await act(() => navigationButton.props.onPress())

  const discountModal = rendered.root.findByType(DiscountModal)
  expect(discountModal.props.visible).toBe(true)

  const modal = rendered.root.findAllByType(Modal)
  const modal1 = modal[0]
  expect(modal1.props.visible).toBe(true)

  const textInput = rendered.root.findByType(TextInput)
  await act(() => textInput.props.onChangeText("965874"))
  expect(textInput.props.value).toBe("965874")

  const button = rendered.root.findByType(Button)
  expect(button.props.title).toBe("CONTINUAR")
  expect(button.props.disabled).toBe(true)

  const picker = rendered.root.findByType(Picker)
  await act(()=> picker.props.setValue(""))
  expect(picker.props.value).toBe("")
})