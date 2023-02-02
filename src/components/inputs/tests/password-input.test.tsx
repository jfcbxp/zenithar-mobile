import React from "react";
import renderer from "react-test-renderer";
import { PasswordInput } from "../password-input";

it("PasswordInput renders without crashing", () => {
    const rendered = renderer
        .create(
            <PasswordInput />
        ).toJSON();
    expect(rendered).toBeTruthy();
});