import React from "react";
import renderer from "react-test-renderer";
import { TextInput } from "../text-input";

it("TextInput renders without crashing", () => {
    const rendered = renderer
        .create(
            <TextInput />
        ).toJSON();
    expect(rendered).toBeTruthy();
});