import renderer, { act } from "react-test-renderer";
import { ItemsDropdown } from "../items-dropdown";
import { Pressable } from "react-native";
it("ItemsDropdown renders without crashing", () => {
  const rendered = renderer.create(<ItemsDropdown />).toJSON();
  expect(rendered).toBeTruthy();
});

it("ItemsDropdown with Pressable", async () => {
  const rendered = renderer.create(<ItemsDropdown />);

  const pressable = rendered.root.findByType(Pressable);

  const icon = rendered.root.findAllByProps({ testID: "icon" })[0];
  expect(icon.props.name).toBe("chevron-down");

  await act(() => pressable.props.onPress());

  expect(icon.props.name).toBe("chevron-up");
});
