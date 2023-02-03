import renderer, { act } from "react-test-renderer";
import { HeaderDropdown } from "../header-dropdown";
import { Pressable } from "react-native";

it("HeaderDropdown renders without crashing", () => {
  const rendered = renderer.create(<HeaderDropdown />).toJSON();
  expect(rendered).toBeTruthy();
});

it("HeaderDropdown with Pressable", async () => {
  const rendered = renderer.create(<HeaderDropdown />);

  const pressable = rendered.root.findByType(Pressable);

  const icon = rendered.root.findAllByProps({ testID: "icon" })[0];
  expect(icon.props.name).toBe("chevron-down");

  await act(() => pressable.props.onPress());

  expect(icon.props.name).toBe("chevron-up");
});
