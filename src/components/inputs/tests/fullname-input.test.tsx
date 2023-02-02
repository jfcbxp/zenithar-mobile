import React from "react";
import renderer from "react-test-renderer";
import { FullNameInput } from "../fullname-input";

it("FullNameInput renders without crashing", () => {
    const rendered = renderer
        .create(
            <FullNameInput />
        ).toJSON();
    expect(rendered).toBeTruthy();
});