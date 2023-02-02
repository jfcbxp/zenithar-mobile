import renderer, { act } from "react-test-renderer";
import React from "react";
import { Pressable } from "react-native";
import { UserSettings } from "../../modals/user-settings";
import { Header } from "../header";

it("Header renders without crashing", () => {
    const rendered = renderer.create(
        <Header returnOption={false} />
    ).toJSON();
    expect(rendered).toBeTruthy();
});

it("Header test UserSettings", async () => {
    const rendered = renderer.create(
        <Header returnOption={false} />
    )

    const pressable = rendered.root.findByType(Pressable)
    await act(() => pressable.props.onPress())

    const userSettings = rendered.root.findByType(UserSettings)
    expect(userSettings.props.visible).toBe(true)
})